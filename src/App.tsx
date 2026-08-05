/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Tool, CategoryType } from './types';
import { TOOLS_DATA } from './data/toolsData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ToolsSection } from './components/ToolsSection';
import { HowItWorks } from './components/HowItWorks';
import { Features } from './components/Features';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { ToolModal } from './components/ToolModal';
import { Toast } from './components/Toast';

// Pages
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { Disclaimer } from './pages/Disclaimer';
import { About } from './pages/About';
import { ToolDetailPage } from './pages/ToolDetailPage';

type PageType = 'home' | 'about' | 'terms' | 'privacy' | 'disclaimer' | 'tool-detail';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryType>('All');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [detailTool, setDetailTool] = useState<Tool | null>(null);

  // Responsive Theme state ('dark' or 'light')
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('pdfpro_theme');
    return (saved as 'dark' | 'light') || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('pdfpro_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Toast notification state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'info') => {
    setToast({ message, type });
  };

  const handleSelectTool = (tool: Tool) => {
    setSelectedTool(tool);
  };

  const handleOpenToolDetail = (tool: Tool) => {
    setDetailTool(tool);
    setCurrentPage('tool-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuickTool = () => {
    const popularTool = TOOLS_DATA.find((t) => t.id === 'pdf-to-word') || TOOLS_DATA[0];
    setSelectedTool(popularTool);
  };

  const navigateToPage = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0F0F0F] text-zinc-900 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-300">
      {/* Navigation Bar */}
      <Navbar
        onSelectCategory={(cat) => {
          setActiveCategory(cat as CategoryType);
          navigateToPage('home');
        }}
        onOpenQuickTool={handleOpenQuickTool}
        theme={theme}
        onToggleTheme={toggleTheme}
        onNavigatePage={(page) => navigateToPage(page as PageType)}
        currentPage={currentPage}
      />

      {/* Main Content Pages */}
      <main className="flex-grow pt-20">
        {currentPage === 'terms' && <Terms onGoHome={() => navigateToPage('home')} />}
        {currentPage === 'privacy' && <Privacy onGoHome={() => navigateToPage('home')} />}
        {currentPage === 'disclaimer' && <Disclaimer onGoHome={() => navigateToPage('home')} />}
        {currentPage === 'about' && (
          <About
            onGoHome={() => navigateToPage('home')}
            onSelectCategory={(cat) => {
              setActiveCategory(cat as CategoryType);
              navigateToPage('home');
            }}
          />
        )}
        {currentPage === 'tool-detail' && detailTool && (
          <ToolDetailPage
            tool={detailTool}
            allTools={TOOLS_DATA}
            onGoHome={() => navigateToPage('home')}
            onSelectTool={(tool) => handleOpenToolDetail(tool)}
            onShowToast={showToast}
          />
        )}

        {currentPage === 'home' && (
          <>
            {/* Hero Section with Search & Stats */}
            <Hero
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              totalToolsCount={TOOLS_DATA.length}
            />

            {/* 30 Tools Section with Category Tabs & Glowing Hover Cards */}
            <ToolsSection
              tools={TOOLS_DATA}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSelectTool={handleSelectTool}
            />

            {/* How It Works Section */}
            <HowItWorks />

            {/* Features Section */}
            <Features />

            {/* FAQ Section */}
            <FAQ />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat as CategoryType);
          navigateToPage('home');
        }}
        onShowToast={showToast}
        onNavigatePage={(page) => navigateToPage(page as PageType)}
      />

      {/* Interactive Tool Modal */}
      {selectedTool && (
        <ToolModal
          tool={selectedTool}
          onClose={() => setSelectedTool(null)}
          onShowToast={showToast}
        />
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

