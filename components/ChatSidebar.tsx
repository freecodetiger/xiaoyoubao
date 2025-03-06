'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  Typography, 
  Divider,
  Tooltip,
  ListItemButton,
  Popover,
  Paper,
  useTheme,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Snackbar,
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { ModelType } from '@/utils/ChatService';

export interface Session {
  id: string;
  title: string;
  preview: string[];
  timestamp: Date;
  modelType: ModelType;
}

interface ChatSidebarProps {
  historySessions: Session[];
  onNewChat: (modelType: ModelType) => void;
  onSessionSelect: (session: Session) => void;
  onSessionDelete: (sessionId: string) => void;
  currentSessionId: string;
  currentModelType: ModelType;
  onModelChange: (modelType: ModelType) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ 
  historySessions, 
  onNewChat, 
  onSessionSelect,
  onSessionDelete,
  currentSessionId,
  currentModelType,
  onModelChange
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [previewSession, setPreviewSession] = useState<Session | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, session: Session) => {
    setAnchorEl(event.currentTarget);
    setPreviewSession(session);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setPreviewSession(null);
  };

  const handleModelChange = (event: SelectChangeEvent) => {
    const newModelType = event.target.value as ModelType;
    onModelChange(newModelType);
    
    // 显示模型切换提示
    setSnackbarMessage(`已切换到${newModelType === ModelType.KIMI ? 'Kimi' : '文心一言'}模型，并创建新会话`);
    setShowSnackbar(true);
  };

  const handleDeleteSession = (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    onSessionDelete(sessionId);
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 模型选择 */}
      <Box sx={{ p: 2 }}>
        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
          <InputLabel id="model-select-label">选择模型</InputLabel>
          <Select
            labelId="model-select-label"
            id="model-select"
            value={currentModelType}
            label="选择模型"
            onChange={handleModelChange}
          >
            <MenuItem value={ModelType.KIMI}>法律大模型</MenuItem>
            <MenuItem value={ModelType.BAIDU}>企业招聘大模型</MenuItem>
          </Select>
        </FormControl>
        
        {/* 新建会话按钮 */}
        <Button
          fullWidth
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => onNewChat(currentModelType)}
          sx={{
            py: 1.5,
            background: 'linear-gradient(45deg, #2E7D32 30%, #4CAF50 90%)',
            color: 'white',
            fontWeight: 'bold',
            '&:hover': {
              background: 'linear-gradient(45deg, #1B5E20 30%, #388E3C 90%)',
            }
          }}
        >
          新建会话
        </Button>
      </Box>
      
      <Divider />
      
      {/* 会话列表 */}
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <List>
          {historySessions.map((session) => (
            <ListItem 
              key={session.id} 
              disablePadding
              onMouseEnter={(e) => handlePopoverOpen(e, session)}
              onMouseLeave={handlePopoverClose}
              secondaryAction={
                <Tooltip title="删除会话">
                  <IconButton 
                    edge="end" 
                    aria-label="delete"
                    onClick={(e) => handleDeleteSession(e, session.id)}
                    size="small"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              }
            >
              <ListItemButton
                selected={session.id === currentSessionId}
                onClick={() => onSessionSelect(session)}
                sx={{
                  borderRadius: 1,
                  mx: 1,
                  my: 0.5,
                  pr: 7, // 为删除按钮留出空间
                  '&.Mui-selected': {
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                  }
                }}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography 
                        noWrap 
                        sx={{ 
                          flexGrow: 1,
                          fontWeight: session.id === currentSessionId ? 'medium' : 'normal'
                        }}
                      >
                        {session.title}
                      </Typography>
                      <Tooltip title={session.modelType === ModelType.KIMI ? 'Kimi' : '文心一言'}>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            ml: 1, 
                            color: session.modelType === ModelType.KIMI ? 'primary.main' : 'secondary.main',
                            fontWeight: 'bold'
                          }}
                        >
                          {session.modelType === ModelType.KIMI ? 'K' : 'B'}
                        </Typography>
                      </Tooltip>
                    </Box>
                  }
                  secondary={format(session.timestamp, 'MM月dd日 HH:mm', { locale: zhCN })}
                  primaryTypographyProps={{ noWrap: true }}
                  secondaryTypographyProps={{
                    noWrap: true,
                    fontSize: '0.75rem'
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      
      {/* 预览弹出框 */}
      <Popover
        sx={{ pointerEvents: 'none' }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {previewSession && (
          <Paper sx={{ p: 2, maxWidth: 300 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="subtitle1">
                {previewSession.title}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  ml: 1, 
                  color: previewSession.modelType === ModelType.KIMI ? 'primary.main' : 'secondary.main',
                  fontWeight: 'bold',
                  px: 0.5,
                  py: 0.2,
                  borderRadius: 0.5,
                  bgcolor: previewSession.modelType === ModelType.KIMI ? 'primary.50' : 'secondary.50'
                }}
              >
                {previewSession.modelType === ModelType.KIMI ? 'Kimi' : '文心一言'}
              </Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            {previewSession.preview.slice(0, 5).map((text, index) => (
              <Typography key={index} variant="body2" sx={{ 
                color: index % 2 === 0 ? 'text.primary' : 'text.secondary',
                my: 0.5,
                fontWeight: index % 2 === 0 ? 'medium' : 'normal'
              }}>
                {index % 2 === 0 ? '问: ' : '答: '}{text}
              </Typography>
            ))}
          </Paper>
        )}
      </Popover>

      {/* 提示消息 */}
      <Snackbar 
        open={showSnackbar} 
        autoHideDuration={3000} 
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowSnackbar(false)} severity="info" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ChatSidebar; 