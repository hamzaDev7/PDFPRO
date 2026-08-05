import React, { useRef, useEffect } from 'react';
import { Search, X, Shield, Zap, Layers } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  totalToolsCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  setSearchQuery,
  setActiveCategory,
  totalToolsCount,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut '/' to focus search bar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Subtle Background Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#FF4D00]/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-[#FF8700]/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-6 shadow-inner">
          <span className="flex h-2 w-2 rounded-full bg-[#FF4D00] animate-pulse"></span>
          <span className="text-[#FF4D00] font-semibold">100% Client-Side Engine</span>
          <span className="text-zinc-400 dark:text-zinc-600">•</span>
          <span>No limits or watermarks</span>
        </div>

        {/* Big Headline */}
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-zinc-900 dark:text-white tracking-tight leading-[1.1] mb-6">
          30 Powerful PDF Tools —{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF4D00] via-[#FF8700] to-[#FF2E00]">
            All Free
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
          No signup required. Zero watermarks. Convert, edit, compress, and secure your PDF files right inside your browser.
        </p>

        {/* Interactive Search Bar */}
        <div className="max-w-2xl mx-auto relative group mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#FF4D00] to-[#FF8700] rounded-2xl opacity-25 group-hover:opacity-60 blur transition duration-300"></div>
          <div className="relative flex items-center bg-white dark:bg-[#1A1A1A] border border-zinc-300 dark:border-zinc-700/80 rounded-xl px-4 py-3.5 shadow-2xl">
            <Search className="w-5 h-5 text-zinc-400 group-focus-within:text-[#FF4D00] transition-colors mr-3 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools... (e.g. Merge, Compress, Word to PDF, Password)"
              className="w-full bg-transparent text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 text-base focus:outline-none"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 rounded-lg text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                title="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            ) : (
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-[11px] font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md">
                /
              </kbd>
            )}
          </div>
        </div>

        {/* Quick Tag Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 text-xs text-zinc-600 dark:text-zinc-400">
          <span className="text-zinc-500 font-medium mr-1">Popular searches:</span>
          {[
            { label: 'PDF to Word', cat: 'Convert' },
            { label: 'Merge PDF', cat: 'Edit' },
            { label: 'Compress PDF', cat: 'Optimize' },
            { label: 'Protect PDF', cat: 'Security' },
            { label: 'OCR PDF', cat: 'View & Extract' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setSearchQuery(item.label);
                const elem = document.getElementById('tools-section');
                elem?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 hover:border-[#FF4D00]/40 text-zinc-800 dark:text-zinc-300 transition-all cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Hero Stats */}
        <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800/80 max-w-3xl mx-auto grid grid-cols-3 gap-4 text-center">
          <div className="p-3 rounded-xl bg-zinc-100/60 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/50">
            <div className="font-heading text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-1 flex items-center justify-center gap-1.5">
              <Layers className="w-5 h-5 text-[#FF4D00]" />
              <span>30 Tools</span>
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">Full Suite Available</div>
          </div>
          <div className="p-3 rounded-xl bg-zinc-100/60 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/50">
            <div className="font-heading text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-1 flex items-center justify-center gap-1.5">
              <Zap className="w-5 h-5 text-[#FF4D00]" />
              <span>100% Free</span>
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">No Hidden Fees</div>
          </div>
          <div className="p-3 rounded-xl bg-zinc-100/60 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/50">
            <div className="font-heading text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-1 flex items-center justify-center gap-1.5">
              <Shield className="w-5 h-5 text-[#FF4D00]" />
              <span>No Signup</span>
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">Instant Online Access</div>
          </div>
        </div>
      </div>
    </section>
  );
};

