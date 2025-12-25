import { Box, Paper, Typography } from '@mui/material';
import usaFlag from '../assets/usa-flag.svg';

export default function Certificates() {
  const coursework = [
    {
      title: 'Object-Oriented Programming (OOP)',
      description: 'Fundamental principles including classes, inheritance, polymorphism, and encapsulation used in Visual Basic and C++.'
    },
    {
      title: 'Database Integration',
      description: 'Connecting applications to data sources using SQL and database management systems (DBMS)'
    },
    {
      title: 'Graphical User Interface (GUI) Design',
      description: 'Creating visual components for Windows-based applications in Visual Basic and C++.'
    },
    {
      title: 'Software Development Life Cycle (SDLC)',
      description: 'Standard phases of development including requirement analysis, design, coding, testing, and deployment.'
    },
    {
      title: 'Programming under various operating systems',
      description: 'C programming under Unix, DOS commands.'
    }
  ];

  const CertificateCard = () => (
    <Paper
      elevation={2}
      sx={{
        borderRadius: '10px',
        backgroundColor: '#fff',
        overflow: 'hidden',
        maxWidth: '400px',
        flex: '1 1 400px'
      }}
    >
      {/* Header with flag and text */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          p: 2,
          backgroundColor: '#e8f4fc'
        }}
      >
        <img
          src={usaFlag}
          alt="USA Flag"
          style={{ width: '60px', height: 'auto' }}
        />
        <Box>
          <Typography
            variant="body1"
            sx={{ fontWeight: 700, color: '#333', lineHeight: 1.3 }}
          >
            Certificate in Contemporary Application Development
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: 700, color: '#333', lineHeight: 1.3 }}
          >
            Computer Learning Center (USA)
          </Typography>
        </Box>
      </Box>

      {/* Image placeholder - replace with actual image when available */}
      <Box sx={{ width: '100%', backgroundColor: '#f0f0f0', p: 4, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: '#666' }}>
          [Image: 1998-Computer-Learning-Center-large.svg]
        </Typography>
      </Box>

      {/* Coursework Description */}
      <Box sx={{ p: 2 }}>
        {coursework.map((item, index) => (
          <Typography
            key={index}
            variant="body2"
            sx={{
              textAlign: 'left',
              mb: index < coursework.length - 1 ? 1.5 : 0,
              color: '#333',
              lineHeight: 1.5
            }}
          >
            <Box component="span" sx={{ fontWeight: 700 }}>
              {item.title}:
            </Box>{' '}
            {item.description}
          </Typography>
        ))}
      </Box>
    </Paper>
  );

  return (
    <Box sx={{ px: '8px', py: 2 }}>
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >
        <CertificateCard />
        <CertificateCard />
      </Box>
    </Box>
  );
}
