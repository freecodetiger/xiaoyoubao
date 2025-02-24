'use client';

import { Box, Container, Paper, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';

const MotionPaper = motion(Paper);

interface AuthLayoutProps {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md';
}

export default function AuthLayout({ children, maxWidth = 'sm' }: AuthLayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        backgroundImage: theme.palette.mode === 'light'
          ? 'linear-gradient(45deg, rgba(25, 118, 210, 0.05) 0%, rgba(220, 0, 78, 0.05) 100%)'
          : 'linear-gradient(45deg, rgba(25, 118, 210, 0.15) 0%, rgba(220, 0, 78, 0.15) 100%)',
        py: { xs: 4, sm: 6, md: 8 },
      }}
    >
      <Container maxWidth={maxWidth}>
        <MotionPaper
          elevation={isMobile ? 0 : 8}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: 'easeOut',
          }}
          sx={{
            p: { xs: 3, sm: 4, md: 5 },
            borderRadius: { xs: 0, sm: 2 },
            bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: theme.palette.mode === 'light'
                ? 'linear-gradient(90deg, #1976d2, #dc004e)'
                : 'linear-gradient(90deg, #90caf9, #f48fb1)',
            },
          }}
        >
          {children}
        </MotionPaper>
      </Container>
    </Box>
  );
} 