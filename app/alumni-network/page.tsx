'use client';

import { useState, useRef } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  Divider,
  Popover,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon, 
  Avatar
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
// 导入中国地图
import chinaMapSrc from '../resources/map.jpg';

// 校友会数据
const alumniAssociations = [
  {
    id: 1,
    name: '武汉校友会',
    location: 'china-central',
    coordinates: { x: 554, y: 320 },
    contact: {
      email: 'wuhan@alumni.edu.cn',
      phone: '027-12345678'
    },
    description: '武汉校友会成立于2005年，现有会员超过5000人。'
  },
  {
    id: 2,
    name: '西安校友会',
    location: 'china-northwest',
    coordinates: { x: 500, y: 270},
    contact: {
      email: 'xian@alumni.edu.cn',
      phone: '029-12345678'
    },
    description: '西安校友会致力于促进校友之间的交流与合作。'
  },
  {
    id: 3,
    name: '深圳校友会',
    location: 'china-south',
    coordinates: { x: 560, y: 420 },
    contact: {
      email: 'shenzhen@alumni.edu.cn',
      phone: '0755-12345678'
    },
    description: '深圳校友会是最活跃的校友组织之一，定期举办各类活动。'
  },
  {
    id: 4,
    name: '北京校友会',
    location: 'china-north',
    coordinates: { x: 580, y: 190 },
    contact: {
      email: 'beijing@alumni.edu.cn',
      phone: '010-12345678'
    },
    description: '北京校友会是最早成立的校友会之一，拥有广泛的资源网络。'
  },
  {
    id: 5,
    name: '上海校友会',
    location: 'china-east',
    coordinates: { x: 640, y: 300},
    contact: {
      email: 'shanghai@alumni.edu.cn',
      phone: '021-12345678'
    },
    description: '上海校友会致力于为在沪校友提供职业发展和社交平台。'
  },
  {
    id: 6,
    name: '成都校友会',
    location: 'china-southwest',
    coordinates: { x: 450, y: 320 },
    contact: {
      email: 'chengdu@alumni.edu.cn',
      phone: '028-12345678'
    },
    description: '成都校友会凝聚了西南地区的校友力量，提供广泛的职业和社交支持。'
  },
  {
    id: 7,
    name: '广州校友会',
    location: 'china-south',
    coordinates: { x: 540, y: 420},
    contact: {
      email: 'guangzhou@alumni.edu.cn',
      phone: '020-12345678'
    },
    description: '广州校友会是华南地区重要的校友组织，定期举办各类活动和讲座。'
  },
  {
    id: 8,
    name: '杭州校友会',
    location: 'china-east',
    coordinates: { x: 620, y: 330},
    contact: {
      email: 'hangzhou@alumni.edu.cn',
      phone: '0571-12345678'
    },
    description: '杭州校友会助力互联网和创新创业发展，为校友提供广泛的资源。'
  }
];

// 校友活动数据
const alumniActivities = [
  {
    id: 1,
    title: '2024春季校友创业沙龙',
    date: '2024-04-15',
    location: '深圳·南山区创业大厦',
    image: 'https://placehold.co/400x200/1976d2/white?text=创业沙龙',
    description: '邀请知名校友创业者分享创业经验和行业洞见，探讨当前创业环境和机会。'
  },
  {
    id: 2,
    title: '北京校友会年度聚会',
    date: '2024-05-20',
    location: '北京·朝阳区国际会议中心',
    image: 'https://placehold.co/400x200/1976d2/white?text=年度聚会',
    description: '北京校友会一年一度的大型聚会，回顾过去一年成就，规划未来发展方向。'
  },
  {
    id: 3,
    title: '全球校友线上论坛',
    date: '2024-06-10',
    location: '线上活动',
    image: 'https://placehold.co/400x200/1976d2/white?text=线上论坛',
    description: '面向全球校友的线上主题论坛，探讨国际合作与交流机会。'
  }
];

// 知名校友故事
const alumniStories = [
  {
    id: 1,
    name: '张明',
    title: '科技创新领军人物',
    image: 'https://placehold.co/150x150/1976d2/white?text=张明',
    description: '2005级校友，知名科技企业创始人，致力于人工智能技术研发，获得国家科技进步奖。'
  },
  {
    id: 2,
    name: '李华',
    title: '国际金融专家',
    image: 'https://placehold.co/150x150/1976d2/white?text=李华',
    description: '1998级校友，国际知名投资银行合伙人，推动中外金融合作，设立校友创业基金。'
  },
  {
    id: 3,
    name: '王芳',
    title: '教育公益先锋',
    image: 'https://placehold.co/150x150/1976d2/white?text=王芳',
    description: '2010级校友，创办教育公益组织，关注偏远地区教育发展，影响超过10万名学生。'
  }
];

