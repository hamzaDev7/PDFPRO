import React, { useState } from 'react';
import { FileText, Shield, ArrowUp } from 'lucide-react';

interface FooterProps {
  onSelectCategory?: (category: string) => void;
  onShowToast?: (msg: string) => void;
  onNavigatePage?: (page: 'home' | 'about' | 'terms' | 'privacy' | 'disclaimer') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onShowToast, onNavigatePage }) => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (onShowToast) {
      onShowToast('Subscribed to PDFPro updates!');
    }
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageClick = (page: 'home' | 'about' | 'terms' | 'privacy' | 'disclaimer') => {
    if (onNavigatePage) {
      onNavigatePage(page);
    }
  };

  return (
    <footer className="bg-white dark:bg-[#0A0A0A] border-t border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 pt-16 pb-12 relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-200 dark:border-zinc-800/80">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF4D00] to-[#FF8700] p-0.5 flex items-center justify-center orange-glow-sm">
                <div className="w-full h-full bg-zinc-950 dark:bg-[#0F0F0F] rounded-[10px] flex items-center justify-center">
                  <FileText className="w-4 h-4 text-[#FF4D00]" />
                </div>
              </div>
              <span className="font-heading text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                PDF<span className="text-zinc-500 dark:text-zinc-400 font-normal">Pro</span>
                <span className="text-[#FF4D00]">.</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-sm">
              The ultimate free browser-based PDF suite for creators, students, and professionals. Convert, edit, merge, compress, and lock your documents with maximum security.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-500 pt-1">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span>100% Client-Side Private • No Registration</span>
            </div>
          </div>

          {/* Column 1: Categories */}
          <div>
            <h4 className="font-heading text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {['Convert', 'Edit', 'Security', 'Optimize', 'View & Extract'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      if (onNavigatePage) onNavigatePage('home');
                      if (onSelectCategory) onSelectCategory(cat);
                      setTimeout(() => {
                        const elem = document.getElementById('tools-section');
                        elem?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="hover:text-[#FF4D00] transition-colors cursor-pointer"
                  >
                    {cat} Tools
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Popular Pages */}
          <div>
            <h4 className="font-heading text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">
              Pages
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => handlePageClick('about')}
                  className="hover:text-[#FF4D00] transition-colors cursor-pointer"
                >
                  About PDFPro
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('terms')}
                  className="hover:text-[#FF4D00] transition-colors cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('privacy')}
                  className="hover:text-[#FF4D00] transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('disclaimer')}
                  className="hover:text-[#FF4D00] transition-colors cursor-pointer"
                >
                  Disclaimer
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Support */}
          <div>
            <h4 className="font-heading text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">
              Legal & Info
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => handlePageClick('privacy')}
                  className="hover:text-[#FF4D00] transition-colors cursor-pointer"
                >
                  Privacy & Cookies
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('terms')}
                  className="hover:text-[#FF4D00] transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('disclaimer')}
                  className="hover:text-[#FF4D00] transition-colors cursor-pointer"
                >
                  Site Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('about')}
                  className="hover:text-[#FF4D00] transition-colors cursor-pointer"
                >
                  Features & Security
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} PDFPro Tools. All rights reserved. Free for commercial and personal use.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
              title="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

