import { useState, useEffect, useCallback, useRef } from 'react';
import { Box, IconButton, Modal, Paper, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

interface SVGSpriteViewerModalProps {
  open: boolean;
  onClose: () => void;
  svgUrl: string;
  pdfUrl: string; // For download
  title?: string;
  slidePrefix?: string; // e.g., "icon-Slide"
  slideCount: number;
  startIndex?: number; // Default 1
}

export default function SVGSpriteViewerModal({
  open,
  onClose,
  svgUrl,
  pdfUrl,
  title = 'Presentation',
  slidePrefix = 'icon-Slide',
  slideCount,
  startIndex = 1,
}: SVGSpriteViewerModalProps) {
  const [pageNumber, setPageNumber] = useState<number>(startIndex);
  const [scale, setScale] = useState<number>(1.0);
  const [isPresenting, setIsPresenting] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [svgContent, setSvgContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);

  const numPages = slideCount;
  const endIndex = startIndex + slideCount - 1;

  // Fetch and parse SVG sprite
  useEffect(() => {
    if (open && svgUrl) {
      setLoading(true);
      fetch(svgUrl)
        .then((res) => res.text())
        .then((text) => {
          setSvgContent(text);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to load SVG sprite:', err);
          setLoading(false);
        });
    }
  }, [open, svgUrl]);

  // Extract specific symbol from SVG content
  const getSlideContent = useCallback(() => {
    if (!svgContent) return null;
    
    const currentSlideId = `${slidePrefix}${pageNumber}`;
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgContent, 'image/svg+xml');
    const symbol = doc.getElementById(currentSlideId);
    
    if (!symbol) return null;
    
    // Get the viewBox from the symbol
    const viewBox = symbol.getAttribute('viewBox') || '0 0 1280 720';
    
    // Get the inner content of the symbol
    const innerContent = symbol.innerHTML;
    
    return { viewBox, innerContent };
  }, [svgContent, slidePrefix, pageNumber]);

  const goToPrevPage = useCallback(() => {
    setPageNumber((prev) => Math.max(prev - 1, startIndex));
  }, [startIndex]);

  const goToNextPage = useCallback(() => {
    setPageNumber((prev) => Math.min(prev + 1, endIndex));
  }, [endIndex]);

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
    const svgContainer = svgContainerRef.current;
    if (!svgContainer) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to print');
      return;
    }

    const svgContent = svgContainer.innerHTML;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print ${title}</title>
          <style>
            body { 
              margin: 0; 
              padding: 20px; 
              display: flex; 
              justify-content: center; 
              align-items: center; 
              min-height: 100vh;
            }
            svg { 
              max-width: 100%; 
              max-height: 100vh; 
            }
          </style>
        </head>
        <body>
          ${svgContent}
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.onafterprint = function() { window.close(); };
              }, 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handlePresentation = () => {
    const modalContent = document.querySelector('.svg-modal-content') as HTMLElement;
    if (modalContent && modalContent.requestFullscreen) {
      modalContent.requestFullscreen();
      setIsPresenting(true);
      setIsPlaying(true);
    }
  };

  const handleExitPresentation = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setIsPresenting(false);
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  // Auto-advance slides when playing
  useEffect(() => {
    if (isPlaying && isPresenting) {
      const interval = setInterval(() => {
        setPageNumber((prev) => {
          if (prev >= endIndex) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, isPresenting, endIndex]);

  // Listen for fullscreen exit
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isPresenting) {
        setIsPresenting(false);
        setIsPlaying(false);
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [isPresenting]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          goToNextPage();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevPage();
          break;
        case 'Escape':
          if (isPresenting) {
            handleExitPresentation();
          }
          break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, isPresenting, goToNextPage, goToPrevPage]);

  const handleClose = () => {
    setPageNumber(startIndex);
    setScale(1.0);
    setIsPresenting(false);
    setIsPlaying(false);
    onClose();
  };

  const displayPageNumber = pageNumber - startIndex + 1;

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
        className="svg-modal-content"
        elevation={8}
        ref={containerRef}
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
            <IconButton onClick={goToPrevPage} disabled={pageNumber <= startIndex} size="small">
              <NavigateBeforeIcon />
            </IconButton>
            <Typography variant="body2">
              {displayPageNumber} / {numPages}
            </Typography>
            <IconButton onClick={goToNextPage} disabled={pageNumber >= endIndex} size="small">
              <NavigateNextIcon />
            </IconButton>
          </Box>

          {/* Center controls - Zoom or Presentation controls */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isPresenting ? (
              <>
                <IconButton onClick={togglePlayPause} size="small" title={isPlaying ? 'Pause' : 'Play'}>
                  {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
                <Typography variant="body2">{isPlaying ? 'Playing (5s)' : 'Paused'}</Typography>
              </>
            ) : (
              <>
                <IconButton onClick={zoomOut} size="small">
                  <ZoomOutIcon />
                </IconButton>
                <Typography variant="body2">{Math.round(scale * 100)}%</Typography>
                <IconButton onClick={zoomIn} size="small">
                  <ZoomInIcon />
                </IconButton>
              </>
            )}
          </Box>

          {/* Right controls - Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isPresenting ? (
              <IconButton onClick={handleExitPresentation} size="small" title="Exit Presentation">
                <FullscreenExitIcon />
              </IconButton>
            ) : (
              <>
                <IconButton onClick={handlePresentation} size="small" title="Present">
                  <SlideshowIcon />
                </IconButton>
                <IconButton onClick={handleDownload} size="small" title="Download">
                  <DownloadIcon />
                </IconButton>
                <IconButton onClick={handlePrint} size="small" title="Print">
                  <PrintIcon />
                </IconButton>
              </>
            )}
            <IconButton onClick={handleClose} size="small" title="Close">
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        {/* SVG Content */}
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: isPresenting ? 'center' : 'flex-start',
            backgroundColor: '#525659',
            p: 2,
          }}
        >
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <Typography sx={{ color: '#fff' }}>Loading...</Typography>
            </Box>
          ) : (
            <Box
              ref={svgContainerRef}
              sx={{
                transform: `scale(${scale})`,
                transformOrigin: 'top center',
                transition: 'transform 0.2s ease',
                width: isPresenting ? '100%' : 'auto',
                height: isPresenting ? '100%' : 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {(() => {
                const slideData = getSlideContent();
                if (!slideData) {
                  return (
                    <Typography sx={{ color: '#fff' }}>Slide not found</Typography>
                  );
                }
                return (
                  <svg
                    style={{
                      width: isPresenting ? '100%' : 'auto',
                      height: isPresenting ? '100%' : 'auto',
                      maxWidth: isPresenting ? '100vw' : '100%',
                      maxHeight: isPresenting ? '100vh' : '70vh',
                      backgroundColor: 'white',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    }}
                    viewBox={slideData.viewBox}
                    preserveAspectRatio="xMidYMid meet"
                    dangerouslySetInnerHTML={{ __html: slideData.innerContent }}
                  />
                );
              })()}
            </Box>
          )}
        </Box>
      </Paper>
    </Modal>
  );
}
