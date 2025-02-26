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
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Paper,
} from '@mui/material';
import Navbar from '@/components/Navbar';
import AddIcon from '@mui/icons-material/Add';

// 职位类型选项
const jobTypes = [
  '技术研发',
  '产品运营',
  '市场营销',
  '销售',
  '人力资源',
  '财务',
  '行政',
  '其他',
];

// 工作经验要求
const experienceLevels = [
  '应届生',
  '1-3年',
  '3-5年',
  '5-10年',
  '10年以上',
];

// 学历要求
const educationLevels = [
  '大专',
  '本科',
  '硕士',
  '博士',
];

// 发布流程步骤
const steps = [
  '填写基本信息',
  '设置要求与福利',
  '确认发布',
];

export default function RecruitmentPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [jobInfo, setJobInfo] = useState({
    title: '',
    type: '',
    experience: '',
    education: '',
    salary: '',
    description: '',
    requirements: '',
    benefits: '',
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setJobInfo({
      ...jobInfo,
      [field]: event.target.value,
    });
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="职位名称"
                value={jobInfo.title}
                onChange={handleInputChange('title')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="职位类型"
                value={jobInfo.type}
                onChange={handleInputChange('type')}
                required
              >
                {jobTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="薪资范围"
                value={jobInfo.salary}
                onChange={handleInputChange('salary')}
                placeholder="例如：15k-25k"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="职位描述"
                value={jobInfo.description}
                onChange={handleInputChange('description')}
                required
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="工作经验"
                value={jobInfo.experience}
                onChange={handleInputChange('experience')}
                required
              >
                {experienceLevels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="学历要求"
                value={jobInfo.education}
                onChange={handleInputChange('education')}
                required
              >
                {educationLevels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="任职要求"
                value={jobInfo.requirements}
                onChange={handleInputChange('requirements')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="职位福利"
                value={jobInfo.benefits}
                onChange={handleInputChange('benefits')}
                placeholder="例如：五险一金、年终奖、带薪休假等"
                required
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              请确认以下信息
            </Typography>
            <Paper sx={{ p: 3, mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>职位名称：</strong> {jobInfo.title}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>职位类型：</strong> {jobInfo.type}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>薪资范围：</strong> {jobInfo.salary}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>职位描述：</strong>
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {jobInfo.description}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>工作经验：</strong> {jobInfo.experience}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>学历要求：</strong> {jobInfo.education}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>任职要求：</strong>
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {jobInfo.requirements}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>职位福利：</strong>
                  </Typography>
                  <Typography variant="body2">
                    {jobInfo.benefits}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        );
      default:
        return null;
    }
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
          <Typography variant="h4" component="h1" gutterBottom>
            发布招聘
          </Typography>
          <Typography variant="subtitle1">
            快速发布招聘信息，连接优质校友人才
          </Typography>
        </Container>
      </Box>

      {/* 主要内容区域 */}
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Card>
          <CardContent>
            <Stepper activeStep={activeStep} sx={{ py: 3 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Box sx={{ mt: 4 }}>
              {renderStepContent(activeStep)}
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mr: 1 }}>
                    上一步
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={activeStep === steps.length - 1 ? () => {} : handleNext}
                >
                  {activeStep === steps.length - 1 ? '发布' : '下一步'}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* 已发布的职位列表 */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            已发布的职位
          </Typography>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            sx={{ mb: 2 }}
          >
            发布新职位
          </Button>
          <Grid container spacing={2}>
            {/* 这里可以添加已发布职位的列表 */}
          </Grid>
        </Box>
      </Container>
    </main>
  );
} 