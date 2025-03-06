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
  Tabs,
  Tab,
  Chip,
  Avatar,
  useTheme,
  useMediaQuery,
  Paper,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SearchIcon from '@mui/icons-material/Search';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';

// 模拟数据 - 热门岗位
const hotJobs = [
  {
    id: 1,
    title: '高级前端工程师',
    company: '腾讯科技',
    location: '深圳',
    salary: '25k-50k',
    requirements: ['本科及以上', '3年以上经验', 'React/Vue'],
    tags: ['互联网', '前端开发', '大厂'],
  },
  {
    id: 2,
    title: '产品经理',
    company: '阿里巴巴',
    location: '杭州',
    salary: '20k-40k',
    requirements: ['本科及以上', '2年以上经验', '数据分析'],
    tags: ['互联网', '产品', 'B端'],
  },
];

// 模拟数据 - 导师资源
const mentors = [
  {
    id: 1,
    name: '张教授',
    title: 'AI研究专家',
    organization: '清华大学',
    expertise: ['人工智能', '机器学习'],
    description: '20年AI领域研究经验，可提供职业规划和技术指导。',
    avatar: 'https://placehold.co/100x100/1976d2/white?text=张',
  },
  {
    id: 2,
    name: '李总',
    title: '创业导师',
    organization: '创新投资',
    expertise: ['创业指导', '商业计划'],
    description: '连续创业者，专注于科技创新领域投资。',
    avatar: 'https://placehold.co/100x100/1976d2/white?text=李',
  },
];

