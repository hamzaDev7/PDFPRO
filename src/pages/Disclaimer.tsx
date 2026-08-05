import React from 'react';
import { AlertCircle, FileCheck2, ArrowLeft, ShieldAlert } from 'lucide-react';

interface DisclaimerProps {
  onGoHome: () => void;
}

export const Disclaimer: React.FC<DisclaimerProps> = ({ onGoHome }) => {
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-semibold mb-4">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Legal Disclaimer</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Disclaimer
        </h1>
        <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
          Important disclosures regarding file conversions, accuracy, and platform usage limits.
        </p>
      </div>

      <div className="space-y-8 text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
        {/* Section 1 */}
        <section className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-[#FF4D00]" />
            Conversion Accuracy & Format Fidelity
          </h2>
          <p>
            PDFPro Tools provides client-side document processing algorithms for converting PDFs to Word, Excel, PowerPoint, Text, JPG, and other formats. While we strive to maintain maximum visual fidelity, font mapping, vector paths, and layout positions, variations may occur depending on original document encoding, embedded font licenses, scanned page quality, and complex layout structures. Users are encouraged to review converted output files before submitting critical financial, medical, or legal filings.
          </p>
        </section>

        {/* Section 2 */}
        <section className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-emerald-500" />
            User Backup Responsibility
          </h2>
          <p>
            Because PDFPro Tools does not maintain permanent remote backups of user files due to our strict zero-retention privacy policy, you are solely responsible for maintaining backup copies of your original files prior to performing destructive operations (e.g., page splitting, deleting pages, compressing, or redacting text).
          </p>
        </section>

        {/* Section 3 */}
        <section className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
            Limitation of Liability
          </h2>
          <p>
            Under no circumstances shall PDFPro Tools, its developers, or affiliates be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to, use of, or inability to use this platform, or any errors or omissions in file content or output formatting.
          </p>
        </section>
      </div>
    </div>
  );
};
