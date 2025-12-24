import { Box, Typography, Paper } from '@mui/material';

export default function OracleUniversity() {
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
          Oracle University
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b' }}>
          Training and certifications from Oracle University.
        </Typography>
      </Paper>
    </Box>
  );
}
