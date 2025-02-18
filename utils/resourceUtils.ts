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
  const cacheData: CacheData<T> = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(key, JSON.stringify(cacheData));
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
  } catch {
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

  return score;
}

// 智能排序
export function smartSort(data: any[], userPreferences: any): any[] {
  return [...data].sort((a, b) => {
    const scoreA = calculateMatchScore(a, userPreferences);
    const scoreB = calculateMatchScore(b, userPreferences);
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
  return {
    total: data.length,
    byIndustry: Object.entries(groupByIndustry(data)).map(([industry, items]) => ({
      industry,
      count: items.length,
      percentage: (items.length / data.length) * 100,
    })),
    byLocation: Object.entries(
      data.reduce((acc: { [key: string]: number }, item) => {
        acc[item.location] = (acc[item.location] || 0) + 1;
        return acc;
      }, {})
    ).map(([location, count]) => ({
      location,
      count,
      percentage: (count / data.length) * 100,
    })),
  };
}

export const CACHE_KEYS_EXPORT = CACHE_KEYS; 