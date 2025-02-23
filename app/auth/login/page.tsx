'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TextField, Button, Card, CardContent, Typography, Box, Alert } from '@mui/material';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // TODO: 实现实际的登录API调用
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('登录失败，请检查您的邮箱和密码');
      }

      const data = await response.json();
      // TODO: 处理登录成功，存储token等
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : '登录过程中发生错误');
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
            登录校友宝
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="邮箱"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              autoComplete="email"
            />
            
            <TextField
              fullWidth
              label="密码"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              autoComplete="current-password"
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={{ mt: 3 }}
            >
              登录
            </Button>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Link href="/auth/forgot-password" style={{ textDecoration: 'none' }}>
                <Typography color="primary" sx={{ mb: 1, display: 'inline-block' }}>
                  忘记密码？
                </Typography>
              </Link>
              <br />
              <Link href="/auth/register" style={{ textDecoration: 'none' }}>
                <Typography color="primary" sx={{ display: 'inline-block' }}>
                  还没有账号？立即注册
                </Typography>
              </Link>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
} 