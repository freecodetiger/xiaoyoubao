'use client';

import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  message?: string;
  fullscreen?: boolean;
}

const MotionBox = motion(Box);

export default function LoadingSpinner({ message = '加载中...', fullscreen = false }: LoadingSpinnerProps) {
  const theme = useTheme();

  const container = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: fullscreen ? '100vh' : '200px',
    gap: 2,
  };

  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        ease: "linear",
        repeat: Infinity
      }
    }
  };

  const textVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity
      }
    }
  };

  return (
    <Box sx={container}>
      <MotionBox
        animate="animate"
        variants={spinnerVariants}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress
          size={48}
          thickness={4}
          sx={{
            color: theme.palette.primary.main,
          }}
        />
      </MotionBox>
      <MotionBox
        animate="animate"
        variants={textVariants}
      >
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{
            fontWeight: 500,
            letterSpacing: 1,
          }}
        >
          {message}
        </Typography>
      </MotionBox>
    </Box>
  );
} 