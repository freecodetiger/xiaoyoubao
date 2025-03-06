'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Paper, useTheme, Tooltip, IconButton } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { ModelType } from '@/utils/ChatService';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  modelType?: ModelType;
  file?: File;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const theme = useTheme();
  const isUser = message.sender === 'user';
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string>('');
  
  // 处理文件预览
  useEffect(() => {
    if (message.file) {
      setFileType(message.file.type);
      
      if (message.file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target && e.target.result) {
            setFilePreview(e.target.result.toString());
          }
        };
        reader.readAsDataURL(message.file);
      } else if (message.file.type === 'text/plain' || message.file.name.endsWith('.txt')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target && e.target.result) {
            setFilePreview(e.target.result.toString());
          }
        };
        reader.readAsText(message.file);
      }
    }
  }, [message.file]);
  
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
  
  // 渲染文件预览
  const renderFilePreview = () => {
    if (!message.file || !filePreview) return null;
    
    if (fileType.startsWith('image/')) {
      return (
        <Box sx={{ mt: 2, maxWidth: '100%', maxHeight: 300, overflow: 'hidden', borderRadius: 1 }}>
          <img 
            src={filePreview} 
            alt="上传的图片" 
            style={{ 
              maxWidth: '100%', 
              maxHeight: 300, 
              objectFit: 'contain',
              borderRadius: '4px'
            }} 
          />
        </Box>
      );
    } else if (fileType === 'text/plain' || message.file.name.endsWith('.txt')) {
      return (
        <Box 
          sx={{ 
            mt: 2, 
            p: 1.5, 
            bgcolor: 'background.paper', 
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            maxHeight: 200,
            overflow: 'auto',
            fontSize: '0.875rem',
            fontFamily: 'monospace'
          }}
        >
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {filePreview}
          </pre>
        </Box>
      );
    } else {
      return (
        <Box 
          sx={{ 
            mt: 2, 
            p: 1.5, 
            bgcolor: 'background.paper', 
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <DescriptionIcon sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ flexGrow: 1 }}>
            {message.file.name}
          </Typography>
        </Box>
      );
    }
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
          
          {renderFilePreview()}
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