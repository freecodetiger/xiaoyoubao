'use client';

import { useEffect, useState } from 'react';
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
  IconButton,
  Avatar,
  Pagination,
  Stack,
  Alert,
  Snackbar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import BusinessIcon from '@mui/icons-material/Business';
import GroupIcon from '@mui/icons-material/Group';
import FilterDialog from '@/components/FilterDialog';
import Navbar from '@/components/Navbar';
import { LoadingSection, LoadingOverlay } from '@/components/LoadingState';
import { useUrlState } from '@/hooks/useUrlState';
import { debounce } from 'lodash';
import {
  CACHE_KEYS_EXPORT as CACHE_KEYS,
  saveToCache,
  getFromCache,
  smartSort,
  generateStats,
} from '@/utils/resourceUtils';

// 模拟数据
const cooperationNeeds = [
  {
    id: 1,
    title: '寻找AI技术合作伙伴',
    company: '智能科技有限公司',
    description: '我们正在寻找在计算机视觉和自然语言处理领域有专长的合作伙伴，共同开发新一代AI产品。',
    tags: ['人工智能', '技术合作', '项目投资'],
    contact: '张经理 | zhang@example.com',
    location: '北京',
    companySize: 200,
    createdAt: '2024-02-18',
    projectStage: '成长期',
    cooperationMode: '线上合作',
    isVerified: true,
    hasSuccessCase: true,
  },
  {
    id: 2,
    title: '新能源项目投资机会',
    company: '绿色能源科技',
    description: '正在开发新型太阳能电池技术，寻找战略投资者，预计年回报率20%以上。',
    tags: ['新能源', '项目投资', '技术合作'],
    contact: '李总 | li@example.com',
    location: '上海',
    companySize: 500,
  },
];

