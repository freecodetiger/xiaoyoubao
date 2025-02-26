'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  IconButton, 
  Paper, 
  Avatar, 
  Button,
  Drawer,
  Tooltip,
  CircularProgress,
  Divider,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
  FormControlLabel,
  Switch
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import MicIcon from '@mui/icons-material/Mic';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import FormatClearIcon from '@mui/icons-material/FormatClear';
import Navbar from '@/components/Navbar';
import ChatMessage, { Message } from '@/components/ChatMessage';
import ChatSidebar, { Session } from '@/components/ChatSidebar';
import { ChatService, ModelType } from '@/utils/ChatService';

// 模拟的历史会话数据
const mockHistorySessions: Session[] = [
  {
    id: '1',
    title: '关于企业战略规划的讨论',
    preview: ['如何制定五年发展战略?', '首先需要分析行业趋势和公司优势...'],
    timestamp: new Date(2024, 1, 28, 14, 30),
    modelType: ModelType.KIMI
  },
  {
    id: '2',
    title: '市场营销策略分析',
    preview: ['我们的产品如何更好地进行市场定位?', '根据目标客户群体特征...'],
    timestamp: new Date(2024, 1, 27, 10, 15),
    modelType: ModelType.BAIDU
  },
  {
    id: '3',
    title: '人力资源优化方案',
    preview: ['如何提高员工留存率?', '建立完善的职业发展通道和激励机制...'],
    timestamp: new Date(2024, 1, 25, 16, 45),
    modelType: ModelType.KIMI
  }
];

// 模型欢迎语
const getWelcomeMessage = (modelType: ModelType): string => {
  if (modelType === ModelType.KIMI) {
    return '你好，我是Kimi企业大模型助手，有什么可以帮助你的吗？';
  } else {
    return '你好，我是文心一言企业大模型助手，有什么可以帮助你的吗？';
  }
};

