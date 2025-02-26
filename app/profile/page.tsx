'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
  Paper,
  Divider,
  LinearProgress,
  Badge,
  Stack,
  Skeleton,
  Alert,
  Snackbar,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NotificationsIcon from '@mui/icons-material/Notifications';
import VerifiedIcon from '@mui/icons-material/Verified';
import Navbar from '@/components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingOverlay } from '@/components/LoadingState';
import EditProfileDialog from '@/components/EditProfileDialog';
import { useThemeMode } from '@/hooks/useThemeMode';
import { Storage } from '@/utils/storage';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// 模拟数据 - 用户信息
const userInfo = {
  name: '张三',
  avatar: 'https://placehold.co/200x200/1976d2/white?text=张',
  title: '高级前端工程师',
  company: '腾讯科技',
  email: 'zhangsan@example.com',
  phone: '138****5678',
  location: '深圳',
  education: '清华大学',
  major: '计算机科学与技术',
  skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
  experience: [
    {
      id: 1,
      company: '腾讯科技',
      title: '高级前端工程师',
      period: '2020-至今',
      description: '负责核心业务模块开发，带领团队完成多个重要项目。',
    },
    {
      id: 2,
      company: '阿里巴巴',
      title: '前端工程师',
      period: '2018-2020',
      description: '参与电商平台开发，负责用户体验优化。',
    },
  ],
};

// 模拟数据 - 求职进度
const jobApplications = [
  {
    id: 1,
    company: '字节跳动',
    position: '技术专家',
    status: '面试中',
    date: '2024-02-18',
    progress: 60,
  },
  {
    id: 2,
    company: '美团',
    position: '高级工程师',
    status: '简历筛选',
    date: '2024-02-17',
    progress: 20,
  },
];

// 模拟数据 - 消息通知
const notifications = [
  {
    id: 1,
    type: 'interview',
    title: '面试通知',
    content: '您的字节跳动面试定于2024年2月20日下午2点',
    date: '2024-02-18',
    isRead: false,
  },
  {
    id: 2,
    type: 'application',
    title: '简历状态更新',
    content: '您投递的美团职位已进入简历筛选阶段',
    date: '2024-02-17',
    isRead: true,
  },
];

