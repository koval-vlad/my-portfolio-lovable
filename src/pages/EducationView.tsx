import { Box, Typography, Container, Paper } from '@mui/material';

export default function EducationView() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Paper
          elevation={2}
          sx={{
            p: 4,
            borderRadius: '10px',
            backgroundColor: '#fff',
          }}
        >
          <Typography variant="h3" component="h1">
            Education
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}
