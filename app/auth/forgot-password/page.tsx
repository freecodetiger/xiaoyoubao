'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TextField, Button, Card, CardContent, Typography, Box, Alert } from '@mui/material';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    setMessage('');

    try {
      // TODO: 实现实际的密码重置API调用
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

      setStatus('success');
      setMessage('重置密码链接已发送到您的邮箱，请查收');
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : '发送重置密码邮件时发生错误');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        py: 4,
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%', mx: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            重置密码
          </Typography>
          
          <Typography variant="body1" align="center" sx={{ mb: 3 }}>
            请输入您的注册邮箱，我们将向您发送重置密码的链接
          </Typography>

          {status !== 'idle' && (
            <Alert severity={status === 'success' ? 'success' : 'error'} sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="邮箱"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              autoComplete="email"
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={{ mt: 3 }}
              disabled={status === 'success'}
            >
              发送重置链接
            </Button>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Link href="/auth/login" style={{ textDecoration: 'none' }}>
                <Typography color="primary">
                  返回登录
                </Typography>
              </Link>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
} 