// 模拟数据 - 行业报告
const industryReports = [
  {
    id: 1,
    title: '2024年互联网行业薪资报告',
    date: '2024-02',
    highlights: ['平均薪资上涨15%', '前端开发最受欢迎', '人工智能岗位需求增长'],
  },
  {
    id: 2,
    title: '2024年金融科技人才趋势报告',
    date: '2024-02',
    highlights: ['区块链人才紧缺', '金融科技转型加速', '复合型人才受青睐'],
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

export default function CareerPage() {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchQuery, setSearchQuery] = useState('');
  const [openResumeForm, setOpenResumeForm] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenResumeForm = () => {
    setOpenResumeForm(true);
  };

  const handleCloseResumeForm = () => {
    setOpenResumeForm(false);
  };

  return (
    <main>
      <Navbar />
      
      {/* 头部区域 */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white',
          py: 8,
          backgroundImage: 'linear-gradient(45deg, #1976d2 30%, #1565c0 90%)',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="h3" component="h1" gutterBottom>
                企业招聘直通车
              </Typography>
              <Typography variant="h6" paragraph>
                连接校友企业，助力职业发展，提供优质招聘信息和简历投递通道
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  startIcon={<BusinessCenterIcon />}
                  sx={{ mr: 2, mb: { xs: 2, sm: 0 } }}
                  onClick={handleOpenResumeForm}
                >
                  投递简历
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  startIcon={<SchoolIcon />}
                >
                  校友企业入驻
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: { xs: 200, md: 300 },
                }}
              >
                <WorkIcon sx={{ fontSize: { xs: 100, md: 180 }, opacity: 0.8 }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 主要内容区域 */}
      <Container maxWidth="lg" sx={{ mt: 4, pb: 8 }}>
        {/* 搜索区域 */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3,
            mb: 4,
            borderRadius: '16px',
            bgcolor: theme.palette.background.paper,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                placeholder="搜索职位、技能、公司..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <SearchIcon sx={{ color: theme.palette.text.secondary, mr: 1 }} />
                  ),
                  sx: {
                    borderRadius: '12px',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  height: '100%',
                  borderRadius: '12px',
                }}
              >
                搜索
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* 功能区域 */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <MotionCard
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.02 }}
              sx={{ height: '100%' }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                    <BusinessCenterIcon />
                  </Avatar>
                  <Typography variant="h6">岗位搜索</Typography>
                </Box>
                <Typography color="text.secondary" paragraph>
                  智能匹配最新职位，定制你的职业发展路径
                </Typography>
                <Button variant="outlined" color="primary">
                  开始搜索
                </Button>
              </CardContent>
            </MotionCard>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <MotionCard
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              sx={{ height: '100%' }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: theme.palette.secondary.main, mr: 2 }}>
                    <SchoolIcon />
                  </Avatar>
                  <Typography variant="h6">导师匹配</Typography>
                </Box>
                <Typography color="text.secondary" paragraph>
                  连接行业导师，获取专业指导和建议
                </Typography>
                <Button variant="outlined" color="secondary">
                  寻找导师
                </Button>
              </CardContent>
            </MotionCard>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <MotionCard
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              sx={{ height: '100%' }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: theme.palette.success.main, mr: 2 }}>
                    <TrendingUpIcon />
                  </Avatar>
                  <Typography variant="h6">行业报告</Typography>
                </Box>
                <Typography color="text.secondary" paragraph>
                  了解最新行业动态，把握发展机遇
                </Typography>
                <Button variant="outlined" color="success">
                  查看报告
                </Button>
              </CardContent>
            </MotionCard>
          </Grid>
        </Grid>

        {/* 热门岗位 */}
        <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
          热门岗位
        </Typography>
        <Grid container spacing={3}>
          {hotJobs.map((job, index) => (
            <Grid item xs={12} md={6} key={job.id}>
              <MotionCard
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                sx={{
                  height: '100%',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[8],
                    transition: 'all 0.3s ease-in-out',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box>
                      <Typography variant="h6" gutterBottom color="primary">
                        {job.title}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        {job.company}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography 
                        variant="h6" 
                        color="error.main"
                        sx={{ fontWeight: 600 }}
                      >
                        {job.salary}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOnIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {job.location}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    {job.requirements.map((req, index) => (
                      <Chip
                        key={index}
                        label={req}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      {job.tags.map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          size="small"
                          color="primary"
                          variant="outlined"
                          sx={{ mr: 1 }}
                        />
                      ))}
                    </Box>
                    <Button variant="contained" size="small">
                      立即申请
                    </Button>
                  </Box>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>

        {/* 导师资源 */}
        <Typography variant="h5" gutterBottom sx={{ mt: 6, mb: 3, fontWeight: 600 }}>
          导师资源
        </Typography>
        <Grid container spacing={3}>
          {mentors.map((mentor, index) => (
            <Grid item xs={12} md={6} key={mentor.id}>
              <MotionCard
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                sx={{
                  height: '100%',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[8],
                    transition: 'all 0.3s ease-in-out',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Avatar
                      src={mentor.avatar}
                      sx={{ width: 64, height: 64 }}
                    />
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {mentor.name}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        {mentor.title} · {mentor.organization}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Typography paragraph>
                    {mentor.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      {mentor.expertise.map((exp, index) => (
                        <Chip
                          key={index}
                          label={exp}
                          size="small"
                          color="secondary"
                          variant="outlined"
                          sx={{ mr: 1 }}
                        />
                      ))}
                    </Box>
                    <Button variant="outlined" color="secondary">
                      预约咨询
                    </Button>
                  </Box>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>

        {/* 行业报告 */}
        <Typography variant="h5" gutterBottom sx={{ mt: 6, mb: 3, fontWeight: 600 }}>
          行业报告
        </Typography>
        <Grid container spacing={3}>
          {industryReports.map((report, index) => (
            <Grid item xs={12} md={6} key={report.id}>
              <MotionCard
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                sx={{
                  height: '100%',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[8],
                    transition: 'all 0.3s ease-in-out',
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    {report.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                    发布时间：{report.date}
                  </Typography>
                  
                  <Box sx={{ my: 2 }}>
                    {report.highlights.map((highlight, index) => (
                      <Typography
                        key={index}
                        variant="body2"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <TrendingUpIcon color="success" sx={{ fontSize: 16 }} />
                        {highlight}
                      </Typography>
                    ))}
                  </Box>
                  
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    下载报告
                  </Button>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 标签页区域 */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons={isMobile ? "auto" : undefined}
            centered={!isMobile}
          >
            <Tab 
              label="校友企业招聘" 
              icon={<BusinessCenterIcon />} 
              iconPosition="start"
            />
            <Tab 
              label="热门岗位" 
              icon={<TrendingUpIcon />} 
              iconPosition="start"
            />
            <Tab 
              label="职业发展" 
              icon={<SchoolIcon />} 
              iconPosition="start"
            />
          </Tabs>
        </Box>
      </Container>

      {/* 简历投递表单 */}
      <Dialog
        open={openResumeForm}
        onClose={handleCloseResumeForm}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            简历投递
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            填写以下信息，您的简历将被推送给校友企业，获得优先面试机会
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="姓名"
                fullWidth
                required
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="联系电话"
                fullWidth
                required
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="邮箱"
                type="email"
                fullWidth
                required
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="毕业院校"
                fullWidth
                required
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="毕业年份"
                fullWidth
                required
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="求职意向"
                fullWidth
                required
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ border: '1px dashed grey', p: 3, borderRadius: 1, textAlign: 'center' }}>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<CloudUploadIcon />}
                >
                  上传简历
                  <input type="file" hidden />
                </Button>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  支持PDF、Word格式，文件大小不超过5MB
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResumeForm}>取消</Button>
          <Button variant="contained" color="primary">
            提交
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
} 