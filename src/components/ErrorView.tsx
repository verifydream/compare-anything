import React, { useState } from 'react';
import { AlertCircle, Terminal, RefreshCw, ArrowLeft, ShieldAlert } from 'lucide-react';

interface ErrorViewProps {
  onGoHome: () => void;
}

export default function ErrorView({ onGoHome }: ErrorViewProps) {
  const [isResolved, setIsResolved] = useState(false);

  const handleHotfix = () => {
    setIsResolved(true);
    setTimeout(() => {
      onGoHome();
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-10 w-full" id="error-workspace">
      {/* Visual Header */}
      <section className="text-center space-y-4">
        <div className="inline-flex p-4 bg-[#2a1315]/50 border border-[#ef4444]/20 rounded-full text-[#ef4444] mb-2 animate-pulse">
          <ShieldAlert className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-[#f1f5f9] font-sans">404: Router Compilation Error</h1>
        <p className="text-xs text-[#94a3b8] max-w-md mx-auto font-sans leading-relaxed">
          The requested routing path could not be resolved by our virtual compiler. Aligned below is the comparison layout between the expected schema and your active browser query.
        </p>
      </section>

      {/* Code-style comparison container */}
      <section className="bg-[#1a1d27] border border-[#2d3140] rounded-xl overflow-hidden shadow-2xl flex flex-col">
        {/* Terminal Header */}
        <div className="px-4 py-3 bg-[#111319] border-b border-[#2d3140] flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#94a3b8]" />
            <span className="text-xs font-bold text-[#eed49f] font-mono">router_compiler.err --line: 404</span>
          </div>
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
          </div>
        </div>

        {/* Diff content panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 bg-[#0c0e14] font-mono text-xs text-[#f1f5f9]">
          {/* Expected path config */}
          <div className="border-r border-[#2d3140] p-5 space-y-3">
            <h4 className="text-[10px] uppercase font-bold text-[#94a3b8] tracking-widest font-sans border-b border-[#2d3140]/60 pb-1.5 mb-2">Expected Route Template</h4>
            <div className="space-y-1.5 text-[#94a3b8]/75">
              <div><span className="text-[#f59e0b]">import</span> &#123; Workspace &#125; <span className="text-[#f59e0b]">from</span> <span className="text-[#a6da95]">"./views"</span>;</div>
              <div><span className="text-[#f59e0b]">const</span> routes = [</div>
              <div className="bg-[#132a1c] text-[#22c55e] px-2 py-0.5 border-l-2 border-[#22c55e]">
                + &#123; path: <span className="text-[#22c55e]">"/"</span>, component: Workspace &#125;
              </div>
              <div>];</div>
            </div>
          </div>

          {/* Current requested path config */}
          <div className="p-5 space-y-3">
            <h4 className="text-[10px] uppercase font-bold text-[#94a3b8] tracking-widest font-sans border-b border-[#2d3140]/60 pb-1.5 mb-2">Browser Query Path</h4>
            <div className="space-y-1.5 text-[#94a3b8]/75">
              <div><span className="text-[#f59e0b]">import</span> &#123; Workspace &#125; <span className="text-[#f59e0b]">from</span> <span className="text-[#a6da95]">"./views"</span>;</div>
              <div><span className="text-[#f59e0b]">const</span> routes = [</div>
              <div className={`transition-all duration-500 px-2 py-0.5 border-l-2 ${
                isResolved 
                  ? 'bg-[#132a1c] text-[#22c55e] border-[#22c55e]' 
                  : 'bg-[#2a1315] text-[#ef4444] border-[#ef4444]'
              }`}>
                {isResolved 
                  ? '+ { path: "/", component: Workspace }' 
                  : '- { path: "/404-undefined-route", component: null }'
                }
              </div>
              <div>];</div>
            </div>
          </div>
        </div>

        {/* Hotfix Action row */}
        <div className="px-6 py-4 bg-[#111319] border-t border-[#2d3140] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertCircle className={`w-4 h-4 ${isResolved ? 'text-[#22c55e]' : 'text-[#ef4444] animate-bounce'}`} />
            <span className="text-xs text-[#94a3b8] font-sans">
              {isResolved 
                ? 'Routing discrepancy resolved! Reloading...' 
                : 'Compiler suggests checking nested routing path strings.'
              }
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onGoHome}
              disabled={isResolved}
              className="px-4 py-2 border border-[#2d3140] hover:bg-[#282a30] text-[#f1f5f9] text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 font-sans"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return Home
            </button>
            <button
              id="btn-error-compiler-fix"
              onClick={handleHotfix}
              disabled={isResolved}
              className={`px-5 py-2 text-xs font-bold rounded-lg transition-all active:scale-95 flex items-center gap-2 cursor-pointer font-sans ${
                isResolved 
                  ? 'bg-[#22c55e] text-[#132a1c] font-black'
                  : 'bg-[#4d8eff] text-[#00285d] hover:brightness-110'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isResolved ? 'animate-spin' : ''}`} />
              {isResolved ? 'Resolving...' : 'Hotfix Compiler Route'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
