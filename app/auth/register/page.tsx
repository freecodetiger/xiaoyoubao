'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TextField, Button, Card, CardContent, Typography, Box, Alert, MenuItem } from '@mui/material';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    graduationYear: '',
    major: '',
    userType: 'alumni', // 'alumni' or 'enterprise'
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

    // 基本验证
    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    try {
      // TODO: 实现实际的注册API调用
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('注册失败，请检查您的输入');
      }

      const data = await response.json();
      // TODO: 处理注册成功，存储token等
      router.push('/auth/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : '注册过程中发生错误');
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
      <Card sx={{ maxWidth: 500, width: '100%', mx: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            注册校友宝
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              select
              fullWidth
              label="用户类型"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              margin="normal"
              required
            >
              <MenuItem value="alumni">校友</MenuItem>
              <MenuItem value="enterprise">企业</MenuItem>
            </TextField>

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
              label="姓名"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
            />

            {formData.userType === 'alumni' && (
              <>
                <TextField
                  fullWidth
                  label="毕业年份"
                  name="graduationYear"
                  type="number"
                  value={formData.graduationYear}
                  onChange={handleChange}
                  margin="normal"
                  required
                />

                <TextField
                  fullWidth
                  label="专业"
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
              </>
            )}
            
            <TextField
              fullWidth
              label="密码"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              autoComplete="new-password"
            />

            <TextField
              fullWidth
              label="确认密码"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              margin="normal"
              required
              autoComplete="new-password"
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={{ mt: 3 }}
            >
              注册
            </Button>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Link href="/auth/login" style={{ textDecoration: 'none' }}>
                <Typography color="primary">
                  已有账号？立即登录
                </Typography>
              </Link>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
} 