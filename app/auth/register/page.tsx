'use client';

import { useState } from 'react';
import { Box, Typography, Link as MuiLink, Alert } from '@mui/material';
import Link from 'next/link';
import { useAuth } from '@/app/providers';
import AuthLayout from '@/components/AuthLayout';
import FormInput from '@/components/FormInput';
import SubmitButton from '@/components/SubmitButton';

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  graduationYear: string;
  major: string;
  userType: 'alumni' | 'enterprise';
}

export default function RegisterPage() {
  const { register } = useAuth();
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    graduationYear: '',
    major: '',
    userType: 'alumni',
  });
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: Partial<RegisterFormData> = {};
    if (!formData.email) {
      newErrors.email = '请输入邮箱';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }
    if (!formData.name) {
      newErrors.name = '请输入姓名';
    }
    if (!formData.password) {
      newErrors.password = '请输入密码';
    } else if (formData.password.length < 6) {
      newErrors.password = '密码长度至少为6位';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '请确认密码';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '两次输入的密码不一致';
    }
    if (formData.userType === 'alumni') {
      if (!formData.graduationYear) {
        newErrors.graduationYear = '请输入毕业年份';
      }
      if (!formData.major) {
        newErrors.major = '请输入专业';
      }
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
      await register(formData);
      setSuccess(true);
      // 注册成功后的重定向由 AuthContext 处理
    } catch (err) {
      setError(err instanceof Error ? err.message : '注册失败，请稍后重试');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout maxWidth="md">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: 600,
          mx: 'auto',
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
          加入校友宝
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mb: 3 }}>
          <FormInput
            select
            label="用户类型"
            value={formData.userType}
            onChange={(e) => setFormData({ ...formData, userType: e.target.value as 'alumni' | 'enterprise' })}
            error={errors.userType}
            tooltip="请选择您的用户类型"
          >
            <option value="alumni">校友</option>
            <option value="enterprise">企业</option>
          </FormInput>

          <FormInput
            label="邮箱"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            placeholder="请输入邮箱"
            tooltip="此邮箱将用于登录和接收通知"
          />

          <FormInput
            label="姓名"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
            placeholder="请输入姓名"
          />

          {formData.userType === 'alumni' && (
            <>
              <FormInput
                label="毕业年份"
                type="number"
                value={formData.graduationYear}
                onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                error={errors.graduationYear}
                placeholder="请输入毕业年份"
                tooltip="例如：2020"
              />

              <FormInput
                label="专业"
                value={formData.major}
                onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                error={errors.major}
                placeholder="请输入专业"
                tooltip="例如：计算机科学"
              />
            </>
          )}

          <FormInput
            label="密码"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={errors.password}
            placeholder="请输入密码"
            showPasswordToggle
            tooltip="密码长度至少为6位"
          />

          <FormInput
            label="确认密码"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            error={errors.confirmPassword}
            placeholder="请再次输入密码"
            showPasswordToggle
          />
        </Box>

        <SubmitButton
          type="submit"
          loading={loading}
          success={success}
          successText="注册成功"
        >
          注册
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
            已有账号？立即登录
          </MuiLink>
        </Box>
      </Box>
    </AuthLayout>
  );
} 