'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
  Typography,
  Slider,
  Divider,
} from '@mui/material';
import { useState } from 'react';

const industries = [
  'IT/互联网',
  '金融',
  '教育',
  '医疗健康',
  '制造业',
  '新能源',
  '人工智能',
  '电子商务',
];

const cooperationTypes = [
  '技术合作',
  '项目投资',
  '人才招聘',
  '资源共享',
  '市场合作',
  '品牌推广',
];

const locations = [
  '北京',
  '上海',
  '广州',
  '深圳',
  '杭州',
  '成都',
  '武汉',
  '南京',
];

// 新增排序选项
const sortOptions = [
  { value: 'latest', label: '最新发布' },
  { value: 'size_desc', label: '企业规模从大到小' },
  { value: 'size_asc', label: '企业规模从小到大' },
  { value: 'match', label: '匹配度' },
];

// 新增更多筛选条件
const projectStages = [
  '初创期',
  '成长期',
  '成熟期',
  'A轮融资',
  'B轮融资',
  'C轮及以上',
];

const cooperationModes = [
  '线上合作',
  '线下合作',
  '混合模式',
  '长期合作',
  '短期项目',
];

interface FilterDialogProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

export default function FilterDialog({ open, onClose, onApply }: FilterDialogProps) {
  const [filters, setFilters] = useState({
    industry: [],
    type: [],
    location: [],
    companySize: [0, 1000],
    projectStage: [],
    cooperationMode: [],
    keyword: '',
    sortBy: 'latest',
    verifiedOnly: false,
    hasSuccessCase: false,
    timeRange: 'all', // all, week, month, quarter
  });

  const handleChange = (field: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      industry: [],
      type: [],
      location: [],
      companySize: [0, 1000],
      projectStage: [],
      cooperationMode: [],
      keyword: '',
      sortBy: 'latest',
      verifiedOnly: false,
      hasSuccessCase: false,
      timeRange: 'all',
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          筛选条件
          <Button color="primary" onClick={handleReset}>重置</Button>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {/* 排序方式 */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>排序方式</InputLabel>
              <Select
                value={filters.sortBy}
                label="排序方式"
                onChange={(e) => handleChange('sortBy', e.target.value)}
              >
                {sortOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* 现有的筛选条件 */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="关键词搜索"
              value={filters.keyword}
              onChange={(e) => handleChange('keyword', e.target.value)}
              placeholder="输入关键词搜索"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography gutterBottom>行业领域</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {industries.map((industry) => (
                <Chip
                  key={industry}
                  label={industry}
                  onClick={() => {
                    const newIndustries = filters.industry.includes(industry)
                      ? filters.industry.filter((i) => i !== industry)
                      : [...filters.industry, industry];
                    handleChange('industry', newIndustries);
                  }}
                  color={filters.industry.includes(industry) ? 'primary' : 'default'}
                  variant={filters.industry.includes(industry) ? 'filled' : 'outlined'}
                />
              ))}
            </Box>
          </Grid>

          {/* 新增：项目阶段 */}
          <Grid item xs={12}>
            <Typography gutterBottom>项目阶段</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {projectStages.map((stage) => (
                <Chip
                  key={stage}
                  label={stage}
                  onClick={() => {
                    const newStages = filters.projectStage.includes(stage)
                      ? filters.projectStage.filter((s) => s !== stage)
                      : [...filters.projectStage, stage];
                    handleChange('projectStage', newStages);
                  }}
                  color={filters.projectStage.includes(stage) ? 'primary' : 'default'}
                  variant={filters.projectStage.includes(stage) ? 'filled' : 'outlined'}
                />
              ))}
            </Box>
          </Grid>

          {/* 新增：合作模式 */}
          <Grid item xs={12}>
            <Typography gutterBottom>合作模式</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {cooperationModes.map((mode) => (
                <Chip
                  key={mode}
                  label={mode}
                  onClick={() => {
                    const newModes = filters.cooperationMode.includes(mode)
                      ? filters.cooperationMode.filter((m) => m !== mode)
                      : [...filters.cooperationMode, mode];
                    handleChange('cooperationMode', newModes);
                  }}
                  color={filters.cooperationMode.includes(mode) ? 'primary' : 'default'}
                  variant={filters.cooperationMode.includes(mode) ? 'filled' : 'outlined'}
                />
              ))}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography gutterBottom>所在地区</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {locations.map((location) => (
                <Chip
                  key={location}
                  label={location}
                  onClick={() => {
                    const newLocations = filters.location.includes(location)
                      ? filters.location.filter((l) => l !== location)
                      : [...filters.location, location];
                    handleChange('location', newLocations);
                  }}
                  color={filters.location.includes(location) ? 'primary' : 'default'}
                  variant={filters.location.includes(location) ? 'filled' : 'outlined'}
                />
              ))}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography gutterBottom>企业规模</Typography>
            <Box sx={{ px: 2 }}>
              <Slider
                value={filters.companySize}
                onChange={(e, newValue) => handleChange('companySize', newValue)}
                valueLabelDisplay="auto"
                min={0}
                max={1000}
                step={100}
                marks={[
                  { value: 0, label: '0人' },
                  { value: 500, label: '500人' },
                  { value: 1000, label: '1000人+' },
                ]}
                valueLabelFormat={(value) => `${value}人`}
              />
            </Box>
          </Grid>

          {/* 新增：时间范围 */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>发布时间</InputLabel>
              <Select
                value={filters.timeRange}
                label="发布时间"
                onChange={(e) => handleChange('timeRange', e.target.value)}
              >
                <MenuItem value="all">全部时间</MenuItem>
                <MenuItem value="week">最近一周</MenuItem>
                <MenuItem value="month">最近一个月</MenuItem>
                <MenuItem value="quarter">最近三个月</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* 新增：其他选项 */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Chip
                label="仅显示已认证企业"
                onClick={() => handleChange('verifiedOnly', !filters.verifiedOnly)}
                color={filters.verifiedOnly ? 'primary' : 'default'}
                variant={filters.verifiedOnly ? 'filled' : 'outlined'}
              />
              <Chip
                label="有成功案例"
                onClick={() => handleChange('hasSuccessCase', !filters.hasSuccessCase)}
                color={filters.hasSuccessCase ? 'primary' : 'default'}
                variant={filters.hasSuccessCase ? 'filled' : 'outlined'}
              />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        <Button variant="contained" onClick={handleApply}>
          应用筛选
        </Button>
      </DialogActions>
    </Dialog>
  );
} 