'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/app/providers';
import { CircularProgress, Box } from '@mui/material';

const publicPaths = ['/auth/login', '/auth/register', '/auth/forgot-password'];

export default function RouteGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      // 如果用户未登录且当前路径不是公开路径
      if (!user && !publicPaths.includes(pathname)) {
        router.push('/auth/login');
      }
      // 如果用户已登录且当前路径是公开路径
      else if (user && publicPaths.includes(pathname)) {
        router.push('/dashboard');
      }
    }
  }, [user, loading, pathname, router]);

  // 显示加载状态
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // 如果是公开路径或用户已登录，显示内容
  if (publicPaths.includes(pathname) || user) {
    return <>{children}</>;
  }

  // 其他情况不显示任何内容
  return null;
} 