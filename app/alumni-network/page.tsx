'use client';

import { useState, useRef, useEffect } from 'react';
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
  Avatar,
  TextField,
  InputAdornment,
  Chip,
  Tab,
  Tabs,
  Button
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import PublicIcon from '@mui/icons-material/Public';
import LanguageIcon from '@mui/icons-material/Language';
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

// 海外校友会数据
const overseasAlumniAssociations = [
  {
    id: 101,
    name: '纽约校友会',
    region: '北美',
    country: '美国',
    city: '纽约',
    contact: {
      email: 'newyork@alumni.edu.cn',
      phone: '+1-212-1234567'
    },
    description: '纽约校友会成立于2008年，是北美地区最大的校友组织之一，定期举办学术交流、职业发展和文化活动。',
    tags: ['北美', '美国', '纽约', '金融']
  },
  {
    id: 102,
    name: '伦敦校友会',
    region: '欧洲',
    country: '英国',
    city: '伦敦',
    contact: {
      email: 'london@alumni.edu.cn',
      phone: '+44-20-12345678'
    },
    description: '伦敦校友会连接在英国及欧洲地区的校友网络，为校友提供学术、职业和社交平台。',
    tags: ['欧洲', '英国', '伦敦', '金融']
  },
  {
    id: 103,
    name: '多伦多校友会',
    region: '北美',
    country: '加拿大',
    city: '多伦多',
    contact: {
      email: 'toronto@alumni.edu.cn',
      phone: '+1-416-1234567'
    },
    description: '多伦多校友会致力于促进校友之间的交流与合作，帮助新到加拿大的校友适应生活和工作。',
    tags: ['北美', '加拿大', '多伦多', '教育']
  },
  {
    id: 104,
    name: '东京校友会',
    region: '亚洲',
    country: '日本',
    city: '东京',
    contact: {
      email: 'tokyo@alumni.edu.cn',
      phone: '+81-3-12345678'
    },
    description: '东京校友会为在日校友提供交流与互助平台，促进中日文化和教育交流。',
    tags: ['亚洲', '日本', '东京', '科技']
  },
  {
    id: 105,
    name: '悉尼校友会',
    region: '大洋洲',
    country: '澳大利亚',
    city: '悉尼',
    contact: {
      email: 'sydney@alumni.edu.cn',
      phone: '+61-2-12345678'
    },
    description: '悉尼校友会是澳大利亚最大的校友组织，为校友提供职业发展和社交网络支持。',
    tags: ['大洋洲', '澳大利亚', '悉尼', '教育']
  },
  {
    id: 106,
    name: '巴黎校友会',
    region: '欧洲',
    country: '法国',
    city: '巴黎',
    contact: {
      email: 'paris@alumni.edu.cn',
      phone: '+33-1-12345678'
    },
    description: '巴黎校友会促进中法文化和教育交流，定期举办艺术、文化和学术活动。',
    tags: ['欧洲', '法国', '巴黎', '艺术']
  },
  {
    id: 107,
    name: '新加坡校友会',
    region: '亚洲',
    country: '新加坡',
    city: '新加坡',
    contact: {
      email: 'singapore@alumni.edu.cn',
      phone: '+65-12345678'
    },
    description: '新加坡校友会是东南亚地区重要的校友组织，为校友提供职业发展和社交网络支持。',
    tags: ['亚洲', '新加坡', '金融', '科技']
  },
  {
    id: 108,
    name: '温哥华校友会',
    region: '北美',
    country: '加拿大',
    city: '温哥华',
    contact: {
      email: 'vancouver@alumni.edu.cn',
      phone: '+1-604-1234567'
    },
    description: '温哥华校友会为在加拿大西海岸的校友提供交流平台，促进校友之间的互助与合作。',
    tags: ['北美', '加拿大', '温哥华', '教育']
  },
  {
    id: 109,
    name: '柏林校友会',
    region: '欧洲',
    country: '德国',
    city: '柏林',
    contact: {
      email: 'berlin@alumni.edu.cn',
      phone: '+49-30-12345678'
    },
    description: '柏林校友会致力于促进中德科技和教育交流，为在德国的校友提供支持和服务。',
    tags: ['欧洲', '德国', '柏林', '科技']
  },
  {
    id: 110,
    name: '旧金山校友会',
    region: '北美',
    country: '美国',
    city: '旧金山',
    contact: {
      email: 'sanfrancisco@alumni.edu.cn',
      phone: '+1-415-1234567'
    },
    description: '旧金山校友会位于硅谷核心地带，为科技领域的校友提供创新创业支持和资源对接。',
    tags: ['北美', '美国', '旧金山', '科技', '创业']
  },
  {
    id: 111,
    name: '迪拜校友会',
    region: '中东',
    country: '阿联酋',
    city: '迪拜',
    contact: {
      email: 'dubai@alumni.edu.cn',
      phone: '+971-4-1234567'
    },
    description: '迪拜校友会是中东地区的校友交流平台，促进中东与中国之间的商业和文化交流。',
    tags: ['中东', '阿联酋', '迪拜', '商业']
  },
  {
    id: 112,
    name: '首尔校友会',
    region: '亚洲',
    country: '韩国',
    city: '首尔',
    contact: {
      email: 'seoul@alumni.edu.cn',
      phone: '+82-2-12345678'
    },
    description: '首尔校友会为在韩国的校友提供交流平台，促进中韩文化和教育交流。',
    tags: ['亚洲', '韩国', '首尔', '文化']
  }
];

