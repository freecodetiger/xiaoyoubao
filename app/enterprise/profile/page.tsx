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
  Avatar,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import Navbar from '@/components/Navbar';
import EditIcon from '@mui/icons-material/Edit';
import BusinessIcon from '@mui/icons-material/Business';
import UploadIcon from '@mui/icons-material/Upload';
import DescriptionIcon from '@mui/icons-material/Description';
import BarChartIcon from '@mui/icons-material/BarChart';
import DataAnalysis from '@/components/DataAnalysis';

// 模拟数据 - 企业信息
const companyInfo = {
  name: '未来科技有限公司',
  logo: 'https://placehold.co/100x100/1976d2/white?text=Logo',
  type: '科技创新',
  size: '100-499人',
  location: '北京市海淀区',
  industry: '人工智能',
  description: '专注于AI技术研发和应用的高新技术企业',
  website: 'www.example.com',
  contact: {
    name: '张三',
    position: '人力资源总监',
    email: 'hr@example.com',
    phone: '010-12345678',
  },
};

// 模拟数据 - 合作记录
const cooperationRecords = [
  {
    id: 1,
    type: '人才招聘',
    date: '2024-02-18',
    status: '进行中',
    description: '校园招聘活动',
    result: '已收到15份简历',
  },
  {
    id: 2,
    type: '技术合作',
    date: '2024-02-15',
    status: '已完成',
    description: 'AI算法优化项目',
    result: '成功提升模型准确率20%',
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

export default function ProfilePage() {
  const [tabValue, setTabValue] = useState(0);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Avatar
              src={companyInfo.logo}
              alt={companyInfo.name}
              sx={{ width: 100, height: 100 }}
            />
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                {companyInfo.name}
              </Typography>
              <Typography variant="subtitle1">
                {companyInfo.industry} · {companyInfo.size}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* 主要内容区域 */}
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab icon={<BusinessIcon />} label="基本信息" />
            <Tab icon={<DescriptionIcon />} label="合作记录" />
            <Tab icon={<BarChartIcon />} label="数据分析" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">企业基本信息</Typography>
                <IconButton color="primary" onClick={() => setEditDialogOpen(true)}>
                  <EditIcon />
                </IconButton>
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    企业类型
                  </Typography>
                  <Typography gutterBottom>{companyInfo.type}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    所在地
                  </Typography>
                  <Typography gutterBottom>{companyInfo.location}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    企业简介
                  </Typography>
                  <Typography paragraph>{companyInfo.description}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    官网
                  </Typography>
                  <Typography gutterBottom>{companyInfo.website}</Typography>
                </Grid>
              </Grid>

              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>联系人信息</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      姓名
                    </Typography>
                    <Typography gutterBottom>{companyInfo.contact.name}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      职位
                    </Typography>
                    <Typography gutterBottom>{companyInfo.contact.position}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      邮箱
                    </Typography>
                    <Typography gutterBottom>{companyInfo.contact.email}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      电话
                    </Typography>
                    <Typography gutterBottom>{companyInfo.contact.phone}</Typography>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <List>
            {cooperationRecords.map((record) => (
              <ListItem
                key={record.id}
                component={Card}
                sx={{ mb: 2 }}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                      <Typography variant="h6">
                        {record.type}
                      </Typography>
                      <Chip
                        label={record.status}
                        color={record.status === '进行中' ? 'primary' : 'success'}
                        size="small"
                      />
                      <Typography variant="body2" color="text.secondary">
                        {record.date}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" paragraph>
                        {record.description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        结果：{record.result}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <DataAnalysis />
        </TabPanel>
      </Container>

      {/* 编辑信息对话框 */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>编辑企业信息</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Avatar
                    src={companyInfo.logo}
                    alt={companyInfo.name}
                    sx={{ width: 60, height: 60 }}
                  />
                  <Button
                    variant="outlined"
                    startIcon={<UploadIcon />}
                  >
                    更换Logo
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="企业名称"
                  defaultValue={companyInfo.name}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="企业类型"
                  defaultValue={companyInfo.type}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="所在地"
                  defaultValue={companyInfo.location}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="规模"
                  defaultValue={companyInfo.size}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="企业简介"
                  defaultValue={companyInfo.description}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>
            取消
          </Button>
          <Button variant="contained" onClick={() => setEditDialogOpen(false)}>
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
} 