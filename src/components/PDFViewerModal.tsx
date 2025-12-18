import { Box, IconButton, Modal, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface PDFViewerModalProps {
  open: boolean;
  onClose: () => void;
  pdfUrl: string;
  title?: string;
}

export default function PDFViewerModal({ open, onClose, pdfUrl, title = 'PDF Viewer' }: PDFViewerModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby={title}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
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
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            p: 1,
            backgroundColor: '#f5f5f5',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              color: '#666',
              '&:hover': {
                backgroundColor: '#e0e0e0',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ flex: 1, overflow: 'hidden' }}>
          <embed
            src={pdfUrl}
            type="application/pdf"
            width="100%"
            height="100%"
            style={{ border: 'none' }}
          />
        </Box>
      </Paper>
    </Modal>
  );
}
