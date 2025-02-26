'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Tab,
  Tabs,
  Button,
  ButtonGroup,
} from '@mui/material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { motion } from 'framer-motion';

// 模拟数据 - 合作趋势
const cooperationTrends = [
  { month: '1月', count: 5 },
  { month: '2月', count: 8 },
  { month: '3月', count: 12 },
  { month: '4月', count: 15 },
  { month: '5月', count: 20 },
  { month: '6月', count: 25 },
];

// 模拟数据 - 合作类型分布
const cooperationTypes = [
  { name: '技术合作', value: 35 },
  { name: '人才招聘', value: 25 },
  { name: '项目投资', value: 20 },
  { name: '资源共享', value: 15 },
  { name: '其他', value: 5 },
];

// 模拟数据 - 行业分布
const industryDistribution = [
  { industry: 'IT/互联网', count: 30 },
  { industry: '金融', count: 25 },
  { industry: '教育', count: 20 },
  { industry: '医疗健康', count: 15 },
  { industry: '制造业', count: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const MotionCard = motion(Card);

export default function DataAnalysis() {
  const [timeRange, setTimeRange] = useState('month');
  const [chartType, setChartType] = useState(0);

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
  };

  const handleChartTypeChange = (event: React.SyntheticEvent, newValue: number) => {
    setChartType(newValue);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {/* 数据概览卡片 */}
        <Grid item xs={12} md={4}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                总合作项目
              </Typography>
              <Typography variant="h3" color="primary">
                85
              </Typography>
              <Typography variant="body2" color="text.secondary">
                较上月增长 15%
              </Typography>
            </CardContent>
          </MotionCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                活跃企业数
              </Typography>
              <Typography variant="h3" color="primary">
                42
              </Typography>
              <Typography variant="body2" color="text.secondary">
                较上月增长 8%
              </Typography>
            </CardContent>
          </MotionCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                本月新增合作
              </Typography>
              <Typography variant="h3" color="primary">
                25
              </Typography>
              <Typography variant="body2" color="text.secondary">
                较上月增长 20%
              </Typography>
            </CardContent>
          </MotionCard>
        </Grid>

        {/* 图表区域 */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                <Tabs value={chartType} onChange={handleChartTypeChange}>
                  <Tab label="合作趋势" />
                  <Tab label="合作类型分布" />
                  <Tab label="行业分布" />
                </Tabs>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <ButtonGroup size="small">
                  <Button
                    variant={timeRange === 'month' ? 'contained' : 'outlined'}
                    onClick={() => handleTimeRangeChange('month')}
                  >
                    月度
                  </Button>
                  <Button
                    variant={timeRange === 'quarter' ? 'contained' : 'outlined'}
                    onClick={() => handleTimeRangeChange('quarter')}
                  >
                    季度
                  </Button>
                  <Button
                    variant={timeRange === 'year' ? 'contained' : 'outlined'}
                    onClick={() => handleTimeRangeChange('year')}
                  >
                    年度
                  </Button>
                </ButtonGroup>
              </Box>

              <Box sx={{ height: 400 }}>
                {chartType === 0 && (
                  <ResponsiveContainer>
                    <LineChart data={cooperationTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="count"
                        name="合作项目数"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}

                {chartType === 1 && (
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={cooperationTypes}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {cooperationTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                )}

                {chartType === 2 && (
                  <ResponsiveContainer>
                    <BarChart data={industryDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="industry" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" name="企业数量" fill="#8884d8">
                        {industryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
} 