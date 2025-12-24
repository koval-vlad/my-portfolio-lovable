import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import znuLogo from '@/assets/ZNU.svg';

interface EducationSubmenuProps {
  onClose: () => void;
}

export default function EducationSubmenu({ onClose }: EducationSubmenuProps) {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const secondaryEducationItems = [
    { label: 'Formal Degree', path: '/education/formal-degree' },
    { label: 'Certificates', path: '/education/certificates' },
  ];

  const professionalDevItems = [
    { label: 'Pluralsight', path: '/education/pluralsight' },
    { label: 'Oracle University', path: '/education/oracle-university' },
    { label: 'Other', path: '/education/other' },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 4,
        p: 3,
        minWidth: 600,
        backgroundColor: '#f8fafc',
        borderRadius: 2,
      }}
    >
      {/* Left side - ZNU logo and description */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          maxWidth: 200,
          pr: 3,
          borderRight: '1px solid #e2e8f0',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 2,
          }}
        >
          <img
            src={znuLogo}
            alt="ZNU Logo"
            style={{ width: 40, height: 40, objectFit: 'contain' }}
          />
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              color: '#64748b',
              backgroundColor: '#e2e8f0',
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              fontSize: '0.75rem',
            }}
          >
            Zaporizhzhia National University
          </Typography>
        </Box>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: '#1e293b',
            mb: 1,
            fontSize: '1.1rem',
            lineHeight: 1.3,
          }}
        >
          Education & Professional Development
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: '#64748b',
            fontSize: '0.85rem',
            lineHeight: 1.5,
          }}
        >
          Academic background and continuous learning through various professional development platforms.
        </Typography>
      </Box>

      {/* Right side - Two columns */}
      <Box sx={{ display: 'flex', gap: 6, flex: 1 }}>
        {/* Secondary Education Column */}
        <Box sx={{ minWidth: 150 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              color: '#000',
              mb: 2,
              fontSize: '0.9rem',
            }}
          >
            Secondary Education
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {secondaryEducationItems.map((item) => (
              <Typography
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  color: '#1976d2',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  py: 0.5,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Professional Development Column */}
        <Box sx={{ minWidth: 150 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              color: '#000',
              mb: 2,
              fontSize: '0.9rem',
            }}
          >
            Professional Development
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {professionalDevItems.map((item) => (
              <Typography
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  color: '#1976d2',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  py: 0.5,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
