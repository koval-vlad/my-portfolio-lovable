import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// VB images
import vbPgcalcGiftWrap from '../assets/vb-pgcalc-gift-wrap.gif';
import vbPgcalcDbManager from '../assets/vb-pgcalc-db-manager.gif';

const projectData = [
  { id: 1, title: 'GiftWrap', image: vbPgcalcGiftWrap },
  { id: 2, title: 'Database Manager', image: vbPgcalcDbManager },
];

export default function VBProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const projectId = parseInt(id || '1', 10);
  const project = projectData.find(p => p.id === projectId) || projectData[0];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>
      
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom fontWeight={600}>
          {project.title}
        </Typography>
        
        <Box
          component="img"
          src={project.image}
          alt={project.title}
          sx={{
            width: '100%',
            maxWidth: 800,
            height: 'auto',
            borderRadius: 2,
            mt: 2,
          }}
        />
        
        <Typography variant="body1" sx={{ mt: 3 }}>
          VB Project {projectId} details will be displayed here.
        </Typography>
      </Paper>
    </Container>
  );
}
