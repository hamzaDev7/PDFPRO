import React from 'react';
import { FileText, ShieldCheck, Zap, Lock, Sparkles, ArrowLeft, Cpu, Users, Layers, Globe } from 'lucide-react';

interface AboutProps {
  onGoHome: () => void;
  onSelectCategory?: (category: string) => void;
}

export const About: React.FC<AboutProps> = ({ onGoHome, onSelectCategory }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Back Button */}
      <button
        onClick={onGoHome}
        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 dark:text-zinc-400 hover:text-[#FF4D00] dark:hover:text-[#FF4D00] transition-colors mb-8 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Tools</span>
      </button>

      {/* Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-zinc-800 p-8 sm:p-12 overflow-hidden mb-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-[#FF4D00]/15 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4D00]/10 border border-[#FF4D00]/20 text-[#FF4D00] text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Empowering Digital Productivity</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            The Ultimate Free <span className="text-gradient">Browser PDF Suite</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed">
            PDFPro Tools was engineered with a clear mission: provide fast, secure, and completely free PDF utilities without requiring paid subscriptions, registration barriers, or uploading private documents to external servers.
          </p>
        </div>
      </div>

      {/* Core Values Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
        <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-center">
          <div className="text-3xl sm:text-4xl font-extrabold text-[#FF4D00]">30+</div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-1">Dedicated Tools</div>
        </div>
        <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-center">
          <div className="text-3xl sm:text-4xl font-extrabold text-emerald-500">100%</div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-1">Client-Side Private</div>
        </div>
        <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-center">
          <div className="text-3xl sm:text-4xl font-extrabold text-white dark:text-white">0$</div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-1">Free Forever</div>
        </div>
        <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-center">
          <div className="text-3xl sm:text-4xl font-extrabold text-amber-500">⚡ Instant</div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-1">Browser Memory Engine</div>
        </div>
      </div>

      {/* Mission & Key Features */}
      <div className="space-y-10">
        <section className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 sm:p-10">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-3">
            <Cpu className="w-7 h-7 text-[#FF4D00]" />
            Why Choose PDFPro Tools?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <div className="w-10 h-10 rounded-xl bg-[#FF4D00]/10 text-[#FF4D00] flex items-center justify-center shrink-0 font-bold">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-zinc-900 dark:text-white text-base">Uncompromising Privacy</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                  Your sensitive documents remain strictly inside your device. We eliminate server risks by processing files in local browser threads.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-zinc-900 dark:text-white text-base">Lightning Fast Speeds</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                  No queue waiting or uploading large files over slow internet. Conversion and compression happen instantly.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-zinc-900 dark:text-white text-base">Comprehensive Toolkit</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                  From PDF to Word/Excel/PowerPoint conversion to OCR text extraction, watermark insertion, and digital signing.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 font-bold">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-zinc-900 dark:text-white text-base">Works Everywhere</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                  Fully responsive across Chrome, Safari, Firefox, Edge, Android tablets, iPads, iPhones, and desktop workstations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="text-center p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#FF4D00] to-[#FF8700] text-white shadow-xl">
          <h3 className="font-heading text-2xl sm:text-3xl font-extrabold mb-3">
            Ready to process your documents?
          </h3>
          <p className="text-sm sm:text-base text-orange-100 max-w-xl mx-auto mb-6">
            Explore our collection of 30 specialized PDF tools designed for maximum speed and simplicity.
          </p>
          <button
            onClick={onGoHome}
            className="inline-flex items-center justify-center gap-2 bg-zinc-950 hover:bg-black text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-all shadow-2xl cursor-pointer"
          >
            <span>Browse All 30 Tools</span>
          </button>
        </div>
      </div>
    </div>
  );
};
