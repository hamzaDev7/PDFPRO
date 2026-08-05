import React from 'react';
import { FileText, ShieldCheck, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';

interface TermsProps {
  onGoHome: () => void;
}

export const Terms: React.FC<TermsProps> = ({ onGoHome }) => {
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4D00]/10 border border-[#FF4D00]/20 text-[#FF4D00] text-xs font-semibold mb-4">
          <FileText className="w-3.5 h-3.5" />
          <span>Legal Agreement</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Terms & Conditions
        </h1>
        <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
          Last updated: January 2026. Please read these terms carefully before using PDFPro Tools.
        </p>
      </div>

      {/* Body Content */}
      <div className="space-y-8 text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
        {/* Section 1 */}
        <section className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-[#FF4D00] text-white flex items-center justify-center text-xs font-bold">1</span>
            Acceptance of Terms
          </h2>
          <p>
            By accessing or using PDFPro Tools ("Service", "Platform", or "we"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must discontinue the use of our services immediately. PDFPro Tools provides client-side document processing, editing, converting, and optimization utilities available online without requiring mandatory account registration.
          </p>
        </section>

        {/* Section 2 */}
        <section className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-[#FF4D00] text-white flex items-center justify-center text-xs font-bold">2</span>
            Client-Side Architecture & Privacy
          </h2>
          <p className="mb-4">
            PDFPro Tools operates primarily using modern browser technology. Document processing, PDF conversions, OCR text extractions, password protections, and page manipulations occur locally within your browser context whenever possible.
          </p>
          <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
              <span>Your document contents are not permanently stored on remote database servers.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
              <span>You retain 100% intellectual property ownership of all files processed through our platform.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
              <span>Temporary cache memory is automatically cleared upon closing your browser tab or finishing document operations.</span>
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-[#FF4D00] text-white flex items-center justify-center text-xs font-bold">3</span>
            Acceptable Use Guidelines
          </h2>
          <p className="mb-4">
            You agree to use PDFPro Tools exclusively for lawful purposes. You shall not use this service to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400 text-sm pl-2">
            <li>Process documents containing illegal, harmful, or malicious materials.</li>
            <li>Attempt to bypass security measures, password protections, or copyright restrictions without authorization from the legitimate owner.</li>
            <li>Reverse-engineer, automated-scrape, or overload the application infrastructure.</li>
            <li>Distribute malware, trojans, or corrupted PDF payloads through output files.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-[#FF4D00] text-white flex items-center justify-center text-xs font-bold">4</span>
            Disclaimer of Warranties
          </h2>
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-sm flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-500" />
            <div>
              PDFPro Tools is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, either express or implied. We do not guarantee uninterrupted operational availability or error-free rendering of highly complex PDF elements.
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-[#FF4D00] text-white flex items-center justify-center text-xs font-bold">5</span>
            Contact Information
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            If you have questions regarding these Terms & Conditions, please reach out to our legal compliance team at <span className="font-semibold text-zinc-900 dark:text-white">support@pdfpro.tools</span>.
          </p>
        </section>
      </div>
    </div>
  );
};
