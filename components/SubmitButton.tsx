'use client';

import { Button, ButtonProps, CircularProgress, Box } from '@mui/material';
import { motion } from 'framer-motion';

interface SubmitButtonProps extends ButtonProps {
  loading?: boolean;
  success?: boolean;
  successText?: string;
}

const MotionButton = motion(Button);

export default function SubmitButton({
  children,
  loading = false,
  success = false,
  successText = '操作成功',
  disabled,
  ...props
}: SubmitButtonProps) {
  return (
    <MotionButton
      variant="contained"
      fullWidth
      size="large"
      disabled={disabled || loading}
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      sx={{
        height: 48,
        position: 'relative',
        overflow: 'hidden',
        '&::after': success ? {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, #4caf50, #45a049)',
          transition: 'opacity 0.3s ease-in-out',
        } : {},
        ...props.sx,
      }}
      {...props}
    >
      <Box
        component={motion.div}
        animate={{
          opacity: loading ? 0 : 1,
          y: loading ? -20 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        {success ? successText : children}
      </Box>
      
      {loading && (
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          sx={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <CircularProgress
            size={24}
            thickness={4}
            sx={{ color: 'inherit' }}
          />
        </Box>
      )}
    </MotionButton>
  );
} 