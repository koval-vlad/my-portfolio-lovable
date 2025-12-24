import { Box, Typography, Paper } from '@mui/material';

export default function Certificates() {
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
          Certificates
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b' }}>
          Professional certifications and academic certificates.
        </Typography>
      </Paper>
    </Box>
  );
}
