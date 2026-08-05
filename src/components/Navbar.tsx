import React, { useState, useEffect } from 'react';
import { FileText, Menu, X, Zap, ChevronRight, ShieldCheck, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onSelectCategory?: (category: string) => void;
  onOpenQuickTool?: () => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
  onNavigatePage?: (page: 'home' | 'about' | 'terms' | 'privacy' | 'disclaimer') => void;
  currentPage?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectCategory,
  onOpenQuickTool,
  theme = 'dark',
  onToggleTheme,
  onNavigatePage,
  currentPage = 'home',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (currentPage !== 'home' && onNavigatePage) {
      onNavigatePage('home');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePageClick = (page: 'home' | 'about' | 'terms' | 'privacy' | 'disclaimer') => {
    setMobileMenuOpen(false);
    if (onNavigatePage) {
      onNavigatePage(page);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-[#0F0F0F]/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800/80 shadow-2xl py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 group cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              handlePageClick('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF4D00] to-[#FF8700] p-0.5 flex items-center justify-center orange-glow-sm group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-zinc-950 dark:bg-[#0F0F0F] rounded-[10px] flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#FF4D00]" />
              </div>
            </div>
            <div className="flex items-baseline">
              <span className="font-heading text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                PDF<span className="text-zinc-500 dark:text-zinc-400 font-normal">Pro</span>
              </span>
              <span className="text-[#FF4D00] text-2xl font-black ml-0.5 animate-pulse">.</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7">
            <button
              onClick={() => handleNavClick('tools-section')}
              className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-[#FF4D00] dark:hover:text-white transition-colors cursor-pointer"
            >
              Tools
            </button>
            <button
              onClick={() => handlePageClick('about')}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                currentPage === 'about'
                  ? 'text-[#FF4D00] font-bold'
                  : 'text-zinc-600 dark:text-zinc-300 hover:text-[#FF4D00] dark:hover:text-white'
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-[#FF4D00] dark:hover:text-white transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick('features')}
              className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-[#FF4D00] dark:hover:text-white transition-colors cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() => handleNavClick('faq')}
              className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-[#FF4D00] dark:hover:text-white transition-colors cursor-pointer"
            >
              FAQ
            </button>
          </nav>

          {/* Right Action Buttons & Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle Button */}
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-[#FF4D00] dark:hover:text-[#FF4D00] transition-colors cursor-pointer"
                title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-indigo-600" />
                )}
              </button>
            )}

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-zinc-800 dark:text-zinc-300 font-semibold">30 Tools Online</span>
            </div>

            <button
              onClick={() => {
                if (onOpenQuickTool) {
                  onOpenQuickTool();
                } else {
                  handleNavClick('tools-section');
                }
              }}
              className="inline-flex items-center gap-2 bg-[#FF4D00] hover:bg-[#ff5a12] text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg orange-glow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>Try Free</span>
            </button>
          </div>

          {/* Mobile Actions: Theme Toggle + Menu */}
          <div className="md:hidden flex items-center gap-2">
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-amber-400" />
                ) : (
                  <Moon className="w-5 h-5 text-indigo-600" />
                )}
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#121212] border-b border-zinc-200 dark:border-zinc-800 px-4 pt-4 pb-6 space-y-4 shadow-2xl animate-in slide-in-from-top-5 duration-200">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => handleNavClick('tools-section')}
              className="flex items-center justify-between py-2.5 px-3 rounded-lg text-base font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
            >
              <span>30 PDF Tools</span>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </button>
            <button
              onClick={() => handlePageClick('about')}
              className="flex items-center justify-between py-2.5 px-3 rounded-lg text-base font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
            >
              <span>About PDFPro</span>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </button>
            <button
              onClick={() => handlePageClick('terms')}
              className="flex items-center justify-between py-2.5 px-3 rounded-lg text-base font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
            >
              <span>Terms & Conditions</span>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </button>
            <button
              onClick={() => handlePageClick('privacy')}
              className="flex items-center justify-between py-2.5 px-3 rounded-lg text-base font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
            >
              <span>Privacy Policy</span>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </button>
            <button
              onClick={() => handlePageClick('disclaimer')}
              className="flex items-center justify-between py-2.5 px-3 rounded-lg text-base font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
            >
              <span>Disclaimer</span>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </button>
          </div>

          <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenQuickTool) onOpenQuickTool();
                else handleNavClick('tools-section');
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#FF4D00] hover:bg-[#ff5a12] text-white font-semibold py-3 rounded-xl shadow-lg orange-glow-sm"
            >
              <Zap className="w-4 h-4" />
              <span>Try Free Now</span>
            </button>
            <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 py-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>No signup • 100% Free • Secure</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

