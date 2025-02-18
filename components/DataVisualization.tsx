'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  Grid,
} from '@mui/material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from 'react-spring';

// 模拟数据
const activityData = [
  { month: '1月', value: 65 },
  { month: '2月', value: 59 },
  { month: '3月', value: 80 },
  { month: '4月', value: 81 },
  { month: '5月', value: 56 },
  { month: '6月', value: 55 },
];

const industryData = [
  { name: '互联网', value: 400 },
  { name: '金融', value: 300 },
  { name: '教育', value: 200 },
  { name: '医疗', value: 100 },
];

const skillsData = [
  { name: 'React', count: 120 },
  { name: 'Java', count: 98 },
  { name: 'Python', count: 86 },
  { name: 'Node.js', count: 75 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const MotionCard = motion(Card);

export default function DataVisualization() {
  const theme = useTheme();
  const [hoveredPie, setHoveredPie] = useState<number | null>(null);
  
  // 使用 react-spring 创建数字动画
  const { number } = useSpring({
    from: { number: 0 },
    number: 1234,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <Box sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* 活跃度趋势图 */}
        <Grid item xs={12} md={8}>
          <MotionCard
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                校友活跃度趋势
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={activityData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={theme.palette.primary.main}
                      fillOpacity={1}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </MotionCard>
        </Grid>

        {/* 行业分布饼图 */}
        <Grid item xs={12} md={4}>
          <MotionCard
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                行业分布
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={industryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      onMouseEnter={(_, index) => setHoveredPie(index)}
                      onMouseLeave={() => setHoveredPie(null)}
                    >
                      {industryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          style={{
                            filter: hoveredPie === index ? 'brightness(1.1)' : 'none',
                            transform: hoveredPie === index ? 'scale(1.05)' : 'none',
                            transition: 'all 0.3s',
                          }}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </MotionCard>
        </Grid>

        {/* 技能分布柱状图 */}
        <Grid item xs={12}>
          <MotionCard
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                热门技能分布
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={skillsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="count"
                      fill={theme.palette.primary.main}
                      radius={[4, 4, 0, 0]}
                    >
                      {skillsData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </MotionCard>
        </Grid>

        {/* 动画数字统计 */}
        <Grid item xs={12}>
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              py: 4,
            }}
          >
            <Typography variant="h3" component={animated.div}>
              {number.to(n => Math.floor(n).toLocaleString())}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ ml: 2 }}>
              位校友加入平台
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
} 