const MotionCard = motion(Card);
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ProfilePage() {
  const { mode, toggleTheme } = useThemeMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as const });
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState(userInfo);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // 从本地存储加载数据
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const savedData = Storage.getItem<typeof userInfo>('profile');
        if (savedData) {
          setProfileData(savedData);
        }
        setLoading(false);
      } catch (err) {
        setError('加载数据失败，请稍后重试');
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleEdit = () => {
    setEditDialogOpen(true);
  };

  const handleSaveProfile = (data: any) => {
    setProfileData(data);
    Storage.setItem('profile', data);
    setSnackbar({
      open: true,
      message: '个人信息已更新',
      severity: 'success'
    });
  };

  if (loading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: theme.palette.background.default }}>
      <Navbar />
      
      {/* 主题切换按钮 */}
      <IconButton
        onClick={toggleTheme}
        sx={{
          position: 'fixed',
          right: 24,
          top: 24,
          bgcolor: theme.palette.background.paper,
          boxShadow: theme.shadows[2],
          zIndex: 1000,
          '&:hover': {
            bgcolor: theme.palette.action.hover,
          },
        }}
      >
        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>

      {/* 头部区域 - 添加动画效果 */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          backgroundImage: 'linear-gradient(45deg, #1976d2 30%, #1565c0 90%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 添加背景动画效果 */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            background: `linear-gradient(45deg, 
              ${theme.palette.primary.light} 25%, 
              transparent 25%, 
              transparent 50%, 
              ${theme.palette.primary.light} 50%, 
              ${theme.palette.primary.light} 75%, 
              transparent 75%, 
              transparent)`,
            backgroundSize: '60px 60px',
            animation: 'moveBackground 3s linear infinite',
            '@keyframes moveBackground': {
              '0%': { backgroundPosition: '0 0' },
              '100%': { backgroundPosition: '60px 60px' },
            },
          }}
        />
        
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <Tooltip title="编辑头像">
                      <IconButton
                        size="small"
                        onClick={handleEdit}
                        sx={{
                          bgcolor: 'white',
                          '&:hover': { bgcolor: 'grey.100' },
                          transition: 'all 0.2s',
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <Avatar
                    src={profileData.avatar}
                    sx={{
                      width: 120,
                      height: 120,
                      border: '4px solid white',
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  />
                </Badge>
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h4" gutterBottom>
                    {profileData.name}
                  </Typography>
                  <Tooltip title="已认证用户">
                    <VerifiedIcon color="primary" />
                  </Tooltip>
                </Box>
                <Typography variant="h6" gutterBottom sx={{ opacity: 0.9 }}>
                  {profileData.title} · {profileData.company}
                </Typography>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    gap: 3, 
                    flexWrap: 'wrap', 
                    mt: 2,
                    '& > div': {
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                      },
                    },
                  }}
                >
                  <Tooltip title="发送邮件">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
                      <EmailIcon sx={{ fontSize: 20 }} />
                      <Typography>{profileData.email}</Typography>
                    </Box>
                  </Tooltip>
                  <Tooltip title="拨打电话">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
                      <PhoneIcon sx={{ fontSize: 20 }} />
                      <Typography>{profileData.phone}</Typography>
                    </Box>
                  </Tooltip>
                  <Tooltip title="查看地图">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
                      <LocationOnIcon sx={{ fontSize: 20 }} />
                      <Typography>{profileData.location}</Typography>
                    </Box>
                  </Tooltip>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 主要内容区域 */}
      <Container maxWidth="lg" sx={{ mt: 4, pb: 8 }}>
        <Grid container spacing={4}>
          {/* 左侧信息栏 */}
          <Grid item xs={12} md={4}>
            <AnimatePresence>
              <Stack spacing={3}>
                {/* 基本信息卡片 */}
                <MotionCard
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6">教育背景</Typography>
                      <IconButton size="small">
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <SchoolIcon color="primary" />
                      <Box>
                        <Typography variant="subtitle1">{profileData.education}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {profileData.major}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </MotionCard>

                {/* 技能标签卡片 */}
                <MotionCard
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6">专业技能</Typography>
                      <IconButton size="small">
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {profileData.skills.map((skill) => (
                        <Chip
                          key={skill}
                          label={skill}
                          color="primary"
                          variant="outlined"
                          sx={{
                            borderRadius: '8px',
                            '&:hover': {
                              bgcolor: theme.palette.primary.light,
                              color: theme.palette.primary.contrastText,
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </MotionCard>

                {/* 通知中心卡片 */}
                <MotionCard
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6">通知中心</Typography>
                      <Badge badgeContent={notifications.filter(n => !n.isRead).length} color="error">
                        <NotificationsIcon color="action" />
                      </Badge>
                    </Box>
                    <List>
                      {notifications.map((notification) => (
                        <ListItem
                          key={notification.id}
                          sx={{
                            bgcolor: notification.isRead ? 'transparent' : 'action.hover',
                            borderRadius: 1,
                            mb: 1,
                          }}
                        >
                          <ListItemText
                            primary={notification.title}
                            secondary={
                              <Box>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                  {notification.content}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {notification.date}
                                </Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </MotionCard>
              </Stack>
            </AnimatePresence>
          </Grid>

          {/* 右侧主要内容区 */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ borderRadius: '16px', overflow: 'hidden' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  bgcolor: theme.palette.background.paper,
                }}
              >
                <Tab
                  label="工作经历"
                  icon={<WorkIcon />}
                  iconPosition="start"
                  sx={{ textTransform: 'none' }}
                />
                <Tab
                  label="求职进度"
                  icon={<BusinessIcon />}
                  iconPosition="start"
                  sx={{ textTransform: 'none' }}
                />
              </Tabs>

              <TabPanel value={tabValue} index={0}>
                <Box sx={{ p: 2 }}>
                  {profileData.experience.map((exp, index) => (
                    <MotionCard
                      key={exp.id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 }}
                      sx={{
                        mb: 2,
                        '&:hover': {
                          boxShadow: theme.shadows[8],
                          transform: 'translateY(-4px)',
                          transition: 'all 0.3s ease-in-out',
                        },
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Box>
                            <Typography variant="h6" color="primary">
                              {exp.title}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                              {exp.company}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {exp.period}
                          </Typography>
                        </Box>
                        <Typography variant="body1">
                          {exp.description}
                        </Typography>
                      </CardContent>
                    </MotionCard>
                  ))}
                </Box>
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <Box sx={{ p: 2 }}>
                  {jobApplications.map((application, index) => (
                    <MotionCard
                      key={application.id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 }}
                      sx={{
                        mb: 2,
                        '&:hover': {
                          boxShadow: theme.shadows[8],
                          transform: 'translateY(-4px)',
                          transition: 'all 0.3s ease-in-out',
                        },
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Box>
                            <Typography variant="h6" color="primary">
                              {application.position}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                              {application.company}
                            </Typography>
                          </Box>
                          <Box sx={{ textAlign: 'right' }}>
                            <Chip
                              label={application.status}
                              color="primary"
                              size="small"
                              sx={{ mb: 1 }}
                            />
                            <Typography variant="caption" color="text.secondary" display="block">
                              申请日期：{application.date}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              申请进度
                            </Typography>
                            <Typography variant="body2" color="primary">
                              {application.progress}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={application.progress}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              bgcolor: theme.palette.grey[200],
                              '& .MuiLinearProgress-bar': {
                                borderRadius: 4,
                              },
                            }}
                          />
                        </Box>
                      </CardContent>
                    </MotionCard>
                  ))}
                </Box>
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* 编辑对话框 */}
      <EditProfileDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onSave={handleSaveProfile}
        initialData={profileData}
      />

      {/* 全局消息提示 */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
} 