'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Chip,
  Avatar,
  Tab,
  Tabs,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import Navbar from '@/components/Navbar';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

// 模拟数据 - 合作需求
const cooperationNeeds = [
  {
    id: 1,
    title: '寻找AI技术合作伙伴',
    company: '未来科技有限公司',
    type: '技术合作',
    description: '我们正在寻找在计算机视觉和深度学习领域有经验的合作伙伴',
    tags: ['AI', '深度学习', '计算机视觉'],
    contact: '张总',
    date: '2024-02-18',
  },
  {
    id: 2,
    title: '新能源项目投资机会',
    company: '绿色能源集团',
    type: '投资合作',
    description: '光伏发电站建设项目，寻找投资合作伙伴',
    tags: ['新能源', '光伏', '投资'],
    contact: '李总',
    date: '2024-02-17',
  },
];

// 模拟数据 - 校友资源
const alumniResources = [
  {
    id: 1,
    name: '王教授',
    title: 'AI研究专家',
    organization: '清华大学',
    expertise: ['人工智能', '机器学习'],
    description: '在AI领域有20年研究经验，可提供技术咨询',
  },
  {
    id: 2,
    name: '张总',
    title: '投资总监',
    organization: '创新投资基金',
    expertise: ['投资', '企业管理'],
    description: '专注于科技创新企业投资，可提供融资对接',
  },
];

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
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function ResourcesPage() {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <main>
      <Navbar />
      
      {/* 头部区域 */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 4,
          backgroundImage: 'linear-gradient(45deg, #1976d2 30%, #1565c0 90%)',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" component="h1" gutterBottom>
            资源对接大厅
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            连接优质校友资源，促进商业合作
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="搜索合作机会或校友资源"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ 
                bgcolor: 'white',
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                },
              }}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'grey.500' }} />,
              }}
            />
            <Button
              variant="contained"
              color="secondary"
              startIcon={<FilterListIcon />}
            >
              筛选
            </Button>
          </Box>
        </Container>
      </Box>

      {/* 主要内容区域 */}
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="合作需求" />
            <Tab label="校友资源" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {cooperationNeeds.map((need) => (
              <Grid item xs={12} key={need.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {need.title}
                        </Typography>
                        <Typography color="text.secondary" gutterBottom>
                          {need.company} · {need.type}
                        </Typography>
                      </Box>
                      <Typography color="text.secondary">
                        发布日期：{need.date}
                      </Typography>
                    </Box>
                    <Typography paragraph>
                      {need.description}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      {need.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{ mr: 1 }}
                        />
                      ))}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2">
                        联系人：{need.contact}
                      </Typography>
                      <Button variant="contained" color="primary">
                        联系对接
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <List>
            {alumniResources.map((resource) => (
              <ListItem
                key={resource.id}
                alignItems="flex-start"
                component={Card}
                sx={{ mb: 2 }}
              >
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6">
                        {resource.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {resource.title}
                      </Typography>
                      <Divider orientation="vertical" flexItem />
                      <Typography variant="body2" color="text.secondary">
                        {resource.organization}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <Typography paragraph>
                        {resource.description}
                      </Typography>
                      <Box>
                        {resource.expertise.map((exp) => (
                          <Chip
                            key={exp}
                            label={exp}
                            size="small"
                            sx={{ mr: 1 }}
                          />
                        ))}
                      </Box>
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <Button variant="outlined" color="primary">
                    请求咨询
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </TabPanel>

        {/* 发布按钮 */}
        <Button
          variant="contained"
          color="primary"
          startIcon={<BusinessIcon />}
          sx={{ position: 'fixed', bottom: 24, right: 24 }}
        >
          发布需求
        </Button>
      </Container>
    </main>
  );
} 