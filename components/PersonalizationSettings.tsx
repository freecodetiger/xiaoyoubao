'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Button,
  Divider,
  useTheme,
  alpha,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Storage } from '@/utils/storage';

interface Settings {
  fontSize: number;
  animationsEnabled: boolean;
  notificationsEnabled: boolean;
  language: string;
  cardStyle: 'modern' | 'classic' | 'minimal';
  accentColor: string;
  autoSave: boolean;
  emailNotifications: {
    news: boolean;
    updates: boolean;
    messages: boolean;
  };
}

const defaultSettings: Settings = {
  fontSize: 16,
  animationsEnabled: true,
  notificationsEnabled: true,
  language: 'zh',
  cardStyle: 'modern',
  accentColor: '#1976d2',
  autoSave: true,
  emailNotifications: {
    news: true,
    updates: true,
    messages: true,
  },
};

const MotionCard = motion(Card);

export default function PersonalizationSettings() {
  const theme = useTheme();
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    // 从本地存储加载设置
    const savedSettings = Storage.getItem<Settings>('userSettings');
    if (savedSettings) {
      setSettings(savedSettings);
    }
  }, []);

  const handleChange = (field: keyof Settings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value,
    }));
    setIsDirty(true);
  };

  const handleEmailNotificationChange = (field: keyof Settings['emailNotifications']) => {
    setSettings(prev => ({
      ...prev,
      emailNotifications: {
        ...prev.emailNotifications,
        [field]: !prev.emailNotifications[field],
      },
    }));
    setIsDirty(true);
  };

  const handleSave = () => {
    Storage.setItem('userSettings', settings);
    setIsDirty(false);
    // 这里可以添加保存成功的提示
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    setIsDirty(true);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', py: 4 }}>
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CardContent>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              个性化设置
            </Typography>
            <Typography variant="body2" color="text.secondary">
              自定义您的使用体验
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {/* 外观设置 */}
            <Box>
              <Typography variant="h6" gutterBottom>
                外观
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                  <Typography gutterBottom>字体大小</Typography>
                  <Slider
                    value={settings.fontSize}
                    min={12}
                    max={24}
                    step={1}
                    onChange={(_, value) => handleChange('fontSize', value)}
                    valueLabelDisplay="auto"
                    sx={{ maxWidth: 300 }}
                  />
                </Box>

                <FormControl>
                  <InputLabel>卡片样式</InputLabel>
                  <Select
                    value={settings.cardStyle}
                    label="卡片样式"
                    onChange={e => handleChange('cardStyle', e.target.value)}
                    sx={{ maxWidth: 300 }}
                  >
                    <MenuItem value="modern">现代</MenuItem>
                    <MenuItem value="classic">经典</MenuItem>
                    <MenuItem value="minimal">简约</MenuItem>
                  </Select>
                </FormControl>

                <Box>
                  <Typography gutterBottom>主题色</Typography>
                  <TextField
                    type="color"
                    value={settings.accentColor}
                    onChange={e => handleChange('accentColor', e.target.value)}
                    sx={{ maxWidth: 300 }}
                  />
                </Box>
              </Box>
            </Box>

            <Divider />

            {/* 功能设置 */}
            <Box>
              <Typography variant="h6" gutterBottom>
                功能
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography>启用动画</Typography>
                  <Switch
                    checked={settings.animationsEnabled}
                    onChange={e => handleChange('animationsEnabled', e.target.checked)}
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography>启用通知</Typography>
                  <Switch
                    checked={settings.notificationsEnabled}
                    onChange={e => handleChange('notificationsEnabled', e.target.checked)}
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography>自动保存</Typography>
                  <Switch
                    checked={settings.autoSave}
                    onChange={e => handleChange('autoSave', e.target.checked)}
                  />
                </Box>
              </Box>
            </Box>

            <Divider />

            {/* 邮件通知设置 */}
            <Box>
              <Typography variant="h6" gutterBottom>
                邮件通知
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography>新闻资讯</Typography>
                  <Switch
                    checked={settings.emailNotifications.news}
                    onChange={() => handleEmailNotificationChange('news')}
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography>系统更新</Typography>
                  <Switch
                    checked={settings.emailNotifications.updates}
                    onChange={() => handleEmailNotificationChange('updates')}
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography>消息提醒</Typography>
                  <Switch
                    checked={settings.emailNotifications.messages}
                    onChange={() => handleEmailNotificationChange('messages')}
                  />
                </Box>
              </Box>
            </Box>

            {/* 操作按钮 */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant="outlined"
                onClick={handleReset}
                sx={{ minWidth: 100 }}
              >
                重置
              </Button>
              <Button
                variant="contained"
                onClick={handleSave}
                disabled={!isDirty}
                sx={{ minWidth: 100 }}
              >
                保存
              </Button>
            </Box>
          </Box>
        </CardContent>
      </MotionCard>
    </Box>
  );
} 