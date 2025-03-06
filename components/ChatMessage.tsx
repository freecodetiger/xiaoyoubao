'use client';

import React from 'react';
import { Box, Typography, Avatar, Paper, useTheme, Tooltip } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { ModelType } from '@/utils/ChatService';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  modelType?: ModelType;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const theme = useTheme();
  const isUser = message.sender === 'user';
  
  // 根据模型类型设置不同的头像和颜色
  const getAvatarContent = () => {
    if (isUser) return '用户';
    return message.modelType === ModelType.KIMI ? 'K' : 'B';
  };
  
  const getAvatarColor = () => {
    if (isUser) return 'secondary.main';
    return message.modelType === ModelType.KIMI ? 'primary.main' : 'secondary.dark';
  };
  
  const getAvatarTooltip = () => {
    if (isUser) return '您';
    return message.modelType === ModelType.KIMI ? 'Kimi' : '文心一言';
  };
  
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb: 2,
      }}
    >
      {!isUser && (
        <Tooltip title={getAvatarTooltip()}>
          <Avatar
            sx={{
              bgcolor: getAvatarColor(),
              width: 32,
              height: 32,
              mr: 1,
              mt: 0.5,
              fontSize: '0.875rem',
              fontWeight: 'bold'
            }}
          >
            {getAvatarContent()}
          </Avatar>
        </Tooltip>
      )}
      
      <Box sx={{ maxWidth: '90%' }}>
        <Paper
          elevation={1}
          sx={{
            p: 2,
            bgcolor: isUser 
              ? 'primary.dark' 
              : theme.palette.mode === 'dark' 
                ? 'grey.800' 
                : 'grey.200',
            color: isUser 
              ? 'white' 
              : theme.palette.mode === 'dark' 
                ? 'grey.300' 
                : 'grey.800',
            borderRadius: 2,
            wordBreak: 'break-word'
          }}
        >
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {message.content}
          </Typography>
        </Paper>
        
        <Typography 
          variant="caption" 
          color="text.secondary"
          sx={{ 
            display: 'block', 
            mt: 0.5,
            textAlign: isUser ? 'right' : 'left'
          }}
        >
          {formatDistanceToNow(message.timestamp, { addSuffix: true, locale: zhCN })}
        </Typography>
      </Box>
      
      {isUser && (
        <Tooltip title={getAvatarTooltip()}>
          <Avatar
            sx={{
              bgcolor: getAvatarColor(),
              width: 32,
              height: 32,
              ml: 1,
              mt: 0.5
            }}
          >
            {getAvatarContent()}
          </Avatar>
        </Tooltip>
      )}
    </Box>
  );
};

export default ChatMessage; 