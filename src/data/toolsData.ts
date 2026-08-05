import { Tool, CategoryType, FAQItem, FeatureItem, StepItem } from '../types';

export const CATEGORIES: CategoryType[] = [
  'All',
  'Convert',
  'Edit',
  'Security',
  'Optimize',
  'View & Extract'
];

export const TOOLS_DATA: Tool[] = [
  // CONVERT (8)
  {
    id: 'pdf-to-word',
    name: 'PDF to Word',
    description: 'Convert PDF to editable .docx document with preserved formatting',
    category: 'Convert',
    emoji: '📄',
    popular: true,
    acceptedFileTypes: '.pdf',
    actionType: 'convert'
  },
  {
    id: 'pdf-to-excel',
    name: 'PDF to Excel',
    description: 'Extract tables and financial data into editable spreadsheets',
    category: 'Convert',
    emoji: '📊',
    acceptedFileTypes: '.pdf',
    actionType: 'convert'
  },
  {
    id: 'pdf-to-powerpoint',
    name: 'PDF to PowerPoint',
    description: 'Turn slides back to editable .pptx presentation decks',
    category: 'Convert',
    emoji: '📊',
    acceptedFileTypes: '.pdf',
    actionType: 'convert'
  },
  {
    id: 'pdf-to-jpg',
    name: 'PDF to JPG',
    description: 'Export each PDF page as high-resolution image files',
    category: 'Convert',
    emoji: '🖼️',
    popular: true,
    acceptedFileTypes: '.pdf',
    actionType: 'convert'
  },
  {
    id: 'word-to-pdf',
    name: 'Word to PDF',
    description: 'Convert Word .docx files to professional PDF format instantly',
    category: 'Convert',
    emoji: '📝',
    popular: true,
    acceptedFileTypes: '.doc,.docx',
    actionType: 'convert'
  },
  {
    id: 'excel-to-pdf',
    name: 'Excel to PDF',
    description: 'Turn spreadsheets and sheets into crisp, printable PDF documents',
    category: 'Convert',
    emoji: '📈',
    acceptedFileTypes: '.xls,.xlsx',
    actionType: 'convert'
  },
  {
    id: 'jpg-to-pdf',
    name: 'JPG to PDF',
    description: 'Combine multiple images into a single organized PDF file',
    category: 'Convert',
    emoji: '🖼️',
    acceptedFileTypes: '.jpg,.jpeg,.png,.webp',
    actionType: 'convert'
  },
  {
    id: 'html-to-pdf',
    name: 'HTML to PDF',
    description: 'Convert any webpage URL or raw HTML string directly into PDF',
    category: 'Convert',
    emoji: '🌐',
    acceptedFileTypes: '.html,.htm',
    actionType: 'convert'
  },

  // EDIT (7)
  {
    id: 'merge-pdf',
    name: 'Merge PDF',
    description: 'Combine multiple PDF documents into one seamless file',
    category: 'Edit',
    emoji: '🧩',
    popular: true,
    acceptedFileTypes: '.pdf',
    actionType: 'merge'
  },
  {
    id: 'split-pdf',
    name: 'Split PDF',
    description: 'Separate pages or custom page ranges into individual PDF files',
    category: 'Edit',
    emoji: '✂️',
    popular: true,
    acceptedFileTypes: '.pdf',
    actionType: 'split'
  },
  {
    id: 'rotate-pdf',
    name: 'Rotate PDF',
    description: 'Fix portrait or landscape orientation for single or all pages',
    category: 'Edit',
    emoji: '🔄',
    acceptedFileTypes: '.pdf',
    actionType: 'rotate'
  },
  {
    id: 'delete-pages',
    name: 'Delete Pages',
    description: 'Select and remove unwanted pages from your PDF file',
    category: 'Edit',
    emoji: '🗑️',
    acceptedFileTypes: '.pdf',
    actionType: 'edit'
  },
  {
    id: 'reorder-pages',
    name: 'Reorder Pages',
    description: 'Drag and drop thumbnail pages to rearrange document flow',
    category: 'Edit',
    emoji: '📑',
    acceptedFileTypes: '.pdf',
    actionType: 'edit'
  },
  {
    id: 'add-watermark',
    name: 'Add Watermark',
    description: 'Stamp custom text or image logos over PDF pages',
    category: 'Edit',
    emoji: '💧',
    acceptedFileTypes: '.pdf',
    actionType: 'edit'
  },
  {
    id: 'add-page-numbers',
    name: 'Add Page Numbers',
    description: 'Auto-number your PDF with customizable header and footer positions',
    category: 'Edit',
    emoji: '🔢',
    acceptedFileTypes: '.pdf',
    actionType: 'edit'
  },

  // SECURITY (5)
  {
    id: 'protect-pdf',
    name: 'Protect PDF',
    description: 'Encrypt document and lock access with strong AES password',
    category: 'Security',
    emoji: '🔒',
    popular: true,
    acceptedFileTypes: '.pdf',
    actionType: 'protect'
  },
  {
    id: 'unlock-pdf',
    name: 'Unlock PDF',
    description: 'Remove password restrictions and open locked PDF files',
    category: 'Security',
    emoji: '🔓',
    acceptedFileTypes: '.pdf',
    actionType: 'unlock'
  },
  {
    id: 'sign-pdf',
    name: 'Sign PDF',
    description: 'Draw or insert electronic digital signature on any page',
    category: 'Security',
    emoji: '✍️',
    popular: true,
    acceptedFileTypes: '.pdf',
    actionType: 'sign'
  },
  {
    id: 'redact-pdf',
    name: 'Redact PDF',
    description: 'Black out confidential text, financial figures, or personal data',
    category: 'Security',
    emoji: '⬛',
    acceptedFileTypes: '.pdf',
    actionType: 'edit'
  },
  {
    id: 'flatten-pdf',
    name: 'Flatten PDF',
    description: 'Make form fields, annotations, and signatures permanent',
    category: 'Security',
    emoji: '🥞',
    acceptedFileTypes: '.pdf',
    actionType: 'edit'
  },

  // OPTIMIZE (5)
  {
    id: 'compress-pdf',
    name: 'Compress PDF',
    description: 'Significantly reduce file size while maintaining high quality',
    category: 'Optimize',
    emoji: '⚡',
    popular: true,
    acceptedFileTypes: '.pdf',
    actionType: 'compress'
  },
  {
    id: 'repair-pdf',
    name: 'Repair PDF',
    description: 'Recover data and fix broken or corrupted PDF structures',
    category: 'Optimize',
    emoji: '🛠️',
    acceptedFileTypes: '.pdf',
    actionType: 'edit'
  },
  {
    id: 'grayscale-pdf',
    name: 'Grayscale PDF',
    description: 'Convert full-color document to black & white to save ink',
    category: 'Optimize',
    emoji: '🎨',
    acceptedFileTypes: '.pdf',
    actionType: 'edit'
  },
  {
    id: 'crop-pdf',
    name: 'Crop PDF',
    description: 'Trim page margins and adjust visible canvas boundaries',
    category: 'Optimize',
    emoji: '📐',
    acceptedFileTypes: '.pdf',
    actionType: 'edit'
  },
  {
    id: 'resize-pdf',
    name: 'Resize PDF',
    description: 'Change paper size to A4, Letter, Legal, or custom dimensions',
    category: 'Optimize',
    emoji: '📏',
    acceptedFileTypes: '.pdf',
    actionType: 'edit'
  },

  // VIEW & EXTRACT (5)
  {
    id: 'pdf-reader',
    name: 'PDF Reader',
    description: 'View, zoom, print, and navigate PDF files directly in browser',
    category: 'View & Extract',
    emoji: '👁️',
    acceptedFileTypes: '.pdf',
    actionType: 'extract'
  },
  {
    id: 'extract-text',
    name: 'Extract Text',
    description: 'Pull all plain text and contents from PDF into copyable format',
    category: 'View & Extract',
    emoji: '📜',
    acceptedFileTypes: '.pdf',
    actionType: 'extract'
  },
  {
    id: 'extract-images',
    name: 'Extract Images',
    description: 'Save all embedded photos and graphical assets from PDF',
    category: 'View & Extract',
    emoji: '🖼️',
    acceptedFileTypes: '.pdf',
    actionType: 'extract'
  },
  {
    id: 'pdf-to-text',
    name: 'PDF to Text',
    description: 'Export raw document content into a downloadable .txt file',
    category: 'View & Extract',
    emoji: '📋',
    acceptedFileTypes: '.pdf',
    actionType: 'extract'
  },
  {
    id: 'ocr-pdf',
    name: 'OCR PDF',
    description: 'Make scanned physical documents and images searchable and editable',
    category: 'View & Extract',
    emoji: '🔍',
    popular: true,
    acceptedFileTypes: '.pdf,.png,.jpg',
    actionType: 'ocr'
  }
];

