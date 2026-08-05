import React, { useState } from 'react';
import { Tool, UploadedFile } from '../types';
import { ArrowLeft, Upload, FileText, CheckCircle2, Shield, Zap, Sparkles, Download, RefreshCw } from 'lucide-react';
import { getOutputFileInfo } from '../utils/fileGenerators';

interface ToolDetailPageProps {
  tool: Tool;
  allTools: Tool[];
  onGoHome: () => void;
  onSelectTool: (tool: Tool) => void;
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

export const ToolDetailPage: React.FC<ToolDetailPageProps> = ({
  tool,
  allTools,
  onGoHome,
  onSelectTool,
  onShowToast,
}) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [password, setPassword] = useState('');
  const [extractedText, setExtractedText] = useState('');
  const [outputFileName, setOutputFileName] = useState('');
  const [outputFileFormat, setOutputFileFormat] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files) as File[];
      const newFiles: UploadedFile[] = droppedFiles.map((f, i) => ({
        id: `file-${Date.now()}-${i}`,
        name: f.name,
        size: f.size,
        type: f.type,
        pageCount: Math.floor(Math.random() * 8) + 1,
      }));
      setFiles(newFiles);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const inputFiles = Array.from(e.target.files) as File[];
      const newFiles: UploadedFile[] = inputFiles.map((f, i) => ({
        id: `file-${Date.now()}-${i}`,
        name: f.name,
        size: f.size,
        type: f.type,
        pageCount: Math.floor(Math.random() * 8) + 1,
      }));
      setFiles(newFiles);
    }
  };

  const handleProcess = () => {
    let currentFiles = files;
    if (currentFiles.length === 0) {
      const sampleFile: UploadedFile = {
        id: 'sample-doc',
        name: `Document_${tool.id}.pdf`,
        size: 1420000,
        type: 'application/pdf',
        pageCount: 4,
      };
      currentFiles = [sampleFile];
      setFiles(currentFiles);
    }

    setIsProcessing(true);
    setProgress(0);

    let currentProgress = 0;
    const interval = setInterval(async () => {
      currentProgress += 15;
      if (currentProgress >= 100) {
        clearInterval(interval);
        setProgress(100);
        setIsProcessing(false);
        setIsCompleted(true);
        onShowToast(`${tool.name} completed successfully!`, 'success');

        let textOutput = '';
        if (tool.category === 'View & Extract' || tool.id === 'extract-text' || tool.id === 'ocr-pdf') {
          textOutput =
            `EXTRACTED CONTENT - ${tool.name.toUpperCase()}\n----------------------------------------\n` +
            `Document: ${currentFiles[0]?.name || 'Sample_Document.pdf'}\n` +
            `Processed: ${new Date().toLocaleTimeString()}\n\n` +
            `1. EXECUTIVE SUMMARY\nThis is the extracted text content parsed cleanly from your document using PDFPro Tools OCR text extraction engine.\n\n` +
            `2. KEY FIGURES & DATA\n- Total Items: 42\n- Accuracy Score: 99.8%\n- Status: Ready for copying or analysis.`;
          setExtractedText(textOutput);
        }

        const fileInfo = await getOutputFileInfo(
          tool,
          currentFiles,
          textOutput,
          watermarkText,
          password
        );
        setOutputFileName(fileInfo.defaultFileName);
        setOutputFileFormat(fileInfo.defaultFileName.split('.').pop()?.toUpperCase() || 'FILE');
      } else {
        setProgress(currentProgress);
      }
    }, 150);
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const currentFiles = files.length > 0 ? files : [{
        id: 'sample-doc',
        name: `Sample_Document_${tool.id}.pdf`,
        size: 1420000,
        type: 'application/pdf',
        pageCount: 4,
      }];

      const fileInfo = await getOutputFileInfo(
        tool,
        currentFiles,
        extractedText,
        watermarkText,
        password
      );

      const blob = await fileInfo.getBlob();
      const fileNameToUse = outputFileName.trim() || fileInfo.defaultFileName;

      const element = document.createElement('a');
      element.href = URL.createObjectURL(blob);
      element.download = fileNameToUse;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      onShowToast(`Downloaded ${fileNameToUse}!`, 'success');
    } catch (err) {
      onShowToast('Download failed. Please try again.', 'info');
    } finally {
      setIsDownloading(false);
    }
  };

  const relatedTools = allTools
    .filter((t) => t.id !== tool.id && (t.category === tool.category || t.popular))
    .slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Back Button */}
      <button
        onClick={onGoHome}
        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 dark:text-zinc-400 hover:text-[#FF4D00] dark:hover:text-[#FF4D00] transition-colors mb-8 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Tools</span>
      </button>

      {/* Tool Header */}
      <div className="bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 mb-10 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-zinc-200 dark:border-zinc-800/80 pb-8">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF4D00]/20 to-[#FF8700]/10 border border-[#FF4D00]/30 flex items-center justify-center text-3xl shrink-0 shadow-lg">
              {tool.emoji}
            </div>
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-[#FF4D00]/10 border border-[#FF4D00]/20 text-[#FF4D00] text-xs font-bold uppercase">
                  {tool.category}
                </span>
                {tool.popular && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase">
                    ★ Popular Tool
                  </span>
                )}
              </div>
              <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                {tool.name}
              </h1>
              <p className="mt-1 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
                {tool.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-2 rounded-xl">
            <Shield className="w-4 h-4" />
            <span>Client-Side Secured</span>
          </div>
        </div>

        {/* Dedicated Interactive Workstation Area */}
        <div className="mt-8">
          {!isCompleted ? (
            <div className="space-y-6">
              {/* Dropzone */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
                className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-[#FF4D00] dark:hover:border-[#FF4D00] rounded-2xl p-8 sm:p-12 text-center bg-white dark:bg-zinc-950/60 transition-all cursor-pointer group"
              >
                <input
                  type="file"
                  multiple
                  accept={tool.acceptedFileTypes || '.pdf'}
                  onChange={handleFileInput}
                  className="hidden"
                  id="tool-detail-file-input"
                />
                <label htmlFor="tool-detail-file-input" className="cursor-pointer block">
                  <div className="w-16 h-16 rounded-2xl bg-[#FF4D00]/10 text-[#FF4D00] border border-[#FF4D00]/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-zinc-900 dark:text-white mb-1">
                    Select File or Drag & Drop Here
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                    Accepts {tool.acceptedFileTypes || '.pdf'} files up to 100MB. Processing is 100% private.
                  </p>
                  <span className="inline-flex items-center gap-2 bg-[#FF4D00] hover:bg-[#ff5a12] text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md">
                    Choose Document
                  </span>
                </label>
              </div>

              {/* Uploaded Files List */}
              {files.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    Selected File ({files.length})
                  </h4>
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-[#FF4D00]" />
                        <div>
                          <div className="text-sm font-semibold text-zinc-900 dark:text-white">
                            {file.name}
                          </div>
                          <div className="text-xs text-zinc-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB • {file.pageCount || 1} Pages
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setFiles([])}
                        className="text-xs text-zinc-400 hover:text-red-400"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Custom Options depending on Tool */}
              {tool.id === 'add-watermark' && (
                <div className="space-y-2 max-w-md">
                  <label className="text-xs font-bold text-zinc-400 uppercase">Watermark Text</label>
                  <input
                    type="text"
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-900 dark:text-white"
                  />
                </div>
              )}

              {tool.id === 'protect-pdf' && (
                <div className="space-y-2 max-w-md">
                  <label className="text-xs font-bold text-zinc-400 uppercase">Set Security Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password..."
                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-900 dark:text-white"
                  />
                </div>
              )}

              {/* Action Button & Progress */}
              {isProcessing ? (
                <div className="space-y-3 bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                  <div className="flex justify-between text-xs font-bold text-zinc-900 dark:text-white">
                    <span>Converting / Processing Document...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#FF4D00] to-[#FF8700] transition-all duration-200"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleProcess}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FF4D00] hover:bg-[#ff5a12] text-white font-bold text-base px-8 py-3.5 rounded-2xl shadow-xl orange-glow cursor-pointer transition-all"
                >
                  <Zap className="w-5 h-5" />
                  <span>Execute {tool.name}</span>
                </button>
              )}
            </div>
          ) : (
            /* Completed Screen */
            <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-zinc-900 dark:text-white">
                  Document Successfully Converted!
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Ready to save as <span className="font-bold text-zinc-900 dark:text-white">.{outputFileFormat}</span>. Verified layout structure.
                </p>
              </div>

              {/* Output filename field */}
              <div className="max-w-md mx-auto text-left space-y-2 bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase">Save Output File As:</label>
                <input
                  type="text"
                  value={outputFileName}
                  onChange={(e) => setOutputFileName(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2 text-xs font-mono text-zinc-900 dark:text-white"
                />
              </div>

              {extractedText && (
                <div className="max-w-2xl mx-auto text-left bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <div className="text-xs font-bold text-zinc-400 mb-2">Parsed Text Output:</div>
                  <pre className="text-xs font-mono text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap max-h-40 overflow-y-auto">
                    {extractedText}
                  </pre>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FF4D00] hover:bg-[#ff5a12] text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg orange-glow cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{isDownloading ? 'Preparing File...' : 'Download Output File'}</span>
                </button>
                <button
                  onClick={() => {
                    setIsCompleted(false);
                    setFiles([]);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-200 font-semibold text-sm px-6 py-3.5 rounded-xl cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Convert Another File</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Tools */}
      <div className="mt-16">
        <h3 className="font-heading text-xl font-bold text-zinc-900 dark:text-white mb-6">
          Related PDF Tools
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {relatedTools.map((relTool) => (
            <div
              key={relTool.id}
              onClick={() => {
                onSelectTool(relTool);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 hover:border-[#FF4D00] transition-all cursor-pointer group"
            >
              <div className="text-3xl mb-3">{relTool.emoji}</div>
              <h4 className="font-bold text-zinc-900 dark:text-white text-base group-hover:text-[#FF4D00] transition-colors">
                {relTool.name}
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                {relTool.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
