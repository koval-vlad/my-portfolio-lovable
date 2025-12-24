import { Box, Typography, Paper } from '@mui/material';

export default function FormalDegree() {
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
        <Typography variant="h3" component="h1" sx={{ mb: 3 }}>
          Formal Degree
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b' }}>
          Academic degrees and formal education credentials.
        </Typography>
      </Paper>
    </Box>
  );
}
