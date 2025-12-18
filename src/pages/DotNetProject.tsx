import { Box, Typography, Paper, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import PDFViewerModal from '../components/PDFViewerModal';
import hurricanePdf from '../assets/Hurricane-Presentation.pdf';

const projectData = [
  { id: 1, label: 'Dynamo Software' },
  { id: 2, label: 'CRD Trading System' },
  { id: 3, label: 'Portfolio Modeler' },
  { id: 4, label: 'IPO Module' },
  { id: 5, label: 'Asset Mix' },
  { id: 6, label: 'Order Manager' },
  { id: 7, label: 'GiftWrap Merge' },
  { id: 8, label: 'Gift Calcs' },
  { id: 9, label: 'Batch Calcs' },
  { id: 10, label: 'Hurricane Report' },
];

export default function DotNetProject() {
  const { id } = useParams<{ id: string }>();
  const projectId = parseInt(id || '1', 10);
  const project = projectData.find(p => p.id === projectId) || projectData[0];
  const [pdfOpen, setPdfOpen] = useState(false);

  return (
    <Box sx={{ px: '8px', py: 2 }}>
      <Paper
        elevation={2}
        sx={{
          p: 4,
          borderRadius: '10px',
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h3" component="h1">
          {project.label}
        </Typography>
        
        {projectId === 10 && (
          <>
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                startIcon={<SlideshowIcon />}
                onClick={() => setPdfOpen(true)}
                sx={{
                  backgroundColor: '#1976d2',
                  '&:hover': {
                    backgroundColor: '#1565c0',
                  },
                }}
              >
                View Presentation
              </Button>
            </Box>
            <PDFViewerModal
              open={pdfOpen}
              onClose={() => setPdfOpen(false)}
              pdfUrl={hurricanePdf}
              title="Hurricane Presentation"
            />
          </>
        )}
      </Paper>
    </Box>
  );
}
