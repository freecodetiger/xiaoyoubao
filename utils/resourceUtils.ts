'use client';

// 缓存键
const CACHE_KEYS = {
  COOPERATION_NEEDS: 'cooperation_needs_cache',
  ALUMNI_RESOURCES: 'alumni_resources_cache',
  FILTERS: 'filters_cache',
};

// 缓存有效期（24小时）
const CACHE_EXPIRY = 24 * 60 * 60 * 1000;

interface CacheData<T> {
  data: T;
  timestamp: number;
}

// 保存数据到缓存
export function saveToCache<T>(key: string, data: T) {
  try {
    const cacheData: CacheData<T> = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Error saving to cache:', error);
  }
}

// 从缓存获取数据
export function getFromCache<T>(key: string): T | null {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const { data, timestamp }: CacheData<T> = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_EXPIRY) {
      localStorage.removeItem(key);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error reading from cache:', error);
    return null;
  }
}

// 计算匹配度分数
export function calculateMatchScore(item: any, userPreferences: any): number {
  let score = 0;
  const weights = {
    industry: 0.3,
    location: 0.2,
    companySize: 0.1,
    projectStage: 0.2,
    cooperationMode: 0.2,
  };

  // 行业匹配
  if (userPreferences.industry.length > 0) {
    const industryMatch = item.tags.some((tag: string) => 
      userPreferences.industry.includes(tag)
    );
    if (industryMatch) score += weights.industry;
  } else {
    score += weights.industry;
  }

  // 地区匹配
  if (userPreferences.location.length > 0) {
    const locationMatch = userPreferences.location.includes(item.location);
    if (locationMatch) score += weights.location;
  } else {
    score += weights.location;
  }

  // 企业规模匹配
  const [minSize, maxSize] = userPreferences.companySize;
  if (item.companySize >= minSize && item.companySize <= maxSize) {
    score += weights.companySize;
  }

  // 项目阶段匹配
  if (userPreferences.projectStage.length > 0) {
    const stageMatch = userPreferences.projectStage.includes(item.projectStage);
    if (stageMatch) score += weights.projectStage;
  } else {
    score += weights.projectStage;
  }

  // 合作模式匹配
  if (userPreferences.cooperationMode.length > 0) {
    const modeMatch = userPreferences.cooperationMode.includes(item.cooperationMode);
    if (modeMatch) score += weights.cooperationMode;
  } else {
    score += weights.cooperationMode;
  }

  // 认证和成功案例加分
  if (item.isVerified) score += 0.1;
  if (item.hasSuccessCase) score += 0.1;

  return Math.min(score, 1); // 确保分数不超过1
}

// 智能排序
export function smartSort(data: any[], userPreferences: any): any[] {
  return [...data].sort((a, b) => {
    const scoreA = calculateMatchScore(a, userPreferences);
    const scoreB = calculateMatchScore(b, userPreferences);
    
    // 如果匹配度相同，按发布时间排序
    if (Math.abs(scoreB - scoreA) < 0.1) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    
    return scoreB - scoreA;
  });
}

// 数据分组
export function groupByIndustry(data: any[]): { [key: string]: any[] } {
  return data.reduce((groups: { [key: string]: any[] }, item) => {
    const industry = item.tags[0] || '其他';
    if (!groups[industry]) {
      groups[industry] = [];
    }
    groups[industry].push(item);
    return groups;
  }, {});
}

// 生成数据统计
export function generateStats(data: any[]) {
  const industryStats = Object.entries(groupByIndustry(data))
    .map(([industry, items]) => ({
      industry,
      count: items.length,
      percentage: (items.length / data.length) * 100,
    }))
    .sort((a, b) => b.count - a.count);

  const locationStats = Object.entries(
    data.reduce((acc: { [key: string]: number }, item) => {
      acc[item.location] = (acc[item.location] || 0) + 1;
      return acc;
    }, {})
  )
    .map(([location, count]) => ({
      location,
      count,
      percentage: (count / data.length) * 100,
    }))
    .sort((a, b) => b.count - a.count);

  const companySizeStats = {
    small: data.filter(item => item.companySize < 100).length,
    medium: data.filter(item => item.companySize >= 100 && item.companySize < 500).length,
    large: data.filter(item => item.companySize >= 500).length,
  };

  const verificationStats = {
    verified: data.filter(item => item.isVerified).length,
    hasSuccessCase: data.filter(item => item.hasSuccessCase).length,
  };

  return {
    total: data.length,
    byIndustry: industryStats,
    byLocation: locationStats,
    byCompanySize: companySizeStats,
    verification: verificationStats,
  };
}

// 日期格式化
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    const hours = Math.floor(diffTime / (1000 * 60 * 60));
    if (hours === 0) {
      const minutes = Math.floor(diffTime / (1000 * 60));
      return `${minutes} 分钟前`;
    }
    return `${hours} 小时前`;
  } else if (diffDays < 7) {
    return `${diffDays} 天前`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} 周前`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} 个月前`;
  }

  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export const CACHE_KEYS_EXPORT = CACHE_KEYS; 