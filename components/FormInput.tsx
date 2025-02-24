'use client';

import { useState } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  TextFieldProps,
  Tooltip,
  Box,
  Typography,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Info as InfoIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

interface FormInputProps extends Omit<TextFieldProps, 'error'> {
  showPasswordToggle?: boolean;
  tooltip?: string;
  error?: string;
}

const MotionBox = motion(Box);

export default function FormInput({
  showPasswordToggle,
  tooltip,
  error,
  type = 'text',
  ...props
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
        {props.label && (
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ ml: 1, fontWeight: 500 }}
          >
            {props.label}
          </Typography>
        )}
        {tooltip && (
          <Tooltip title={tooltip} arrow placement="top">
            <IconButton size="small" sx={{ ml: 0.5 }}>
              <InfoIcon fontSize="small" color="action" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      
      <TextField
        {...props}
        type={showPasswordToggle ? (showPassword ? 'text' : 'password') : type}
        error={!!error}
        fullWidth
        variant="outlined"
        InputProps={{
          ...props.InputProps,
          ...(showPasswordToggle && {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                  size="large"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              '& fieldset': {
                borderColor: 'primary.main',
              },
            },
            '&.Mui-focused': {
              '& fieldset': {
                borderWidth: '2px',
              },
            },
          },
          ...props.sx,
        }}
      />
      
      <AnimatePresence mode="wait">
        {error && (
          <MotionBox
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            sx={{ mt: 0.5, ml: 1 }}
          >
            <Typography
              variant="caption"
              color="error"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              {error}
            </Typography>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
} 