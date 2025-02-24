'use client';

import { Box, Container, Toolbar, useTheme, useMediaQuery } from '@mui/material';
import Navbar from './Navbar';
import { motion } from 'framer-motion';

const MotionContainer = motion(Container);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
        transition: theme.transitions.create(['background-color'], {
          duration: theme.transitions.duration.standard,
        }),
      }}
    >
      <Navbar />
      <Toolbar /> {/* 这个Toolbar是为了防止内容被固定导航栏遮挡 */}
      <MotionContainer
        component="main"
        maxWidth="xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: 'easeOut',
        }}
        sx={{
          flexGrow: 1,
          py: { xs: 2, sm: 3, md: 4 },
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box
          sx={{
            borderRadius: theme.shape.borderRadius * 2,
            overflow: 'hidden',
            boxShadow: isMobile ? 'none' : theme.shadows[1],
            bgcolor: 'background.paper',
            p: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {children}
        </Box>
      </MotionContainer>
    </Box>
  );
} 