export default function AlumniNetwork() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedAssociation, setSelectedAssociation] = useState<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, association: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedAssociation(association);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <main>
      <Navbar />
      
      {/* 头部标题 */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" gutterBottom>
            校友圈
          </Typography>
          <Typography variant="h6">
            连接全国校友，共建美好未来
          </Typography>
        </Container>
      </Box>
      
      {/* 中国地图区域 */}
      <Container maxWidth="lg" sx={{ mt: 6, mb: 8 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
          全国校友组织
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          鼠标悬停在地图上的红点可查看各地校友会信息。
        </Typography>
        
        <Card elevation={3}>
          <CardContent sx={{ p: 0, position: 'relative' }}>
            <Box 
              ref={mapContainerRef}
              sx={{ 
                position: 'relative', 
                width: '100%', 
                height: '500px',
                overflow: 'hidden'
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%'
                }}
              >
                <Image
                  src={chinaMapSrc}
                  alt="中国地图"
                  fill
                  priority
                  style={{ objectFit: 'contain' }}
                />
              </Box>
              
              {/* 地图上的标记点 */}
              {alumniAssociations.map((association) => (
                <Box
                  key={association.id}
                  sx={{
                    position: 'absolute',
                    left: `${association.coordinates.x}px`,
                    top: `${association.coordinates.y}px`,
                    width: 15,
                    height: 15,
                    bgcolor: 'error.main',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      transform: 'scale(1.5)',
                      bgcolor: 'secondary.main',
                      boxShadow: '0 0 8px rgba(0,0,0,0.3)',
                      zIndex: 10
                    },
                    border: '2px solid white',
                    zIndex: 5
                  }}
                  aria-owns={open ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={(e) => handlePopoverOpen(e, association)}
                  onMouseLeave={handlePopoverClose}
                />
              ))}
            </Box>
          </CardContent>
        </Card>
        
        {/* 弹出框 */}
        <Popover
          id="mouse-over-popover"
          sx={{ pointerEvents: 'none' }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          {selectedAssociation && (
            <Paper sx={{ p: 2, maxWidth: 300 }}>
              <Typography variant="h6" gutterBottom>
                {selectedAssociation.name}
              </Typography>
              <Typography variant="body2" paragraph>
                {selectedAssociation.description}
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={selectedAssociation.contact.email} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={selectedAssociation.contact.phone} />
                </ListItem>
              </List>
            </Paper>
          )}
        </Popover>
      </Container>
      
      {/* 校友行动区域 */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
            校友行动
          </Typography>
          
          <Grid container spacing={4}>
            {/* 校友活动 */}
            <Grid item xs={12} md={7}>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <EventIcon sx={{ mr: 1 }} /> 近期活动
              </Typography>
              <Card elevation={2}>
                <CardContent>
                  {alumniActivities.map((activity, index) => (
                    <Box key={activity.id}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                          <CardMedia
                            component="img"
                            height="140"
                            image={activity.image}
                            alt={activity.title}
                            sx={{ borderRadius: 1 }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                          <Typography variant="h6" gutterBottom>
                            {activity.title}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <EventIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              {activity.date}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <LocationOnIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              {activity.location}
                            </Typography>
                          </Box>
                          <Typography variant="body2">
                            {activity.description}
                          </Typography>
                        </Grid>
                      </Grid>
                      {index < alumniActivities.length - 1 && (
                        <Divider sx={{ my: 2 }} />
                      )}
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
            
            {/* 知名校友故事 */}
            <Grid item xs={12} md={5}>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <PeopleIcon sx={{ mr: 1 }} /> 知名校友故事
              </Typography>
              <Card elevation={2}>
                <CardContent>
                  {alumniStories.map((alumni, index) => (
                    <Box key={alumni.id}>
                      <Grid container spacing={2}>
                        <Grid item xs={3}>
                          <Avatar
                            src={alumni.image}
                            alt={alumni.name}
                            sx={{ width: 70, height: 70 }}
                          />
                        </Grid>
                        <Grid item xs={9}>
                          <Typography variant="h6">
                            {alumni.name}
                          </Typography>
                          <Typography variant="subtitle2" color="primary" gutterBottom>
                            {alumni.title}
                          </Typography>
                          <Typography variant="body2">
                            {alumni.description}
                          </Typography>
                        </Grid>
                      </Grid>
                      {index < alumniStories.length - 1 && (
                        <Divider sx={{ my: 2 }} />
                      )}
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </main>
  );
} 