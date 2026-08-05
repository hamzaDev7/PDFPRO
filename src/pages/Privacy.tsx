import React from 'react';
import { Shield, Lock, CheckCircle2, ArrowLeft, EyeOff, ServerOff } from 'lucide-react';

interface PrivacyProps {
  onGoHome: () => void;
}

export const Privacy: React.FC<PrivacyProps> = ({ onGoHome }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Back Button */}
      <button
        onClick={onGoHome}
        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 dark:text-zinc-400 hover:text-[#FF4D00] dark:hover:text-[#FF4D00] transition-colors mb-8 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Tools</span>
      </button>

      {/* Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-8 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold mb-4">
          <Shield className="w-3.5 h-3.5" />
          <span>Zero-Knowledge Privacy</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
          Your privacy is paramount. Learn how PDFPro Tools guarantees maximum document security.
        </p>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#FF4D00]/10 text-[#FF4D00] flex items-center justify-center shrink-0">
            <ServerOff className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-white text-base">No Server Storage</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
              Your files never sit on external server hard drives. Operations are completed inside browser memory.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
            <EyeOff className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-white text-base">Zero Document Logging</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
              We do not track, index, parse, or analyze document content, metadata, or personal text strings.
            </p>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="space-y-8 text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
        {/* Section 1 */}
        <section className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">1. Information We Collect</h2>
          <p className="mb-3">
            Because PDFPro Tools is built to prioritize user anonymity, we do not require user account registration, email confirmation, or subscription credentials to access our 30 PDF tools.
          </p>
          <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
              <span><strong>Document Data:</strong> Completely processed locally in browser memory.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
              <span><strong>Local Storage Preferences:</strong> UI theme choice (Dark/Light) is saved locally in your browser context.</span>
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">2. How Documents Are Handled</h2>
          <p>
            When you drop a file into any tool (e.g. PDF to Word, Compress PDF, Merge PDF, OCR, Password Protection), the file buffer is read by WebAssembly and browser JS modules. Once processing finishes and you download your file, closing the modal or tab immediately purges the binary data from memory.
          </p>
        </section>

        {/* Section 3 */}
        <section className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">3. Cookies & Analytics</h2>
          <p>
            We use minimal technical cookies exclusively for essential session management and layout responsiveness. We do not sell user data or employ invasive cross-site tracking pixels.
          </p>
        </section>

        {/* Section 4 */}
        <section className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">4. Security Assurance</h2>
          <p>
            Our web application is delivered over strict HTTPS / TLS 1.3 encryption protocols, preventing eavesdropping or interception during transmission.
          </p>
        </section>
      </div>
    </div>
  );
};
