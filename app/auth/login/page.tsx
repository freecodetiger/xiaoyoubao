'use client';

import { useState } from 'react';
import { Box, Typography, Link as MuiLink, Alert } from '@mui/material';
import Link from 'next/link';
import { useAuth } from '@/app/providers';
import AuthLayout from '@/components/AuthLayout';
import FormInput from '@/components/FormInput';
import SubmitButton from '@/components/SubmitButton';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { login } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: Partial<LoginFormData> = {};
    if (!formData.email) {
      newErrors.email = '请输入邮箱';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }
    if (!formData.password) {
      newErrors.password = '请输入密码';
    } else if (formData.password.length < 6) {
      newErrors.password = '密码长度至少为6位';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      await login(formData.email, formData.password);
      setSuccess(true);
      // 登录成功后的重定向由 AuthContext 处理
    } catch (err) {
      setError(err instanceof Error ? err.message : '登录失败，请稍后重试');
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
          欢迎回来
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <FormInput
          label="邮箱"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
          placeholder="请输入邮箱"
          tooltip="请使用您注册时的邮箱地址"
        />

        <FormInput
          label="密码"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          error={errors.password}
          placeholder="请输入密码"
          showPasswordToggle
          tooltip="密码长度至少为6位"
        />

        <SubmitButton
          type="submit"
          loading={loading}
          success={success}
          successText="登录成功"
          sx={{ mt: 2 }}
        >
          登录
        </SubmitButton>

        <Box
          sx={{
            mt: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <MuiLink
            component={Link}
            href="/auth/forgot-password"
            variant="body2"
            sx={{
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            忘记密码？
          </MuiLink>
          <MuiLink
            component={Link}
            href="/auth/register"
            variant="body2"
            sx={{
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            还没有账号？立即注册
          </MuiLink>
        </Box>
      </Box>
    </AuthLayout>
  );
} 