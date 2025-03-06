'use client';

import { Box, Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PeopleIcon from '@mui/icons-material/People';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

// 模拟数据
const featuredCompanies = [
  { id: 1, name: '腾讯科技', logo: 'https://placehold.co/200x100/1976d2/white?text=腾讯科技', description: '全球领先的互联网科技公司' },
  { id: 2, name: '阿里巴巴', logo: 'https://placehold.co/200x100/1976d2/white?text=阿里巴巴', description: '全球最大的电商平台' },
  { id: 3, name: '字节跳动', logo: 'https://placehold.co/200x100/1976d2/white?text=字节跳动', description: '创新的互联网企业' },
];

const hotJobs = [
  { id: 1, title: '高级前端工程师', company: '腾讯科技', salary: '25k-50k' },
  { id: 2, title: '产品经理', company: '阿里巴巴', salary: '20k-40k' },
  { id: 3, title: '算法工程师', company: '字节跳动', salary: '30k-60k' },
];

const latestEvents = [
  { id: 1, title: '2024校友企业招聘会', date: '2024-03-20', location: '线上' },
  { id: 2, title: '创业经验分享沙龙', date: '2024-03-25', location: '创新中心' },
  { id: 3, title: '行业趋势分析会', date: '2024-03-30', location: '报告厅' },
];

export default function Home() {
  return (
    <main>
      <Navbar />
      
      {/* 核心入口区域 */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white',
          py: 8,
          backgroundImage: 'linear-gradient(45deg, #1976d2 30%, #1565c0 90%)',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h1" gutterBottom>
                校友服务平台
              </Typography>
              <Typography variant="h6" paragraph>
                连接校友资源，助力职业发展
              </Typography>
              <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  component={Link}
                  href="/enterprise"
                  startIcon={<BusinessIcon />}
                  sx={{ mr: 2, mb: { xs: 2, sm: 2 } }}
                >
                  企业服务
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  size="large"
                  component={Link}
                  href="/alumni-network"
                  startIcon={<PeopleIcon />}
                  sx={{ mr: 2, mb: { xs: 2, sm: 2 } }}
                >
                  校友圈
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  component={Link}
                  href="/career"
                  startIcon={<WorkIcon />}
                  sx={{ mr: 2, mb: { xs: 2, sm: 2 } }}
                >
                  企业招聘直通车
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  component={Link}
                  href="/enterprise-ai"
                  startIcon={<SmartToyIcon />}
                  sx={{ 
                    background: 'linear-gradient(45deg, #2E7D32 30%, #4CAF50 90%)',
                    boxShadow: '0 3px 5px 2px rgba(46, 125, 50, .3)',
                    mb: { xs: 2, sm: 2 }
                  }}
                >
                  企业大模型
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative', height: 300 }}>
                <Image
                  src="https://placehold.co/600x400/1976d2/white?text=校友服务平台"
                  alt="校友服务平台"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'contain' }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 动态展示区域 */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Grid container spacing={4}>
          {/* 校友企业轮播 */}
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              重点校友企业
            </Typography>
            <Grid container spacing={2}>
              {featuredCompanies.map((company) => (
                <Grid item xs={12} sm={4} key={company.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ height: 60, position: 'relative', mb: 2 }}>
                        <Image
                          src={company.logo}
                          alt={company.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          style={{ objectFit: 'contain' }}
                        />
                      </Box>
                      <Typography variant="h6" gutterBottom>
                        {company.name}
                      </Typography>
                      <Typography color="text.secondary">
                        {company.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* 热门招聘岗位 */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              热门招聘岗位
            </Typography>
            <Card>
              <CardContent>
                {hotJobs.map((job) => (
                  <Box key={job.id} sx={{ mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
                    <Typography variant="h6" gutterBottom>
                      {job.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {job.company} · {job.salary}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* 最新行业活动 */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              最新行业活动
            </Typography>
            <Card>
              <CardContent>
                {latestEvents.map((event) => (
                  <Box key={event.id} sx={{ mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
                    <Typography variant="h6" gutterBottom>
                      {event.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {event.date} · {event.location}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
