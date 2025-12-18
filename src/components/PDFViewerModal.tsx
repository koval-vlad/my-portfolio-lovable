import { useState } from 'react';
import { Box, IconButton, Modal, Paper, Typography, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerModalProps {
  open: boolean;
  onClose: () => void;
  pdfUrl: string;
  title?: string;
}

export default function PDFViewerModal({ open, onClose, pdfUrl, title = 'PDF Viewer' }: PDFViewerModalProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [loading, setLoading] = useState<boolean>(true);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setLoading(false);
  };

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages));
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 3.0));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = title || 'document.pdf';
    link.click();
  };

  const handlePrint = () => {
    // Print using the rendered canvas from react-pdf
    const canvas = document.querySelector('.react-pdf__Page__canvas') as HTMLCanvasElement;
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png');
      const printWindow = document.createElement('div');
      printWindow.innerHTML = `
        <html>
          <head>
            <title>Print PDF</title>
            <style>
              @media print {
                body { margin: 0; }
                img { max-width: 100%; height: auto; }
              }
            </style>
          </head>
          <body>
            <img src="${dataUrl}" />
          </body>
        </html>
      `;
      const printFrame = document.createElement('iframe');
      printFrame.style.position = 'absolute';
      printFrame.style.top = '-9999px';
      document.body.appendChild(printFrame);
      const frameDoc = printFrame.contentDocument || printFrame.contentWindow?.document;
      if (frameDoc) {
        frameDoc.open();
        frameDoc.write(printWindow.innerHTML);
        frameDoc.close();
        setTimeout(() => {
          printFrame.contentWindow?.print();
          setTimeout(() => document.body.removeChild(printFrame), 1000);
        }, 250);
      }
    }
  };

  const handlePresentation = () => {
    // Use Fullscreen API on the modal content
    const modalContent = document.querySelector('.pdf-modal-content') as HTMLElement;
    if (modalContent && modalContent.requestFullscreen) {
      modalContent.requestFullscreen();
    }
  };

  const handleClose = () => {
    setPageNumber(1);
    setScale(1.0);
    setLoading(true);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby={title}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        className="pdf-modal-content"
        elevation={8}
        sx={{
          width: '90%',
          height: '90%',
          maxWidth: '1200px',
          maxHeight: '800px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          overflow: 'hidden',
          '&:fullscreen': {
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            maxHeight: '100%',
            borderRadius: 0,
          },
        }}
      >
        {/* Toolbar */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 1,
            backgroundColor: '#f5f5f5',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          {/* Left controls - Navigation */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton onClick={goToPrevPage} disabled={pageNumber <= 1} size="small">
              <NavigateBeforeIcon />
            </IconButton>
            <Typography variant="body2">
              {pageNumber} / {numPages}
            </Typography>
            <IconButton onClick={goToNextPage} disabled={pageNumber >= numPages} size="small">
              <NavigateNextIcon />
            </IconButton>
          </Box>

          {/* Center controls - Zoom */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton onClick={zoomOut} size="small">
              <ZoomOutIcon />
            </IconButton>
            <Typography variant="body2">{Math.round(scale * 100)}%</Typography>
            <IconButton onClick={zoomIn} size="small">
              <ZoomInIcon />
            </IconButton>
          </Box>

          {/* Right controls - Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton onClick={handlePresentation} size="small" title="Present">
              <SlideshowIcon />
            </IconButton>
            <IconButton onClick={handleDownload} size="small" title="Download">
              <DownloadIcon />
            </IconButton>
            <IconButton onClick={handlePrint} size="small" title="Print">
              <PrintIcon />
            </IconButton>
            <IconButton onClick={handleClose} size="small" title="Close">
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        {/* PDF Content */}
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            backgroundColor: '#525659',
            p: 2,
          }}
        >
          {loading && (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <CircularProgress sx={{ color: '#fff' }} />
            </Box>
          )}
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={null}
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          </Document>
        </Box>
      </Paper>
    </Modal>
  );
}
