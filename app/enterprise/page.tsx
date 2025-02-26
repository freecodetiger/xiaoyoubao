'use client';

import { Box, Container, Grid, Card, CardContent, Typography, Button, CardActions, CardMedia } from '@mui/material';
import Navbar from '@/components/Navbar';
import BusinessIcon from '@mui/icons-material/Business';
import HandshakeIcon from '@mui/icons-material/Handshake';
import WorkIcon from '@mui/icons-material/Work';
import FolderIcon from '@mui/icons-material/Folder';
import Link from 'next/link';

// 服务模块数据
const services = [
  {
    id: 1,
    title: '招聘发布系统',
    description: '快速发布招聘信息，直达优质校友人才',
    icon: <WorkIcon sx={{ fontSize: 40 }} />,
    link: '/enterprise/recruitment',
    features: ['一键发布招聘信息', '智能人才匹配', '简历筛选管理'],
  },
  {
    id: 2,
    title: '资源对接大厅',
    description: '链接校友资源，促进商业合作',
    icon: <HandshakeIcon sx={{ fontSize: 40 }} />,
    link: '/enterprise/resources',
    features: ['项目合作对接', '资源共享平台', '校友圈层对接'],
  },
  {
    id: 3,
    title: '企业档案管理',
    description: '完善的企业信息管理系统',
    icon: <FolderIcon sx={{ fontSize: 40 }} />,
    link: '/enterprise/profile',
    features: ['企业信息管理', '合作记录追踪', '数据分析报告'],
  },
];

// 成功案例数据
const successCases = [
  {
    id: 1,
    company: '科技创新企业',
    title: '校友资源助力企业快速成长',
    content: '通过校友网络，成功对接投资机构，获得A轮融资',
    image: 'https://placehold.co/400x200/1976d2/white?text=案例1',
  },
  {
    id: 2,
    company: '传统企业转型',
    title: '数字化转型的成功实践',
    content: '借助校友专家团队，完成企业数字化转型',
    image: 'https://placehold.co/400x200/1976d2/white?text=案例2',
  },
];

export default function EnterprisePage() {
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
            <Grid item xs={12} md={8}>
              <Typography variant="h3" component="h1" gutterBottom>
                企业服务专区
              </Typography>
              <Typography variant="h6" paragraph>
                连接校友资源，助力企业发展
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<BusinessIcon />}
                sx={{ mt: 2 }}
              >
                立即入驻
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 服务模块 */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
          我们的服务
        </Typography>
        <Grid container spacing={4}>
          {services.map((service) => (
            <Grid item xs={12} md={4} key={service.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    {service.icon}
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom align="center">
                    {service.title}
                  </Typography>
                  <Typography color="text.secondary" paragraph align="center">
                    {service.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {service.features.map((feature, index) => (
                      <Typography key={index} component="div" sx={{ mb: 1 }}>
                        • {feature}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button
                    component={Link}
                    href={service.link}
                    variant="outlined"
                    color="primary"
                  >
                    了解更多
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 成功案例 */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
            成功案例
          </Typography>
          <Grid container spacing={4}>
            {successCases.map((case_) => (
              <Grid item xs={12} md={6} key={case_.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={case_.image}
                    alt={case_.title}
                  />
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {case_.company}
                    </Typography>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {case_.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {case_.content}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      查看详情
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 服务流程 */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
          服务流程
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" color="primary" gutterBottom>
                01
              </Typography>
              <Typography variant="h6">企业注册</Typography>
              <Typography color="text.secondary">
                完善企业基本信息
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" color="primary" gutterBottom>
                02
              </Typography>
              <Typography variant="h6">需求发布</Typography>
              <Typography color="text.secondary">
                发布招聘或合作需求
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" color="primary" gutterBottom>
                03
              </Typography>
              <Typography variant="h6">资源对接</Typography>
              <Typography color="text.secondary">
                匹配优质校友资源
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" color="primary" gutterBottom>
                04
              </Typography>
              <Typography variant="h6">达成合作</Typography>
              <Typography color="text.secondary">
                促成双方合作共赢
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
} 