// 提取所有标签
const getAllTags = () => {
  const tagSet = new Set<string>();
  overseasAlumniAssociations.forEach(association => {
    association.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet);
};

// 提取所有地区
const getAllRegions = () => {
  const regionSet = new Set<string>();
  overseasAlumniAssociations.forEach(association => {
    regionSet.add(association.region);
  });
  return Array.from(regionSet);
};

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
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredAssociations, setFilteredAssociations] = useState(overseasAlumniAssociations);
  
  const allTags = getAllTags();
  const allRegions = getAllRegions();

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, association: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedAssociation(association);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  
  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
  };
  
  // 过滤校友会
  useEffect(() => {
    let filtered = overseasAlumniAssociations;
    
    // 搜索过滤
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(association => 
        association.name.toLowerCase().includes(query) ||
        association.city.toLowerCase().includes(query) ||
        association.country.toLowerCase().includes(query) ||
        association.region.toLowerCase().includes(query) ||
        association.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // 标签过滤
    if (selectedTags.length > 0) {
      filtered = filtered.filter(association => 
        selectedTags.some(tag => association.tags.includes(tag) || 
                               association.region === tag || 
                               association.country === tag || 
                               association.city === tag)
      );
    }
    
    setFilteredAssociations(filtered);
  }, [searchQuery, selectedTags]);

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
      
      {/* 标签页切换 */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="校友圈标签页">
            <Tab label="国内校友组织" icon={<LocationOnIcon />} iconPosition="start" />
            <Tab label="海外校友组织" icon={<PublicIcon />} iconPosition="start" />
          </Tabs>
        </Box>
      </Container>
      
      {/* 国内校友组织内容 */}
      {tabValue === 0 && (
        <>
          {/* 中国地图区域 */}
          <Container maxWidth="lg" sx={{ mt: 3, mb: 8 }}>
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
        </>
      )}
      
      {/* 海外校友组织内容 */}
      {tabValue === 1 && (
        <Container maxWidth="lg" sx={{ mt: 3, mb: 8 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
            海外校友组织
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
            查找全球各地的校友会组织，获取联系方式和活动信息。
          </Typography>
          
          {/* 搜索和筛选区域 */}
          <Card elevation={3} sx={{ mb: 4 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    placeholder="搜索校友会（如：纽约、欧洲、科技...）"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ mr: 2 }}>
                      地区:
                    </Typography>
                    {allRegions.map((region) => (
                      <Chip
                        key={region}
                        label={region}
                        clickable
                        color={selectedTags.includes(region) ? "primary" : "default"}
                        onClick={() => handleTagClick(region)}
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Typography variant="subtitle1" sx={{ mr: 2 }}>
                      标签:
                    </Typography>
                    {allTags.filter(tag => !allRegions.includes(tag)).map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        clickable
                        color={selectedTags.includes(tag) ? "primary" : "default"}
                        onClick={() => handleTagClick(tag)}
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>
                </Grid>
                
                {(searchQuery || selectedTags.length > 0) && (
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        找到 {filteredAssociations.length} 个校友会组织
                      </Typography>
                      <Button 
                        size="small" 
                        onClick={handleClearFilters}
                        startIcon={<SearchIcon />}
                      >
                        清除筛选
                      </Button>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
          
          {/* 校友会列表 */}
          <Grid container spacing={3}>
            {filteredAssociations.length > 0 ? (
              filteredAssociations.map((association) => (
                <Grid item xs={12} sm={6} md={4} key={association.id}>
                  <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                          <LanguageIcon />
                        </Avatar>
                        <Typography variant="h6" component="div">
                          {association.name}
                        </Typography>
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {association.description}
                      </Typography>
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                          联系方式:
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <EmailIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
                          <Typography variant="body2">
                            {association.contact.email}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <PhoneIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
                          <Typography variant="body2">
                            {association.contact.phone}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {association.tags.map((tag) => (
                          <Chip 
                            key={tag} 
                            label={tag} 
                            size="small" 
                            variant="outlined"
                            onClick={() => handleTagClick(tag)}
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h6" color="text.secondary">
                    未找到匹配的校友会组织
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    请尝试其他搜索关键词或清除筛选条件
                  </Typography>
                  <Button 
                    variant="outlined" 
                    sx={{ mt: 2 }} 
                    onClick={handleClearFilters}
                  >
                    清除筛选
                  </Button>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Container>
      )}
      
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
    </main>
  );
} 