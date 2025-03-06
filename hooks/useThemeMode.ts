'use client';

import { useState, useEffect } from 'react';

export function useThemeMode() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
<<<<<<< HEAD
    // 从localStorage读取主题设置
=======
    // 从本地存储中获取主题模式
>>>>>>> upstream
    const savedMode = localStorage.getItem('themeMode') as 'light' | 'dark';
    if (savedMode) {
      setMode(savedMode);
    } else {
<<<<<<< HEAD
      // 根据系统主题设置默认值
=======
      // 如果没有保存的主题模式，则使用系统主题
>>>>>>> upstream
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(prefersDark ? 'dark' : 'light');
    }
  }, []);

<<<<<<< HEAD
  const toggleTheme = () => {
=======
  const toggleMode = () => {
>>>>>>> upstream
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

<<<<<<< HEAD
  return { mode, toggleTheme };
=======
  return { mode, toggleMode };
>>>>>>> upstream
} 