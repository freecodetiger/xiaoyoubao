'use client';

import { useAuth } from '@/app/providers';
import DashboardLayout from '@/components/DashboardLayout';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  Business,
  Work,
  Event,
  School,
  TrendingUp,
  People,
  Assignment,
  LocationOn,
} from '@mui/icons-material';

// 模拟数据
const quickLinks = [
  { title: '企业服务', icon: Business, description: '寻找商业合作伙伴', path: '/enterprise' },
  { title: '就业支持', icon: Work, description: '发现职业机会', path: '/career' },
  { title: '校友活动', icon: Event, description: '参与校友聚会', path: '/events' },
  { title: '资源中心', icon: School, description: '共享学习资源', path: '/resources' },
];

const trendingCompanies = [
  { name: '腾讯科技', industry: '互联网', location: '深圳', positions: 12 },
  { name: '阿里巴巴', industry: '电子商务', location: '杭州', positions: 8 },
  { name: '字节跳动', industry: '互联网', location: '北京', positions: 15 },
];

const upcomingEvents = [
  {
    title: '2024校友春季交流会',
    date: '2024-03-15',
    location: '线上',
    type: '交流会',
  },
  {
    title: '创业经验分享会',
    date: '2024-03-20',
    location: '深圳',
    type: '分享会',
  },
  {
    title: '校企合作论坛',
    date: '2024-03-25',
    location: '北京',
    type: '论坛',
  },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      {/* 欢迎区域 */}
      <Paper
        sx={{
          p: 3,
          mb: 3,
          background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
          color: 'white',
        }}
      >
        <Typography variant="h4" gutterBottom>
          欢迎回来，{user?.name}
        </Typography>
        <Typography variant="body1">
          今天是个探索新机会的好日子！
        </Typography>
      </Paper>

      {/* 快速通道 */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
        快速通道
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {quickLinks.map((link) => {
          const IconComponent = link.icon;
          return (
            <Grid item xs={12} sm={6} md={3} key={link.title}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-4px)',
                    transition: 'all 0.3s',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <IconComponent color="primary" sx={{ fontSize: 40 }} />
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {link.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {link.description}
                  </Typography>
                  <Button variant="outlined" size="small" href={link.path}>
                    了解更多
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* 动态展示区 */}
      <Grid container spacing={3}>
        {/* 热门企业 */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">热门企业</Typography>
              </Box>
              <List>
                {trendingCompanies.map((company) => (
                  <ListItem
                    key={company.name}
                    sx={{
                      border: '1px solid #eee',
                      borderRadius: 1,
                      mb: 1,
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <Business />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={company.name}
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                          <Chip size="small" label={company.industry} />
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LocationOn sx={{ fontSize: 16 }} />
                            <Typography variant="body2">{company.location}</Typography>
                          </Box>
                          <Chip
                            size="small"
                            color="primary"
                            label={`${company.positions} 个职位`}
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* 近期活动 */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Event color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">近期活动</Typography>
              </Box>
              <List>
                {upcomingEvents.map((event) => (
                  <ListItem
                    key={event.title}
                    sx={{
                      border: '1px solid #eee',
                      borderRadius: 1,
                      mb: 1,
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                      },
                    }}
                  >
                    <ListItemText
                      primary={event.title}
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                          <Chip size="small" label={event.date} />
                          <Chip size="small" label={event.location} />
                          <Chip size="small" color="primary" label={event.type} />
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
} 