export default function EnterpriseAI() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [currentSession, setCurrentSession] = useState<Session>({ 
    id: 'new', 
    title: '新对话', 
    preview: [], 
    timestamp: new Date(),
    modelType: ModelType.KIMI
  });
  const [historySessions, setHistorySessions] = useState<Session[]>(mockHistorySessions);
  const [currentModelType, setCurrentModelType] = useState<ModelType>(ModelType.KIMI);
  const [error, setError] = useState<string | null>(null);
  const [markdownMode, setMarkdownMode] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 初始化欢迎消息
  useEffect(() => {
    setMessages([
      { 
        id: '1', 
        content: getWelcomeMessage(currentModelType), 
        sender: 'ai', 
        timestamp: new Date(),
        modelType: currentModelType
      }
    ]);
  }, []);

  // 滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 发送消息
  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;
    
    // 添加用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // 显示AI正在输入状态
    setIsTyping(true);
    
    try {
      // 准备发送给API的消息
      const apiMessages = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.content
      }));
      
      // 添加用户最新消息
      apiMessages.push({
        role: 'user',
        content: userMessage.content
      });
      
      // 调用API
      const response = await ChatService.sendMessage(
        currentModelType,
        apiMessages,
        userMessage.content
      );
      
      if (response.error) {
        setError(`API调用失败: ${response.error}`);
      }
      
      // 添加AI回复
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        sender: 'ai',
        timestamp: new Date(),
        modelType: currentModelType
      };
      
      setMessages(prev => [...prev, aiResponse]);
      
      // 如果是新会话，更新标题
      if (currentSession.id === 'new') {
        setCurrentSession(prev => ({
          ...prev,
          title: userMessage.content.substring(0, 30) + (userMessage.content.length > 30 ? '...' : '')
        }));
      }
    } catch (err) {
      setError('发送消息时出错');
      console.error('发送消息错误:', err);
    } finally {
      setIsTyping(false);
    }
  };

  // 创建新会话
  const handleNewChat = (modelType: ModelType) => {
    // 如果当前会话有内容，保存到历史
    if (messages.length > 1) {
      const newSession: Session = {
        id: Date.now().toString(),
        title: messages.length > 1 ? messages[1].content.substring(0, 30) + (messages[1].content.length > 30 ? '...' : '') : '新对话',
        preview: messages.slice(0, Math.min(messages.length, 4)).map(msg => 
          msg.content.substring(0, 50) + (msg.content.length > 50 ? '...' : '')
        ),
        timestamp: new Date(),
        modelType: currentModelType
      };
      
      setHistorySessions(prev => [newSession, ...prev]);
    }
    
    // 重置当前会话
    setCurrentModelType(modelType);
    setMessages([
      { 
        id: Date.now().toString(), 
        content: getWelcomeMessage(modelType), 
        sender: 'ai', 
        timestamp: new Date(),
        modelType: modelType
      }
    ]);
    setCurrentSession({ 
      id: 'new', 
      title: '新对话', 
      preview: [], 
      timestamp: new Date(),
      modelType: modelType
    });
  };

  // 切换到历史会话
  const handleSessionSelect = (session: Session) => {
    setCurrentSession(session);
    setCurrentModelType(session.modelType);
    
    // 这里应该从后端加载对应会话的消息
    // 模拟加载历史消息
    setMessages([
      { 
        id: '1', 
        content: getWelcomeMessage(session.modelType), 
        sender: 'ai', 
        timestamp: new Date(),
        modelType: session.modelType
      },
      { 
        id: '2', 
        content: session.preview[0], 
        sender: 'user', 
        timestamp: new Date() 
      },
      { 
        id: '3', 
        content: session.preview[1], 
        sender: 'ai', 
        timestamp: new Date(),
        modelType: session.modelType
      }
    ]);
    
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  // 删除会话
  const handleSessionDelete = (sessionId: string) => {
    setHistorySessions(prev => prev.filter(session => session.id !== sessionId));
    
    // 如果删除的是当前会话，创建新会话
    if (sessionId === currentSession.id) {
      handleNewChat(currentModelType);
    }
  };

  // 切换模型
  const handleModelChange = (modelType: ModelType) => {
    setCurrentModelType(modelType);
    handleNewChat(modelType);
  };

  return (
    <main>
      <Navbar />
      <Box sx={{ 
        display: 'flex', 
        height: 'calc(100vh - 64px)',
        bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
      }}>
        {/* 侧边栏 */}
        <Drawer
          variant={isMobile ? "temporary" : "persistent"}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          sx={{
            width: 280,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 280,
              boxSizing: 'border-box',
              top: '64px',
              height: 'calc(100% - 64px)',
              zIndex: theme.zIndex.drawer,
            },
          }}
        >
          <ChatSidebar 
            historySessions={historySessions}
            onNewChat={handleNewChat}
            onSessionSelect={handleSessionSelect}
            onSessionDelete={handleSessionDelete}
            currentSessionId={currentSession.id}
            currentModelType={currentModelType}
            onModelChange={handleModelChange}
          />
        </Drawer>

        {/* 主聊天区域 */}
        <Box sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          position: 'absolute',
          left: sidebarOpen && !isMobile ? 280 : 0,
          right: 0,
          height: 'calc(100vh - 64px)',
          transition: theme.transitions.create(['left', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}>
          {/* 顶部标题栏 */}
          <Box sx={{ 
            p: 1.5, 
            display: 'flex', 
            alignItems: 'center',
            borderBottom: 1,
            borderColor: 'divider',
            bgcolor: theme.palette.background.paper
          }}>
            <IconButton 
              edge="start" 
              color="inherit" 
              aria-label="menu"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {currentSession.title}
            </Typography>
            <Tooltip title={currentModelType === ModelType.KIMI ? 'Kimi' : '文心一言'}>
              <Avatar 
                sx={{ 
                  bgcolor: currentModelType === ModelType.KIMI ? 'primary.main' : 'secondary.dark',
                  width: 28,
                  height: 28,
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}
              >
                {currentModelType === ModelType.KIMI ? 'K' : 'B'}
              </Avatar>
            </Tooltip>
          </Box>

          {/* 消息区域 */}
          <Box sx={{ 
            flexGrow: 1, 
            p: { xs: 1, sm: 2 }, 
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <Box sx={{ flexGrow: 1 }}>
              {messages.map((message) => (
                <ChatMessage 
                  key={message.id}
                  message={message}
                />
              ))}
              
              {isTyping && (
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: currentModelType === ModelType.KIMI ? 'primary.main' : 'secondary.dark',
                      width: 32,
                      height: 32,
                      mr: 1,
                      fontSize: '0.875rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {currentModelType === ModelType.KIMI ? 'K' : 'B'}
                  </Avatar>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CircularProgress size={20} />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      正在思考...
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
            
            <div ref={messagesEndRef} />
          </Box>

          {/* 输入区域 */}
          <Paper 
            elevation={3}
            sx={{ 
              p: 2,
              borderTop: 1,
              borderColor: 'divider',
              bgcolor: theme.palette.background.paper
            }}
          >
            <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <FormControlLabel
                control={
                  <Switch 
                    checked={markdownMode}
                    onChange={(e) => setMarkdownMode(e.target.checked)}
                    size="small"
                  />
                }
                label={<Typography variant="caption">Markdown模式</Typography>}
              />
              <Typography variant="caption" color="text.secondary">
                当前模型: {currentModelType === ModelType.KIMI ? 'Kimi' : '文心一言'}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <TextField
                fullWidth
                multiline
                maxRows={6}
                minRows={2}
                placeholder={`输入您的问题... ${markdownMode ? '(支持Markdown语法)' : ''}`}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                variant="outlined"
                sx={{ mr: 1 }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', mb: 1 }}>
                  <Tooltip title="清除文本">
                    <IconButton 
                      color="default" 
                      onClick={() => setInputValue('')}
                      disabled={inputValue === ''}
                      size="small"
                    >
                      <FormatClearIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="语音输入">
                    <IconButton color="primary" size="small">
                      <MicIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Tooltip title="上传文件 (支持PDF/TXT/图片)">
                    <IconButton color="primary" size="small">
                      <AttachFileIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="发送">
                    <IconButton 
                      color="success" 
                      onClick={handleSendMessage}
                      disabled={inputValue.trim() === '' || isTyping}
                      size="small"
                    >
                      <SendIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* 错误提示 */}
      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </main>
  );
} 