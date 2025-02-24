'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/providers';
import LoadingSpinner from './LoadingSpinner';

const publicPaths = ['/auth/login', '/auth/register', '/auth/forgot-password'];

export default function RouteGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    console.log('RouteGuard effect:', { user, loading, pathname });
    
    if (!loading) {
      // 如果用户未登录且当前路径不是公开路径
      if (!user && !publicPaths.includes(pathname) && pathname !== '/') {
        console.log('Redirecting to login page');
        window.location.href = '/auth/login';
      }
      // 如果用户已登录且当前路径是公开路径
      else if (user && publicPaths.includes(pathname)) {
        console.log('Redirecting to dashboard');
        window.location.href = '/dashboard';
      }
    }
  }, [user, loading, pathname]);

  // 显示加载状态
  if (loading) {
    return <LoadingSpinner fullscreen message="正在加载..." />;
  }

  // 如果是公开路径或用户已登录，显示内容
  if (publicPaths.includes(pathname) || user || pathname === '/') {
    return <>{children}</>;
  }

  // 其他情况显示加载状态
  return <LoadingSpinner fullscreen message="正在验证身份..." />;
} 