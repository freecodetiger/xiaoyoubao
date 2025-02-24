'use client';

import { useState } from 'react';
import { Box, Typography, Link as MuiLink, Alert } from '@mui/material';
import Link from 'next/link';
import AuthLayout from '@/components/AuthLayout';
import FormInput from '@/components/FormInput';
import SubmitButton from '@/components/SubmitButton';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateForm = () => {
    if (!email) {
      setError('请输入邮箱');
      return false;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setError('请输入有效的邮箱地址');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('发送重置密码邮件失败');
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : '发送重置密码邮件时发生错误');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: 700,
            textAlign: 'center',
            background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          重置密码
        </Typography>

        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          请输入您的注册邮箱，我们将向您发送重置密码的链接
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            重置密码链接已发送到您的邮箱，请查收
          </Alert>
        )}

        <FormInput
          label="邮箱"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
          placeholder="请输入邮箱"
          tooltip="请输入您注册时使用的邮箱地址"
          disabled={success}
        />

        <SubmitButton
          type="submit"
          loading={loading}
          success={success}
          successText="邮件已发送"
          disabled={success}
          sx={{ mt: 2 }}
        >
          发送重置链接
        </SubmitButton>

        <Box
          sx={{
            mt: 2,
            textAlign: 'center',
          }}
        >
          <MuiLink
            component={Link}
            href="/auth/login"
            variant="body2"
            sx={{
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            返回登录
          </MuiLink>
        </Box>
      </Box>
    </AuthLayout>
  );
} 