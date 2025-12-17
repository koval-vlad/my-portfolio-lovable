import { Box, Typography, Container } from '@mui/material';
import { useParams } from 'react-router-dom';

const projectData = [
  { id: 1, label: 'Modern HR Dashboard' },
  { id: 2, label: 'HR Analytics Dashboard' },
  { id: 3, label: 'Titanic Survivor Story' },
];

export default function TableauProject() {
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
