import React from 'react';
import { FEATURES_DATA } from '../data/toolsData';

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Why Professionals Choose PDFPro Tools
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg mt-3">
            Built for security, speed, and privacy with browser-native WebAssembly technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES_DATA.map((feat) => (
            <div
              key={feat.title}
              className="bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-[#FF4D00]/50 transition-all group shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 group-hover:bg-[#FF4D00]/10 transition-all">
                {feat.icon}
              </div>
              <h3 className="font-heading text-lg font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-[#FF4D00] transition-colors">
                {feat.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

