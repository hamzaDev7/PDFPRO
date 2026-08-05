import React from 'react';
import { STEPS_DATA } from '../data/toolsData';
import { Upload, Sliders, Download, ArrowRight, ShieldCheck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Upload':
        return <Upload className="w-6 h-6 text-[#FF4D00]" />;
      case 'Sliders':
        return <Sliders className="w-6 h-6 text-[#FF4D00]" />;
      case 'Download':
        return <Download className="w-6 h-6 text-[#FF4D00]" />;
      default:
        return <Upload className="w-6 h-6 text-[#FF4D00]" />;
    }
  };

  return (
    <section id="how-it-works" className="py-20 bg-zinc-100/80 dark:bg-zinc-950/80 border-y border-zinc-200 dark:border-zinc-800/80 relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-4 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#FF4D00]" />
            <span>Simple 3-Step Process</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight">
            How PDFPro Tools Works
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg mt-3">
            Fast, secure, and hassle-free PDF management right inside your web browser in under 10 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {STEPS_DATA.map((item, index) => (
            <div
              key={item.step}
              className="relative bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 flex flex-col justify-between group hover:border-[#FF4D00]/50 transition-all duration-300 shadow-sm"
            >
              <div>
                {/* Step badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#FF4D00]/10 transition-all">
                    {getIcon(item.iconName)}
                  </div>
                  <span className="font-heading text-3xl font-bold text-zinc-300 dark:text-zinc-700 group-hover:text-[#FF4D00] transition-colors">
                    0{item.step}
                  </span>
                </div>

                <h3 className="font-heading text-xl font-bold text-zinc-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              {index < STEPS_DATA.length - 1 && (
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-500">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

