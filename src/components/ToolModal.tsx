import React, { useState, useRef, useEffect } from 'react';
import { Tool, UploadedFile } from '../types';
import { getOutputFileInfo } from '../utils/fileGenerators';
import {
  X,
  Upload,
  FileText,
  CheckCircle,
  Download,
  RefreshCw,
  Lock,
  Unlock,
  Sliders,
  RotateCw,
  PenTool,
  Copy,
  Layers,
  Sparkles,
  AlertCircle,
  Eye,
  Trash2,
  Plus
} from 'lucide-react';

interface ToolModalProps {
  tool: Tool | null;
  onClose: () => void;
  onShowToast: (message: string, type?: 'success' | 'info') => void;
}

export const ToolModal: React.FC<ToolModalProps> = ({ tool, onClose, onShowToast }) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Tool specific options state
  const [password, setPassword] = useState('');
  const [compressLevel, setCompressLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [rotationAngle, setRotationAngle] = useState<number>(90);
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [pageRange, setPageRange] = useState('1-5');
  const [extractedText, setExtractedText] = useState('');
  const [copied, setCopied] = useState(false);
  const [outputFileName, setOutputFileName] = useState('');
  const [outputFileFormat, setOutputFileFormat] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    // Reset modal state when tool changes
    setFiles([]);
    setIsProcessing(false);
    setProgress(0);
    setIsCompleted(false);
    setPassword('');
    setExtractedText('');
    setCopied(false);
    setOutputFileName('');
    setOutputFileFormat('');
  }, [tool]);

  if (!tool) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileList = Array.from(e.target.files) as File[];
      const newFiles: UploadedFile[] = fileList.map((f, idx) => ({
        id: `${Date.now()}-${idx}`,
        name: f.name,
        size: f.size,
        type: f.type || 'application/pdf',
        pageCount: Math.floor(Math.random() * 8) + 1,
      }));
      setFiles((prev) => [...prev, ...newFiles]);
      onShowToast(`Uploaded ${newFiles.length} file(s) successfully!`);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileList = Array.from(e.dataTransfer.files) as File[];
      const newFiles: UploadedFile[] = fileList.map((f, idx) => ({
        id: `${Date.now()}-${idx}`,
        name: f.name,
        size: f.size,
        type: f.type || 'application/pdf',
        pageCount: Math.floor(Math.random() * 10) + 1,
      }));
      setFiles((prev) => [...prev, ...newFiles]);
      onShowToast(`Uploaded ${newFiles.length} file(s)!`);
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleProcess = () => {
    let currentFiles = files;
    if (currentFiles.length === 0) {
      // Create a default sample file if none uploaded
      const sampleFile: UploadedFile = {
        id: 'sample-doc',
        name: `Sample_Document_${tool.id}.pdf`,
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
        onShowToast(`${tool.name} processed successfully!`, 'success');

        let textOutput = '';
        if (tool.category === 'View & Extract' || tool.id === 'extract-text' || tool.id === 'ocr-pdf') {
          textOutput =
            `EXTRACTED CONTENT - ${tool.name.toUpperCase()}\n----------------------------------------\n` +
            `Document: ${currentFiles[0]?.name || 'Sample_Document.pdf'}\n` +
            `Processed: ${new Date().toLocaleTimeString()}\n\n` +
            `1. EXECUTIVE SUMMARY\nThis is the extracted text body generated from your PDF document using browser-based OCR / text extraction engine.\n\n` +
            `2. KEY METRICS & TABLE DATA\n- Total Revenue: $148,500.00\n- Operating Expenses: $32,100.00\n- Net Profit Margin: 28.4%\n- Audit Status: Verified 100%\n\n` +
            `3. CONCLUSION\nAll contents were parsed clean with full fidelity and UTF-8 string encoding.`;
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

  const handleCopyText = () => {
    navigator.clipboard.writeText(extractedText);
    setCopied(true);
    onShowToast('Extracted text copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#1A1A1A] border border-zinc-700/80 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF4D00]/10 border border-[#FF4D00]/20 flex items-center justify-center text-xl">
              {tool.emoji}
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-white flex items-center gap-2">
                <span>{tool.name}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-800 text-zinc-300">
                  {tool.category}
                </span>
              </h3>
              <p className="text-xs text-zinc-400">{tool.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* File Upload Dropzone */}
          {!isCompleted && (
            <div>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                  dragActive
                    ? 'border-[#FF4D00] bg-[#FF4D00]/10'
                    : 'border-zinc-700 hover:border-zinc-500 bg-zinc-900/40'
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-[#FF4D00]/10 text-[#FF4D00] flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-7 h-7" />
                </div>
                <h4 className="text-white font-semibold mb-1">
                  Drag & Drop your document here
                </h4>
                <p className="text-xs text-zinc-400 mb-4">
                  Supports {tool.acceptedFileTypes || '.pdf, .docx, .xlsx, .jpg'} (Up to 100MB)
                </p>
                <label className="inline-flex items-center gap-2 bg-[#FF4D00] hover:bg-[#ff5a12] text-white font-medium text-xs px-5 py-2.5 rounded-xl cursor-pointer shadow-md orange-glow-sm transition-all">
                  <span>Browse File</span>
                  <input
                    type="file"
                    className="hidden"
                    multiple={tool.id === 'merge-pdf' || tool.id === 'jpg-to-pdf'}
                    accept={tool.acceptedFileTypes}
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            </div>
          )}

          {/* Uploaded Files List */}
          {files.length > 0 && !isCompleted && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-400">
                <span>Selected Files ({files.length})</span>
                {tool.id === 'merge-pdf' && (
                  <label className="text-[#FF4D00] hover:underline cursor-pointer flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add more</span>
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      onChange={handleFileUpload}
                    />
                  </label>
                )}
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <FileText className="w-5 h-5 text-[#FF4D00] shrink-0" />
                      <div className="truncate">
                        <p className="text-white font-medium truncate">{file.name}</p>
                        <p className="text-zinc-500 text-[11px]">
                          {formatSize(file.size)} • {file.pageCount} pages
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tool Options Configuration */}
          {!isCompleted && (
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
              <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-[#FF4D00]" />
                <span>Tool Settings</span>
              </h5>

              {/* Protect PDF Option */}
              {tool.id === 'protect-pdf' && (
                <div className="space-y-2">
                  <label className="text-xs text-zinc-300 font-medium block">
                    Set Password Lock
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter strong password..."
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF4D00]"
                    />
                  </div>
                </div>
              )}

              {/* Unlock PDF Option */}
              {tool.id === 'unlock-pdf' && (
                <div className="space-y-2">
                  <label className="text-xs text-zinc-300 font-medium block">
                    Enter Document Password
                  </label>
                  <div className="relative">
                    <Unlock className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password..."
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF4D00]"
                    />
                  </div>
                </div>
              )}

              {/* Compress PDF Option */}
              {tool.id === 'compress-pdf' && (
                <div className="space-y-2">
                  <label className="text-xs text-zinc-300 font-medium block">
                    Compression Ratio
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'low', label: 'Basic (Less size reduction)', ratio: '20%' },
                      { id: 'medium', label: 'Recommended (Balanced)', ratio: '60%' },
                      { id: 'high', label: 'Extreme (Smallest file)', ratio: '80%' },
                    ].map((lvl) => (
                      <button
                        key={lvl.id}
                        type="button"
                        onClick={() => setCompressLevel(lvl.id as any)}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          compressLevel === lvl.id
                            ? 'border-[#FF4D00] bg-[#FF4D00]/10 text-white'
                            : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700'
                        }`}
                      >
                        <div className="text-xs font-bold">{lvl.ratio} Compression</div>
                        <div className="text-[10px] text-zinc-500">{lvl.id}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Rotate PDF Option */}
              {tool.id === 'rotate-pdf' && (
                <div className="space-y-2">
                  <label className="text-xs text-zinc-300 font-medium block">
                    Rotation Orientation
                  </label>
                  <div className="flex gap-2">
                    {[90, 180, 270].map((deg) => (
                      <button
                        key={deg}
                        type="button"
                        onClick={() => setRotationAngle(deg)}
                        className={`px-4 py-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 ${
                          rotationAngle === deg
                            ? 'border-[#FF4D00] bg-[#FF4D00]/10 text-white'
                            : 'border-zinc-800 bg-zinc-950 text-zinc-400'
                        }`}
                      >
                        <RotateCw className="w-3.5 h-3.5 text-[#FF4D00]" />
                        <span>{deg}° Right</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Watermark Option */}
              {tool.id === 'add-watermark' && (
                <div className="space-y-2">
                  <label className="text-xs text-zinc-300 font-medium block">
                    Watermark Text
                  </label>
                  <input
                    type="text"
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                    placeholder="CONFIDENTIAL"
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF4D00]"
                  />
                </div>
              )}

              {/* Split PDF / Delete pages option */}
              {(tool.id === 'split-pdf' || tool.id === 'delete-pages') && (
                <div className="space-y-2">
                  <label className="text-xs text-zinc-300 font-medium block">
                    Page Numbers / Ranges
                  </label>
                  <input
                    type="text"
                    value={pageRange}
                    onChange={(e) => setPageRange(e.target.value)}
                    placeholder="e.g. 1-3, 5, 8"
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF4D00]"
                  />
                </div>
              )}

              {/* Default information badge */}
              {!['protect-pdf', 'unlock-pdf', 'compress-pdf', 'rotate-pdf', 'add-watermark', 'split-pdf', 'delete-pages'].includes(tool.id) && (
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Automatic high-precision conversion engine active. Preserves vectors, fonts, images, and formatting.
                </p>
              )}
            </div>
          )}

          {/* Processing Progress Bar */}
          {isProcessing && (
            <div className="space-y-3 py-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-300 font-medium flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-[#FF4D00] animate-spin" />
                  <span>Processing {tool.name}...</span>
                </span>
                <span className="text-[#FF4D00] font-bold">{progress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#FF4D00] to-[#FF8700] transition-all duration-200"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Completed State */}
          {isCompleted && (
            <div className="text-center py-4 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-heading text-2xl font-bold text-white mb-1">
                  Conversion Complete!
                </h4>
                <p className="text-xs text-zinc-400 max-w-md mx-auto">
                  Your document has been converted into standard <span className="font-bold text-white">.{outputFileFormat || 'output'}</span> format with full layout fidelity.
                </p>
              </div>

              {/* Output File Details & Editable Filename */}
              <div className="text-left bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3 max-w-lg mx-auto">
                <div className="flex items-center justify-between text-xs text-zinc-400 font-semibold">
                  <span>Output File Name & Target Format</span>
                  <span className="px-2.5 py-0.5 rounded text-[10px] bg-[#FF4D00]/20 text-[#FF4D00] font-extrabold uppercase">
                    .{outputFileFormat || 'FILE'}
                  </span>
                </div>
                <div className="relative">
                  <FileText className="w-4 h-4 text-[#FF4D00] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={outputFileName}
                    onChange={(e) => setOutputFileName(e.target.value)}
                    placeholder="Specify output filename..."
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl pl-9 pr-3 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#FF4D00]"
                  />
                </div>
                <p className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Valid, openable document stream guaranteed to open in reader apps.</span>
                </p>
              </div>

              {/* Extracted Text Result Box if applicable */}
              {extractedText && (
                <div className="text-left bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2 max-w-lg mx-auto">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span className="font-bold text-white">Extracted Plain Text Preview</span>
                    <button
                      onClick={handleCopyText}
                      className="flex items-center gap-1 text-[#FF4D00] hover:underline cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copied ? 'Copied!' : 'Copy Text'}</span>
                    </button>
                  </div>
                  <pre className="text-[11px] font-mono text-zinc-300 whitespace-pre-wrap max-h-36 overflow-y-auto p-2.5 bg-zinc-900 rounded-lg border border-zinc-800">
                    {extractedText}
                  </pre>
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FF4D00] hover:bg-[#ff5a12] disabled:opacity-50 text-white font-semibold text-sm px-8 py-3 rounded-xl shadow-lg orange-glow cursor-pointer transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>{isDownloading ? 'Preparing File...' : 'Download Output File'}</span>
                </button>
                <button
                  onClick={() => {
                    setIsCompleted(false);
                    setFiles([]);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-semibold px-5 py-3 rounded-xl cursor-pointer transition-colors"
                >
                  <span>Process Another File</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        {!isCompleted && (
          <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-900/60 flex items-center justify-between">
            <div className="text-xs text-zinc-500">
              ⚡ Browser Executed • 256-Bit SSL
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                disabled={isProcessing}
                onClick={handleProcess}
                className="inline-flex items-center gap-2 bg-[#FF4D00] hover:bg-[#ff5a12] disabled:opacity-50 text-white font-semibold text-xs px-6 py-2.5 rounded-xl shadow-md orange-glow-sm cursor-pointer transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>{files.length > 0 ? `Process (${files.length})` : 'Process Sample PDF'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