export const STEPS_DATA: StepItem[] = [
  {
    step: 1,
    title: 'Upload your file',
    description: 'Drag & drop your PDF or documents from your computer, Google Drive, or device.',
    iconName: 'Upload'
  },
  {
    step: 2,
    title: 'Choose your tool',
    description: 'Select from 30 conversion, editing, compression, or security tools.',
    iconName: 'Sliders'
  },
  {
    step: 3,
    title: 'Download result',
    description: 'Get your high-quality processed file instantly with zero watermarks.',
    iconName: 'Download'
  }
];

export const FEATURES_DATA: FeatureItem[] = [
  {
    icon: '🔒',
    title: '100% Secure',
    description: 'All processed files are encrypted and automatically deleted from our processing engine after 1 hour.'
  },
  {
    icon: '⚡',
    title: 'Fast Processing',
    description: 'Powered by browser WebAssembly engines for blazing fast, instant conversion and editing speeds.'
  },
  {
    icon: '🆓',
    title: 'Always Free',
    description: 'Enjoy unlimited tool usage without hidden charges, credit cards, or subscription popups.'
  },
  {
    icon: '📱',
    title: 'Works Everywhere',
    description: 'Fully responsive across macOS, Windows, Linux, iOS, Android, and tablets on any modern browser.'
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Are my PDF files safe when using PDFPro Tools?',
    answer: 'Absolutely. We take privacy extremely seriously. Most computations occur directly inside your browser. Any temporary backend tasks are transmitted via 256-bit SSL encryption and permanently deleted automatically within 60 minutes.'
  },
  {
    id: 'faq-2',
    question: 'Do I need to create an account or register to use these tools?',
    answer: 'No registration or signup is required! You can start converting, merging, compressing, or signing your PDFs immediately without providing an email or credit card.'
  },
  {
    id: 'faq-3',
    question: 'Is there any file size limit for uploading documents?',
    answer: 'PDFPro Tools supports files up to 100 MB per batch for free. Since processing runs right inside your web browser, large documents render and convert at maximum hardware performance.'
  },
  {
    id: 'faq-4',
    question: 'Does PDFPro Tools add any watermarks to my converted files?',
    answer: 'Never. All output files remain clean, crisp, and 100% watermark-free, whether you convert PDF to Word, compress, or add page numbers.'
  },
  {
    id: 'faq-5',
    question: 'Can I use PDFPro Tools on my mobile phone or tablet?',
    answer: 'Yes! PDFPro Tools is engineered with a mobile-first responsive touch interface. It works seamlessly on iPhones, iPads, Android smartphones, Chromebooks, and laptops.'
  }
];
