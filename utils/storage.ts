'use client';

const STORAGE_PREFIX = 'alumni_platform_';

interface StorageData<T> {
  data: T;
  timestamp: number;
  version: string;
}

export class Storage {
  static version = '1.0.0';
  static expiryTime = 24 * 60 * 60 * 1000; // 24小时

  static setItem<T>(key: string, data: T): void {
    try {
      const storageData: StorageData<T> = {
        data,
        timestamp: Date.now(),
        version: this.version,
      };
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(storageData));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  static getItem<T>(key: string): T | null {
    try {
      const value = localStorage.getItem(STORAGE_PREFIX + key);
      if (!value) return null;

      const storageData: StorageData<T> = JSON.parse(value);
      
      // 检查版本
      if (storageData.version !== this.version) {
        this.removeItem(key);
        return null;
      }

      // 检查是否过期
      if (Date.now() - storageData.timestamp > this.expiryTime) {
        this.removeItem(key);
        return null;
      }

      return storageData.data;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }

  static removeItem(key: string): void {
    try {
      localStorage.removeItem(STORAGE_PREFIX + key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }

  static clear(): void {
    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(STORAGE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  // 批量存储
  static setItems(items: Record<string, any>): void {
    Object.entries(items).forEach(([key, value]) => {
      this.setItem(key, value);
    });
  }

  // 批量获取
  static getItems(keys: string[]): Record<string, any> {
    return keys.reduce((acc, key) => {
      acc[key] = this.getItem(key);
      return acc;
    }, {} as Record<string, any>);
  }

  // 检查存储空间是否可用
  static isAvailable(): boolean {
    try {
      const testKey = STORAGE_PREFIX + 'test';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  // 获取存储使用情况
  static getStorageInfo(): { used: number; total: number; percentage: number } {
    try {
      let used = 0;
      Object.entries(localStorage).forEach(([key, value]) => {
        if (key.startsWith(STORAGE_PREFIX)) {
          used += (key.length + (value?.length || 0)) * 2; // 估算字节数
        }
      });

      const total = 5 * 1024 * 1024; // 假设总容量为5MB
      return {
        used,
        total,
        percentage: (used / total) * 100,
      };
    } catch (error) {
      console.error('Error getting storage info:', error);
      return { used: 0, total: 0, percentage: 0 };
    }
  }
} 