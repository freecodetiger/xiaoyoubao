'use client';

import { Box, CircularProgress, Skeleton, Stack } from '@mui/material';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export function LoadingCard() {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ p: 2, mb: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
        <Stack spacing={2}>
          <Skeleton variant="text" width="60%" height={32} />
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="rectangular" height={80} />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Skeleton variant="rounded" width={80} height={24} />
            <Skeleton variant="rounded" width={80} height={24} />
            <Skeleton variant="rounded" width={80} height={24} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Skeleton variant="text" width="30%" />
            <Skeleton variant="rounded" width={100} height={36} />
          </Box>
        </Stack>
      </Box>
    </MotionBox>
  );
}

export function LoadingOverlay() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: 'rgba(255, 255, 255, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1300,
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export function LoadingSection() {
  return (
    <Stack spacing={2}>
      {[1, 2, 3].map((index) => (
        <LoadingCard key={index} />
      ))}
    </Stack>
  );
} 