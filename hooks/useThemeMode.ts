'use client';

import { useState, useEffect } from 'react';

export function useThemeMode() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // 从本地存储中获取主题模式
    const savedMode = localStorage.getItem('themeMode') as 'light' | 'dark';
    if (savedMode) {
      setMode(savedMode);
    } else {
      // 如果没有保存的主题模式，则使用系统主题
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(prefersDark ? 'dark' : 'light');
    }
  }, []);

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  return { mode, toggleMode };
} 