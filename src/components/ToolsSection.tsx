import React from 'react';
import { Tool, CategoryType } from '../types';
import { CATEGORIES } from '../data/toolsData';
import { ArrowRight, Sparkles, SearchX } from 'lucide-react';

interface ToolsSectionProps {
  tools: Tool[];
  activeCategory: CategoryType;
  setActiveCategory: (category: CategoryType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectTool: (tool: Tool) => void;
}

export const ToolsSection: React.FC<ToolsSectionProps> = ({
  tools,
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  onSelectTool,
}) => {
  // Filter logic
  const filteredTools = tools.filter((tool) => {
    const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="tools-section" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4D00]/10 border border-[#FF4D00]/20 text-xs font-semibold text-[#FF4D00] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Complete PDF Suite</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
              Select Your Tool
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base mt-2">
              Showing <span className="text-[#FF4D00] font-semibold">{filteredTools.length}</span> of {tools.length} PDF tools
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none max-w-full">
            {CATEGORIES.map((cat) => {
              const count =
                cat === 'All'
                  ? tools.length
                  : tools.filter((t) => t.category === cat).length;
              const isActive = activeCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#FF4D00] text-white shadow-lg orange-glow-sm'
                      : 'bg-zinc-100 dark:bg-[#1A1A1A] text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white border border-zinc-200 dark:border-zinc-800'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-md text-[11px] ${
                      isActive
                        ? 'bg-black/30 text-white font-bold'
                        : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty Search / Filter State */}
        {filteredTools.length === 0 && (
          <div className="bg-zinc-100 dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-12 text-center max-w-lg mx-auto my-12">
            <div className="w-16 h-16 rounded-2xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-4 text-zinc-400">
              <SearchX className="w-8 h-8 text-[#FF4D00]" />
            </div>
            <h3 className="font-heading text-xl font-bold text-zinc-900 dark:text-white mb-2">No tools found</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6">
              We couldn't find any tool matching "{searchQuery}". Try adjusting your keywords or category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* 30 Tools Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => onSelectTool(tool)}
              className="glow-card-wrapper cursor-pointer group"
            >
              <div className="glow-card-content p-6 flex flex-col justify-between border border-zinc-200 dark:border-zinc-800/90 hover:border-transparent transition-all">
                <div>
                  {/* Top Header inside card */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-[#FF4D00]/10 transition-all duration-300">
                      {tool.emoji}
                    </div>
                    <div className="flex items-center gap-1.5">
                      {tool.popular && (
                        <span className="px-2 py-0.5 rounded-md bg-[#FF4D00]/15 text-[#FF4D00] text-[10px] font-bold uppercase tracking-wider border border-[#FF4D00]/30">
                          Popular
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-md bg-zinc-200 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 text-[10px] font-medium">
                        {tool.category}
                      </span>
                    </div>
                  </div>

                  {/* Tool Title */}
                  <h3 className="font-heading text-lg font-bold text-zinc-900 dark:text-white group-hover:text-[#FF4D00] transition-colors mb-2">
                    {tool.name}
                  </h3>

                  {/* One Line Description */}
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-2">
                    {tool.description}
                  </p>
                </div>

                {/* Bottom Action CTA */}
                <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800/60 flex items-center justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-[#FF4D00] transition-colors">
                  <span>Use Tool</span>
                  <div className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-900 group-hover:bg-[#FF4D00] text-zinc-500 dark:text-zinc-400 group-hover:text-white flex items-center justify-center transition-all">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