const alumniResources = [
  {
    id: 1,
    title: '提供法律咨询服务',
    company: '合德律师事务所',
    description: '专注于知识产权保护、商业合同审查等法律服务，可为校友企业提供优惠的法律咨询。',
    tags: ['法律服务', '知识产权', '商业合同'],
    contact: '王律师 | wang@example.com',
    location: '广州',
    companySize: 100,
  },
  {
    id: 2,
    title: '金融投资顾问',
    company: '明智投资管理',
    description: '为创业企业提供投融资咨询、财务规划等服务，助力企业快速成长。',
    tags: ['金融服务', '投资咨询', '企业规划'],
    contact: '陈顾问 | chen@example.com',
    location: '深圳',
    companySize: 300,
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
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ResourcesPage() {
  // 使用URL状态同步的筛选条件
  const [activeFilters, setActiveFilters] = useUrlState({
    industry: [],
    type: [],
    location: [],
    companySize: [0, 1000],
    keyword: '',
    projectStage: [],
    cooperationMode: [],
    verifiedOnly: false,
    hasSuccessCase: false,
    timeRange: 'all',
    sortBy: 'latest',
  }, 'filters');

  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [filteredCooperationNeeds, setFilteredCooperationNeeds] = useState(cooperationNeeds);
  const [filteredAlumniResources, setFilteredAlumniResources] = useState(alumniResources);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);

  // 初始化数据和缓存
  useEffect(() => {
    const initializeData = async () => {
      try {
        setIsLoading(true);
        
        // 尝试从缓存获取数据
        const cachedNeeds = getFromCache(CACHE_KEYS.COOPERATION_NEEDS);
        const cachedResources = getFromCache(CACHE_KEYS.ALUMNI_RESOURCES);
        
        if (cachedNeeds && cachedResources) {
          setFilteredCooperationNeeds(cachedNeeds);
          setFilteredAlumniResources(cachedResources);
        } else {
          // 如果没有缓存，使用模拟数据（实际项目中这里会是API调用）
          setFilteredCooperationNeeds(cooperationNeeds);
          setFilteredAlumniResources(alumniResources);
          
          // 保存到缓存
          saveToCache(CACHE_KEYS.COOPERATION_NEEDS, cooperationNeeds);
          saveToCache(CACHE_KEYS.ALUMNI_RESOURCES, alumniResources);
        }

        // 生成统计数据
        const needsStats = generateStats(cooperationNeeds);
        const resourcesStats = generateStats(alumniResources);
        setStats({ needs: needsStats, resources: resourcesStats });

      } catch (err) {
        setError('数据加载失败，请稍后重试');
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // 优化的筛选函数
  const filterData = (data: any[], filters: any) => {
    return data.filter(item => {
      // 基础筛选条件
      const keywordMatch = !filters.keyword || 
        item.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        item.description.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        item.company.toLowerCase().includes(filters.keyword.toLowerCase());

      const industryMatch = filters.industry.length === 0 ||
        item.tags.some((tag: string) => filters.industry.includes(tag));

      const typeMatch = filters.type.length === 0 ||
        item.tags.some((tag: string) => filters.type.includes(tag));

      const locationMatch = filters.location.length === 0 ||
        filters.location.includes(item.location);

      const [minSize, maxSize] = filters.companySize;
      const sizeMatch = item.companySize >= minSize && item.companySize <= maxSize;

      // 新增筛选条件
      const projectStageMatch = filters.projectStage.length === 0 ||
        filters.projectStage.includes(item.projectStage);

      const cooperationModeMatch = filters.cooperationMode.length === 0 ||
        filters.cooperationMode.includes(item.cooperationMode);

      const verifiedMatch = !filters.verifiedOnly || item.isVerified;
      const successCaseMatch = !filters.hasSuccessCase || item.hasSuccessCase;

      // 时间范围筛选
      const date = new Date(item.createdAt);
      const now = new Date();
      let timeRangeMatch = true;
      if (filters.timeRange !== 'all') {
        const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
        switch (filters.timeRange) {
          case 'week':
            timeRangeMatch = diffDays <= 7;
            break;
          case 'month':
            timeRangeMatch = diffDays <= 30;
            break;
          case 'quarter':
            timeRangeMatch = diffDays <= 90;
            break;
        }
      }

      return keywordMatch && industryMatch && typeMatch && locationMatch && 
             sizeMatch && projectStageMatch && cooperationModeMatch && 
             verifiedMatch && successCaseMatch && timeRangeMatch;
    });
  };

  // 排序函数
  const sortData = (data: any[], sortBy: string) => {
    return [...data].sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'size_desc':
          return b.companySize - a.companySize;
        case 'size_asc':
          return a.companySize - b.companySize;
        case 'match':
          // 这里可以实现更复杂的匹配度计算逻辑
          return 0;
        default:
          return 0;
      }
    });
  };

  // 优化的搜索处理函数
  const handleSearch = debounce(() => {
    const newFilters = {
      ...activeFilters,
      keyword: searchQuery,
    };
    setActiveFilters(newFilters);
    applyFilters(newFilters);
  }, 300);

  // 处理筛选条件应用
  const handleFilterApply = (filters: any) => {
    setActiveFilters(filters);
    applyFilters(filters);
  };

  // 应用筛选和排序
  const applyFilters = (filters: any) => {
    try {
      setIsLoading(true);

      const filteredCoopNeeds = filterData(cooperationNeeds, filters);
      const filteredAlumRes = filterData(alumniResources, filters);
      
      // 根据排序方式选择排序方法
      let sortedCoopNeeds, sortedAlumRes;
      if (filters.sortBy === 'match') {
        sortedCoopNeeds = smartSort(filteredCoopNeeds, filters);
        sortedAlumRes = smartSort(filteredAlumRes, filters);
      } else {
        sortedCoopNeeds = sortData(filteredCoopNeeds, filters.sortBy);
        sortedAlumRes = sortData(filteredAlumRes, filters.sortBy);
      }

      setFilteredCooperationNeeds(sortedCoopNeeds);
      setFilteredAlumniResources(sortedAlumRes);
      setPage(1); // 重置页码
      
      // 更新统计数据
      const needsStats = generateStats(sortedCoopNeeds);
      const resourcesStats = generateStats(sortedAlumRes);
      setStats({ needs: needsStats, resources: resourcesStats });

    } catch (err) {
      setError('筛选过程中出现错误，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  // 获取当前页的数据
  const getCurrentPageData = (data: any[]) => {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  };

  // 处理页码变化
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // 处理回车键搜索
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const renderCard = (item: any) => (
    <Card key={item.id} sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h6" gutterBottom>
              {item.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {item.company}
            </Typography>
          </Box>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {tabValue === 0 ? <BusinessIcon /> : <GroupIcon />}
          </Avatar>
        </Box>
        <Typography variant="body1" paragraph>
          {item.description}
        </Typography>
        <Box sx={{ mb: 2 }}>
          {item.tags.map((tag: string) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{ mr: 1, mb: 1 }}
              variant="outlined"
            />
          ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {item.contact}
          </Typography>
          <Button variant="contained" size="small">
            联系对接
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Navbar />
      {isLoading && <LoadingOverlay />}
      
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          资源对接大厅
        </Typography>

        {stats && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              数据概览
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      行业分布 (Top 3)
                    </Typography>
                    {stats[tabValue === 0 ? 'needs' : 'resources'].byIndustry
                      .slice(0, 3)
                      .map((item: any) => (
                        <Box key={item.industry} sx={{ mb: 1 }}>
                          <Typography variant="body2">
                            {item.industry}: {item.percentage.toFixed(1)}%
                          </Typography>
                        </Box>
                      ))}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      地区分布 (Top 3)
                    </Typography>
                    {stats[tabValue === 0 ? 'needs' : 'resources'].byLocation
                      .slice(0, 3)
                      .map((item: any) => (
                        <Box key={item.location} sx={{ mb: 1 }}>
                          <Typography variant="body2">
                            {item.location}: {item.percentage.toFixed(1)}%
                          </Typography>
                        </Box>
                      ))}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
        
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                placeholder="搜索资源..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleSearch}>
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={() => setFilterDialogOpen(true)}
                color={Object.values(activeFilters).flat().filter(Boolean).length > 0 ? 'primary' : 'inherit'}
              >
                筛选条件 {Object.values(activeFilters).flat().filter(Boolean).length > 0 && `(${Object.values(activeFilters).flat().filter(Boolean).length})`}
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label={`合作需求 (${filteredCooperationNeeds.length})`} />
            <Tab label={`校友资源 (${filteredAlumniResources.length})`} />
          </Tabs>
        </Box>

        {isLoading ? (
          <LoadingSection />
        ) : (
          <>
            <TabPanel value={tabValue} index={0}>
              {filteredCooperationNeeds.length > 0 ? (
                <>
                  {getCurrentPageData(filteredCooperationNeeds).map(renderCard)}
                  <Stack spacing={2} alignItems="center" sx={{ mt: 4 }}>
                    <Pagination
                      count={Math.ceil(filteredCooperationNeeds.length / pageSize)}
                      page={page}
                      onChange={handlePageChange}
                      color="primary"
                    />
                  </Stack>
                </>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography color="text.secondary">
                    没有找到符合条件的合作需求
                  </Typography>
                </Box>
              )}
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              {filteredAlumniResources.length > 0 ? (
                <>
                  {getCurrentPageData(filteredAlumniResources).map(renderCard)}
                  <Stack spacing={2} alignItems="center" sx={{ mt: 4 }}>
                    <Pagination
                      count={Math.ceil(filteredAlumniResources.length / pageSize)}
                      page={page}
                      onChange={handlePageChange}
                      color="primary"
                    />
                  </Stack>
                </>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography color="text.secondary">
                    没有找到符合条件的校友资源
                  </Typography>
                </Box>
              )}
            </TabPanel>
          </>
        )}
      </Container>

      <FilterDialog
        open={filterDialogOpen}
        onClose={() => setFilterDialogOpen(false)}
        onApply={handleFilterApply}
      />
    </Box>
  );
} 