import React, { useState } from 'react';
import { Search, FolderSync, Trash2, Plus, Bookmark, Info, LayoutGrid } from 'lucide-react';
import { SaveSnapshot } from '../types';

interface SavedViewProps {
  saved: SaveSnapshot[];
  onLoadSaved: (item: SaveSnapshot) => void;
  onDeleteSaved: (id: string) => void;
  onAddNewTrigger: () => void;
}

export default function SavedView({
  saved,
  onLoadSaved,
  onDeleteSaved,
  onAddNewTrigger
}: SavedViewProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter list
  const filteredSaved = saved.filter(item => 
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.language?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-container-max mx-auto space-y-8 w-full" id="saved-workspace">
      {/* Search Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#222222]">
        <div>
          <h2 className="text-xl font-bold text-[#f1f5f9] tracking-tight font-display">Saved Comparisons</h2>
          <p className="text-xs text-gray-400 font-sans font-medium">Manage, edit, and export your pinned diff results and configuration snapshots.</p>
        </div>
        <div className="relative">
          <input
            id="saved-search-input"
            type="text"
            placeholder="Search saved items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64 bg-[#141414] border border-[#222222] rounded-xl pl-10 pr-4 py-2 text-xs text-[#f1f5f9] placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-sans"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredSaved.map(item => (
          <div
            key={item.id}
            className="group bg-[#141414] border border-[#222222] rounded-[24px] overflow-hidden hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between shadow-lg"
          >
            {/* Card Header */}
            <div className="p-5 border-b border-[#222222] flex justify-between items-start gap-4">
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-[#f1f5f9] truncate font-sans mb-1" title={item.title}>
                  {item.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase font-mono">
                    {item.language}
                  </span>
                  <span className="text-[10px] text-gray-400 font-semibold font-sans">{item.updatedAt}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onLoadSaved(item)}
                  className="p-1.5 text-gray-400 hover:text-indigo-400 hover:bg-[#222222] rounded-lg transition-all cursor-pointer"
                  title="Load and edit Comparison"
                >
                  <FolderSync className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDeleteSaved(item.id)}
                  className="p-1.5 text-gray-400 hover:text-[#ef4444] hover:bg-[#222222] rounded-lg transition-all cursor-pointer"
                  title="Delete Snapshot"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Simulated diff code area preview with dark mask gradient on bottom */}
            <div className="p-4 bg-[#0A0A0A]/60 flex-1 font-mono text-[11px] leading-5 overflow-hidden select-none relative min-h-[110px]">
              <div className="space-y-1 opacity-70">
                <div className="flex gap-2">
                  <span className="text-gray-600 w-4 text-right animate-fade-in">12</span>
                  <span className="text-gray-400 truncate block">"name": "Alex Rivera",</span>
                </div>
                <div className="flex gap-2 bg-rose-950/20 border-l-2 border-[#ef4444] px-1.5 animate-fade-in">
                  <span className="text-[#ef4444] w-4 text-right">-</span>
                  <span className="text-[#ef4444] truncate block">"enable_cache": false,</span>
                </div>
                <div className="flex gap-2 bg-emerald-950/20 border-l-2 border-[#22c55e] px-1.5 animate-fade-in">
                  <span className="text-[#22c55e] w-4 text-right">+</span>
                  <span className="text-[#22c55e] truncate block">"enable_cache": true,</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-600 w-4 text-right animate-fade-in">14</span>
                  <span className="text-gray-400 truncate block">"timeout": 3000</span>
                </div>
              </div>

              {/* Masking visual overlay */}
              <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none"></div>
            </div>

            {/* Footer Summary stats */}
            <div className="px-5 py-3 bg-[#141414] border-t border-[#222222] flex justify-between items-center text-[10px] select-none">
              <div className="flex gap-3">
                <span className="flex items-center gap-1 text-[#22c55e] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]"></span>
                  {item.stats.added} add
                </span>
                <span className="flex items-center gap-1 text-[#ef4444] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]"></span>
                  {item.stats.removed} del
                </span>
              </div>
              <button
                onClick={() => onLoadSaved(item)}
                className="text-indigo-400 hover:text-indigo-300 font-bold font-sans text-xs flex items-center cursor-pointer"
              >
                Load View
              </button>
            </div>
          </div>
        ))}

        {/* Bento grid Card 4: Create new Snapshot */}
        <div
          onClick={onAddNewTrigger}
          className="bg-[#141414]/30 border border-dashed border-[#222222] hover:border-indigo-500/50 rounded-[24px] flex flex-col items-center justify-center p-8 text-center min-h-[220px] cursor-pointer group transition-all"
        >
          <div className="w-12 h-12 rounded-full bg-[#141414] border border-[#222222] group-hover:border-indigo-500/30 text-gray-400 group-hover:text-indigo-400 flex items-center justify-center mb-4 transition-all">
            <Plus className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-[#f1f5f9] font-sans mb-1 group-hover:text-indigo-400 transition-all">New Snapshot</h4>
          <p className="text-xs text-gray-400 max-w-[210px] font-sans">Save currently active workspace compare arrays directly here.</p>
        </div>
      </div>

      {/* Pagination Load controls */}
      <div className="mt-12 flex justify-center">
        <button
          onClick={() => alert("All snapshots loaded.")}
          className="bg-[#282a30] hover:bg-[#33343b] text-[#f1f5f9] border border-[#2d3140] font-sans font-semibold text-xs py-2.5 px-8 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          Load More Comparisons
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
