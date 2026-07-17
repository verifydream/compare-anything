import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, 
  Trash2, 
  ChevronDown, 
  FileCode, 
  Files, 
  ExternalLink,
  Download, 
  Copy, 
  Check, 
  GitPullRequest
} from 'lucide-react';
import { computeDiff, DiffResult } from '../utils/diff';
import { DiffLine } from '../types';

interface CompareToolProps {
  initialLeftText: string;
  initialRightText: string;
  onSaveSnapshot?: (title: string, leftText: string, rightText: string, stats: DiffResult['stats']) => void;
  onAddHistory?: (leftText: string, rightText: string, stats: DiffResult['stats']) => void;
}

export default function CompareTool({ 
  initialLeftText, 
  initialRightText, 
  onSaveSnapshot,
  onAddHistory
}: CompareToolProps) {
  const [leftText, setLeftText] = useState(initialLeftText);
  const [rightText, setRightText] = useState(initialRightText);
  
  // Diff configuration state
  const [viewMode, setViewMode] = useState<'split' | 'unified'>('split');
  const [granularity, setGranularity] = useState<'Line' | 'Word' | 'Character'>('Line');
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(true);
  const [caseInsensitive, setCaseInsensitive] = useState(false);

  // Computed Diff state
  const [diffResult, setDiffResult] = useState<DiffResult | null>(null);

  // Status metrics
  const [cursorLeft, setCursorLeft] = useState({ line: 1, col: 1 });
  const [cursorRight, setCursorRight] = useState({ line: 1, col: 1 });
  const [isCopied, setIsCopied] = useState(false);
  const [isExported, setIsExported] = useState(false);

  const fileInputLeftRef = useRef<HTMLInputElement>(null);
  const fileInputRightRef = useRef<HTMLInputElement>(null);

  // Trigger diff calculation
  const runComparison = () => {
    const result = computeDiff(leftText, rightText, {
      ignoreWhitespace,
      caseInsensitive
    });
    setDiffResult(result);
    if (onAddHistory) {
      onAddHistory(leftText, rightText, result.stats);
    }
  };

  // Run on initial load and when parameters optionally shift
  useEffect(() => {
    runComparison();
  }, [ignoreWhitespace, caseInsensitive]);

  // Read standard cursor indices
  const handleCursorTrack = (
    e: React.SyntheticEvent<HTMLTextAreaElement>, 
    side: 'left' | 'right'
  ) => {
    const target = e.currentTarget;
    const textBeforeCursor = target.value.substring(0, target.selectionStart);
    const lines = textBeforeCursor.split('\n');
    const lineNum = lines.length;
    const colNum = lines[lines.length - 1].length + 1;

    if (side === 'left') {
      setCursorLeft({ line: lineNum, col: colNum });
    } else {
      setCursorRight({ line: lineNum, col: colNum });
    }
  };

  // Drag & drop file uploads
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, side: 'left' | 'right') => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string || '';
        if (side === 'left') setLeftText(text);
        else setRightText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, side: 'left' | 'right') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string || '';
        if (side === 'left') setLeftText(text);
        else setRightText(text);
      };
      reader.readAsText(file);
    }
  };

  // Copy Unified Diff text format
  const copyUnifiedDiffText = () => {
    if (!diffResult) return;
    let text = `--- Original File\n+++ Modified File\n`;
    
    diffResult.leftLines.forEach((line, index) => {
      const rightLine = diffResult.rightLines[index];
      if (line.type === 'normal') {
        text += `  ${line.content}\n`;
      } else if (line.type === 'deletion') {
        text += `- ${line.content}\n`;
      }
      
      if (rightLine && rightLine.type === 'addition') {
        text += `+ ${rightLine.content}\n`;
      }
    });

    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Export comparison as file
  const exportDiffAsFile = () => {
    if (!diffResult) return;
    const exportObj = {
      timestamp: new Date().toISOString(),
      leftText,
      rightText,
      stats: diffResult.stats,
      views: {
        splitLCSCount: diffResult.leftLines.length,
      }
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "compare_anything_diff.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setIsExported(true);
    setTimeout(() => setIsExported(false), 2000);
  };

  const triggerSavePrompt = () => {
    if (!diffResult) return;
    const title = prompt("Save Snapshot Title", "Snapshot - " + new Date().toLocaleTimeString());
    if (title && onSaveSnapshot) {
      onSaveSnapshot(title, leftText, rightText, diffResult.stats);
      alert("Snapshot successfully captured to 'Saved' tab!");
    }
  };

  return (
    <div className="space-y-6 w-full" id="compare-workspace">
      {/* Diff Toolbar (Pristine Bento styled bar) */}
      <section className="flex flex-wrap items-center justify-between gap-4 p-5 bg-[#141414] border border-[#222222] rounded-[24px] relative z-10 animate-fade-in">
        <div className="flex flex-wrap items-center gap-5">
          {/* View Mode Switcher */}
          <div className="flex p-1 bg-[#0A0A0A] border border-[#222222] rounded-full">
            <button 
              id="view-mode-split"
              onClick={() => setViewMode('split')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all ${
                viewMode === 'split' 
                  ? 'bg-white text-black' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Split
            </button>
            <button 
              id="view-mode-unified"
              onClick={() => setViewMode('unified')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all ${
                viewMode === 'unified' 
                  ? 'bg-white text-black' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Unified
            </button>
          </div>

          {/* Granularity Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-medium font-sans">Granularity:</span>
            <div className="relative">
              <select
                id="select-granularity"
                value={granularity}
                onChange={(e) => setGranularity(e.target.value as any)}
                className="appearance-none bg-[#0A0A0A] border border-[#222222] text-[#F5F5F5] text-xs rounded-xl px-4 py-1.5 pr-9 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer font-sans"
              >
                <option value="Line">Line</option>
                <option value="Word">Word</option>
                <option value="Character">Character</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-2.5 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Settings checkboxes */}
          <div className="flex items-center gap-4 border-l border-[#222222] pl-4">
            <label className="flex items-center gap-2 cursor-pointer group select-none">
              <input 
                id="check-ignore-whitespace"
                type="checkbox" 
                checked={ignoreWhitespace}
                onChange={(e) => setIgnoreWhitespace(e.target.checked)}
                className="w-4 h-4 rounded border-[#222222] bg-[#0A0A0A] focus:ring-indigo-600 cursor-pointer text-indigo-500"
              />
              <span className="text-xs text-gray-400 group-hover:text-white transition-all font-sans">Ignore Whitespace</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer group select-none">
              <input 
                id="check-case-insensitive"
                type="checkbox" 
                checked={caseInsensitive}
                onChange={(e) => setCaseInsensitive(e.target.checked)}
                className="w-4 h-4 rounded border-[#222222] bg-[#0A0A0A] focus:ring-indigo-600 cursor-pointer text-indigo-500"
              />
              <span className="text-xs text-gray-400 group-hover:text-white transition-all font-sans">Case Insensitive</span>
            </label>
          </div>
        </div>

        {/* Change Stats and Action buttons */}
        <div className="flex items-center gap-4">
          {diffResult && (
            <div className="flex items-center gap-2 font-mono text-xs">
              <div className="flex items-center px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20 font-semibold shadow-inner mr-1.5">
                <span className="font-black mr-1">{diffResult.stats.modified}</span> mod
              </div>
              <div className="flex items-center px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 font-semibold shadow-inner mr-1.5">
                <span className="font-black mr-1">{diffResult.stats.added}</span> add
              </div>
              <div className="flex items-center px-3 py-1 bg-rose-500/10 text-rose-400 rounded-full border border-rose-500/20 font-semibold shadow-inner">
                <span className="font-black mr-1">{diffResult.stats.removed}</span> del
              </div>
            </div>
          )}

          <button 
            id="btn-run-comparison"
            onClick={runComparison}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-600/15 font-sans cursor-pointer"
          >
            <GitPullRequest className="w-3.5 h-3.5" />
            Run Comparison
          </button>
        </div>
      </section>

      {/* Editor inputs */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Side: Original File (Bento Block structure) */}
        <div 
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'left')}
          className="flex flex-col bg-[#141414] border border-[#222222] rounded-[24px] overflow-hidden focus-within:border-indigo-500 transition-all shadow-lg shadow-black/30 relative"
        >
          <div className="flex items-center justify-between px-5 py-3.5 bg-[#141414] border-b border-[#222222]">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-bold text-[#F5F5F5] font-sans">Original File</span>
            </div>
            <div className="flex items-center gap-1.5">
              <input 
                type="file" 
                ref={fileInputLeftRef} 
                onChange={(e) => handleFileSelect(e, 'left')}
                className="hidden" 
              />
              <button 
                id="btn-upload-left"
                onClick={() => fileInputLeftRef.current?.click()}
                className="p-1.5 hover:bg-[#222222] rounded-lg transition-all text-gray-400 hover:text-[#F5F5F5]"
                title="Drag or Upload File"
              >
                <Upload className="w-3.5 h-3.5" />
              </button>
              <button 
                id="btn-clear-left"
                onClick={() => setLeftText('')}
                className="p-1.5 hover:bg-[#222222] rounded-lg transition-all text-gray-400 hover:text-red-400"
                title="Clear content"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 flex min-h-[220px]">
            {/* Simple line gutter */}
            <div className="px-3 py-3 bg-[#0A0A0A]/40 border-r border-[#222222] font-mono text-xs text-gray-600 text-right select-none min-w-[32px] leading-6">
              {leftText.split('\n').map((_, idx) => (
                <div key={idx}>{idx + 1}</div>
              ))}
            </div>
            <textarea
              id="textarea-original"
              value={leftText}
              onChange={(e) => {
                setLeftText(e.target.value);
                handleCursorTrack(e, 'left');
              }}
              onKeyUp={(e) => handleCursorTrack(e, 'left')}
              onSelect={(e) => handleCursorTrack(e, 'left')}
              className="flex-grow bg-transparent p-3 font-mono text-xs text-[#F5F5F5] placeholder-[#525252] leading-6 border-none outline-none focus:ring-0 resize-none custom-scrollbar focus:outline-none"
              placeholder="Paste original structure here..."
              spellCheck="false"
            />
          </div>

          <div className="px-5 py-2.5 bg-[#0A0A0A]/40 border-t border-[#222222] flex justify-between items-center text-[10px] text-gray-500 font-mono font-bold">
            <span>TEXT / CONFIG</span>
            <span>LN {cursorLeft.line}, COL {cursorLeft.col}</span>
          </div>
        </div>

        {/* Right Side: Modified File (Bento Block structure) */}
        <div 
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'right')}
          className="flex flex-col bg-[#141414] border border-[#222222] rounded-[24px] overflow-hidden focus-within:border-indigo-500 transition-all shadow-lg shadow-black/30 relative animate-fade-in"
        >
          <div className="flex items-center justify-between px-5 py-3.5 bg-[#141414] border-b border-[#222222]">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-bold text-[#F5F5F5] font-sans">Modified File</span>
            </div>
            <div className="flex items-center gap-1.5">
              <input 
                type="file" 
                ref={fileInputRightRef} 
                onChange={(e) => handleFileSelect(e, 'right')}
                className="hidden" 
              />
              <button 
                id="btn-upload-right"
                onClick={() => fileInputRightRef.current?.click()}
                className="p-1.5 hover:bg-[#222222] rounded-lg transition-all text-gray-400 hover:text-[#F5F5F5]"
                title="Drag or Upload File"
              >
                <Upload className="w-3.5 h-3.5" />
              </button>
              <button 
                id="btn-clear-right"
                onClick={() => setRightText('')}
                className="p-1.5 hover:bg-[#222222] rounded-lg transition-all text-gray-400 hover:text-red-400"
                title="Clear content"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 flex min-h-[220px]">
            {/* Simple line gutter */}
            <div className="px-3 py-3 bg-[#0A0A0A]/40 border-r border-[#222222] font-mono text-xs text-gray-600 text-right select-none min-w-[32px] leading-6">
              {rightText.split('\n').map((_, idx) => (
                <div key={idx}>{idx + 1}</div>
              ))}
            </div>
            <textarea
              id="textarea-modified"
              value={rightText}
              onChange={(e) => {
                setRightText(e.target.value);
                handleCursorTrack(e, 'right');
              }}
              onKeyUp={(e) => handleCursorTrack(e, 'right')}
              onSelect={(e) => handleCursorTrack(e, 'right')}
              className="flex-grow bg-transparent p-3 font-mono text-xs text-[#F5F5F5] placeholder-[#525252] leading-6 border-none outline-none focus:ring-0 resize-none custom-scrollbar focus:outline-none"
              placeholder="Paste modified structure here..."
              spellCheck="false"
            />
          </div>

          <div className="px-5 py-2.5 bg-[#0A0A0A]/40 border-t border-[#222222] flex justify-between items-center text-[10px] text-gray-500 font-mono font-bold">
            <span>TEXT / CONFIG</span>
            <span>LN {cursorRight.line}, COL {cursorRight.col}</span>
          </div>
        </div>
      </section>

      {/* Save Trigger utility */}
      <div className="flex justify-start px-2">
        <button 
          id="btn-save-snapshot-trigger"
          onClick={triggerSavePrompt}
          className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 hover:underline transition-colors duration-200 cursor-pointer"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Capture currently input code as a saved Snapshot
        </button>
      </div>

      {/* Comparison results */}
      {diffResult && (
        <section className="flex flex-col bg-[#141414] border border-[#222222] rounded-[24px] overflow-hidden shadow-xl mb-6 relative z-10 animate-fade-in">
          <div className="px-6 py-4 bg-[#141414] border-b border-[#222222] flex flex-wrap justify-between items-center gap-4">
            <h3 className="text-sm font-bold text-[#F5F5F5] flex items-center gap-2 font-sans">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
              Comparison Result
            </h3>
            <div className="flex items-center gap-2">
              <button 
                id="btn-export-diff"
                onClick={exportDiffAsFile}
                className="flex items-center gap-1.5 border border-[#222222] hover:bg-[#1A1A1A] text-[#F5F5F5] px-3.5 py-1.5 rounded-xl text-xs font-semibold leading-tight transition-all font-sans cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-indigo-400" />
                {isExported ? 'Exported!' : 'Export Diff'}
              </button>
              <button 
                id="btn-copy-unified"
                onClick={copyUnifiedDiffText}
                className="flex items-center gap-1.5 border border-[#222222] hover:bg-[#1A1A1A] text-[#F5F5F5] px-3.5 py-1.5 rounded-xl text-xs font-semibold leading-tight transition-all font-sans cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5 text-indigo-400" />
                {isCopied ? 'Copied!' : 'Copy Unified'}
              </button>
            </div>
          </div>

          {/* Diffs Side by Side container */}
          {viewMode === 'split' ? (
            <div className="grid grid-cols-2 bg-[#0A0A0A] font-mono text-xs overflow-x-auto text-[#F5F5F5] select-text">
              {/* Left Column (Deletions) */}
              <div className="border-r border-[#222222] overflow-hidden">
                {diffResult.leftLines.map((line, idx) => {
                  let bgClass = 'bg-transparent';
                  let prefix = ' ';
                  let textClass = 'opacity-70';

                  if (line.type === 'deletion') {
                    bgClass = 'bg-rose-950/20 hover:bg-rose-950/30 border-l-2 border-[#ef4444]';
                    prefix = '-';
                    textClass = 'text-[#ef4444]';
                  } else if (line.type === 'spacer') {
                    bgClass = 'bg-[#141414]/10 select-none';
                  } else if (line.type === 'normal') {
                    textClass = 'text-[#F5F5F5]/60';
                  }

                  return (
                    <div key={idx} className={`flex leading-6 transition-all ${bgClass} w-full`}>
                      <div className="py-0.5 pr-3 select-none text-right text-gray-600 font-mono border-r border-[#222222]/30 min-w-[44px] bg-[#0A0A0A]/45">
                        {line.lineNumberLeft || ''}
                      </div>
                      <div className={`px-3 py-0.5 flex-grow truncate flex items-center min-h-[24px] ${textClass}`}>
                        {line.type !== 'spacer' && <span className="font-bold mr-2 select-none opacity-40">{prefix}</span>}
                        <span className="whitespace-pre">{line.content}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column (Additions) */}
              <div className="overflow-hidden">
                {diffResult.rightLines.map((line, idx) => {
                  let bgClass = 'bg-transparent';
                  let prefix = ' ';
                  let textClass = 'opacity-70';

                  if (line.type === 'addition') {
                    bgClass = 'bg-emerald-950/20 hover:bg-emerald-950/30 border-l-2 border-[#22c55e]';
                    prefix = '+';
                    textClass = 'text-[#22c55e]';
                  } else if (line.type === 'spacer') {
                    bgClass = 'bg-[#141414]/10 select-none';
                  } else if (line.type === 'normal') {
                    textClass = 'text-[#F5F5F5]/60';
                  }

                  return (
                    <div key={idx} className={`flex leading-6 transition-all ${bgClass} w-full`}>
                      <div className="py-0.5 pr-3 select-none text-right text-gray-600 font-mono border-r border-[#222222]/30 min-w-[44px] bg-[#0A0A0A]/45">
                        {line.lineNumberRight || ''}
                      </div>
                      <div className={`px-3 py-0.5 flex-grow truncate flex items-center min-h-[24px] ${textClass}`}>
                        {line.type !== 'spacer' && <span className="font-bold mr-2 select-none opacity-40">{prefix}</span>}
                        <span className="whitespace-pre">{line.content}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Unified view stack */
            <div className="bg-[#0A0A0A] font-mono text-xs overflow-x-auto text-[#F5F5F5] py-2">
              {diffResult.leftLines.map((line, idx) => {
                const rightLine = diffResult.rightLines[idx];
                
                // Render corresponding lines in sequence
                if (line.type === 'deletion') {
                  return (
                    <React.Fragment key={idx}>
                      <div className="flex leading-6 bg-rose-950/20 border-l-2 border-[#ef4444]">
                        <div className="py-0.5 pr-3 text-gray-600 bg-[#0A0A0A]/20 text-right min-w-[44px] select-none">-</div>
                        <div className="px-3 py-0.5 text-[#ef4444] whitespace-pre"><span className="mr-2 opacity-55 font-bold">-</span>{line.content}</div>
                      </div>
                      {rightLine && rightLine.type === 'addition' && (
                        <div className="flex leading-6 bg-emerald-950/20 border-l-2 border-[#22c55e]">
                          <div className="py-0.5 pr-3 text-gray-600 bg-[#0A0A0A]/20 text-right min-w-[44px] select-none">+</div>
                          <div className="px-3 py-0.5 text-[#22c55e] whitespace-pre"><span className="mr-2 opacity-55 font-bold">+</span>{rightLine.content}</div>
                        </div>
                      )}
                    </React.Fragment>
                  );
                }

                if (line.type === 'normal') {
                  return (
                    <div key={idx} className="flex leading-6 text-[#F5F5F5]/70 hover:bg-[#141414]/40">
                      <div className="py-0.5 pr-3 text-gray-600 bg-[#0A0A0A]/20 text-right min-w-[44px] select-none">{line.lineNumberLeft}</div>
                      <div className="px-3 py-0.5 whitespace-pre"><span className="mr-2 opacity-15 font-bold"> </span>{line.content}</div>
                    </div>
                  );
                }

                if (line.type === 'spacer' && rightLine && rightLine.type === 'addition') {
                  return (
                    <div key={idx} className="flex leading-6 bg-emerald-950/20 border-l-2 border-[#22c55e]">
                      <div className="py-0.5 pr-3 text-gray-600 bg-[#0A0A0A]/20 text-right min-w-[44px] select-none">+</div>
                      <div className="px-3 py-0.5 text-[#22c55e] whitespace-pre"><span className="mr-2 opacity-55 font-bold">+</span>{rightLine.content}</div>
                    </div>
                  );
                }

                return null;
              })}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
