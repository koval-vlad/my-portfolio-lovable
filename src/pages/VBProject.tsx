import { Box, Typography, Container } from '@mui/material';
import { useParams } from 'react-router-dom';

const projectData = [
  { id: 1, label: 'GiftWrap' },
  { id: 2, label: 'Database Manager' },
];

export default function VBProject() {
  const { id } = useParams<{ id: string }>();
  const projectId = parseInt(id || '1', 10);
  const project = projectData.find(p => p.id === projectId) || projectData[0];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography variant="h3" component="h1">
          {project.label}
        </Typography>
      </Box>
    </Container>
  );
}
