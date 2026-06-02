import React, { useState } from 'react';
import { Search, Trash2, Calendar, FileText, ArrowRight, Info } from 'lucide-react';
import { HistoryEntry } from '../types';

interface HistoryViewProps {
  history: HistoryEntry[];
  onLoadHistory: (item: HistoryEntry) => void;
  onDeleteHistory: (id: string) => void;
  onClearHistory: () => void;
}

export default function HistoryView({
  history,
  onLoadHistory,
  onDeleteHistory,
  onClearHistory
}: HistoryViewProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter history based on search query
  const filteredHistory = history.filter(item => 
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.language?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group items
  const categories = ['Today', 'Yesterday', 'Last Week'] as const;

  const getItemsForCategory = (cat: typeof categories[number]) => {
    return filteredHistory.filter(item => item.category === cat);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 w-full animate-fade-in" id="history-container">
      {/* Search Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-[#222222]">
        <div>
          <h2 className="text-xl font-bold text-[#f1f5f9] tracking-tight font-display">Comparison History</h2>
          <p className="text-xs text-gray-400 font-sans">Locate, inspect, and load previous code comparisons stored on your profile.</p>
        </div>
        <div className="relative">
          <input
            id="history-search-input"
            type="text"
            placeholder="Search history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64 bg-[#141414] border border-[#222222] rounded-xl pl-10 pr-4 py-2 text-xs text-[#f1f5f9] placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-505 transition-all font-sans"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />
        </div>
      </div>

      {filteredHistory.length === 0 ? (
        <div className="py-16 text-center bg-[#141414]/40 border border-dashed border-[#222222] rounded-[24px] flex flex-col items-center justify-center">
          <Info className="w-10 h-10 text-gray-400 mb-3" />
          <h3 className="text-sm font-semibold text-[#f1f5f9] font-sans">No history items found</h3>
          <p className="text-xs text-gray-450 text-gray-400 mt-1 font-sans">Try modifying your query or run comparisons to generate log trails.</p>
        </div>
      ) : (
        categories.map(cat => {
          const items = getItemsForCategory(cat);
          if (items.length === 0) return null;

          return (
            <section key={cat} className="space-y-4">
              <div className="flex items-center gap-4 mb-4 select-none">
                <h3 className="text-sm font-bold text-[#f1f5f9] flex items-center gap-2 font-display">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  {cat}
                </h3>
                <div className="h-[1px] flex-1 bg-[#222222]"></div>
                <span className="text-[10px] text-gray-400 font-bold bg-[#141414] px-3 py-1 rounded-full border border-[#222222]">
                  {items.length} {items.length === 1 ? 'Entry' : 'Entries'}
                </span>
              </div>

              <div className="space-y-4">
                {items.map(item => (
                  <div
                    key={item.id}
                    className="group relative bg-[#141414] border border-[#222222] rounded-[24px] overflow-hidden hover:border-indigo-500/40 transition-all duration-200 shadow-md"
                  >
                    <div className="p-5 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                      {/* Left: Info */}
                      <div className="flex-1 min-w-0 space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="px-2 py-0.5 bg-[#0A0A0A] text-indigo-405 text-indigo-400 font-mono text-[10px] rounded border border-[#222222] uppercase tracking-wider font-bold">
                            {item.language}
                          </span>
                          <span className="text-xs text-gray-400 font-sans font-medium">
                            {item.formattedDateTime}
                          </span>
                        </div>

                        {/* Inline Code Preview snippet */}
                        <div className="font-mono text-[11px] text-gray-400 bg-[#0A0A0A]/60 p-3 rounded-xl border border-[#222222]/40 overflow-x-auto truncate leading-5 select-none text-left">
                          <div className="text-rose-455 text-[#ef4444] opacity-80">- Original text context</div>
                          <div className="text-emerald-455 text-[#22c55e] opacity-80">+ Modified text changes</div>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-3 w-full md:w-auto justify-end md:justify-start">
                        {/* Stats indicator */}
                        <div className="text-right mr-4 hidden md:block select-none">
                          <div className="flex gap-2 font-mono text-xs font-bold leading-tight">
                            <span className="text-[#22c55e]">+{item.stats.added}</span>
                            <span className="text-[#ef4444]">-{item.stats.removed}</span>
                          </div>
                          <span className="text-[10px] text-gray-400 font-medium font-sans">changes</span>
                        </div>

                        <button
                          onClick={() => onLoadHistory(item)}
                          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer font-sans shadow-lg shadow-indigo-600/15"
                        >
                          Load
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteHistory(item.id)}
                          className="p-2 text-gray-400 hover:text-rose-400 rounded-lg hover:bg-[#222222] transition-all cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })
      )}

      {/* Global Action note at footer */}
      <div className="pt-8 border-t border-[#222222] flex flex-col items-center justify-center gap-4 text-center">
        <div className="flex items-center gap-2 text-xs text-gray-450 text-gray-400 italic opacity-75 font-sans">
          <Info className="w-4 h-4 text-indigo-400" />
          History tracking is stored locally on your device for fast, offline access.
        </div>
        <button
          id="btn-clear-all-history"
          onClick={() => {
            if (confirm("Are you sure you want to permanently clear all comparison history?")) {
              onClearHistory();
            }
          }}
          className="flex items-center gap-2 px-6 py-2.5 border border-[#222222] rounded-xl text-xs text-rose-455 text-rose-400 hover:bg-rose-500/10 font-bold transition-all cursor-pointer font-sans"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear All History
        </button>
      </div>
    </div>
  );
}
