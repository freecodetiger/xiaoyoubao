import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

// 模拟用户数据
const mockUsers = [
  {
    id: '1',
    email: 'test@example.com',
    name: '测试用户',
    userType: 'alumni',
    graduationYear: '2020',
    major: '计算机科学',
  },
];

export async function GET(request: Request) {
  try {
    const headersList = headers();
    const authorization = headersList.get('Authorization');

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: '未授权访问' },
        { status: 401 }
      );
    }

    const token = authorization.split(' ')[1];
    
    // 在实际应用中，这里应该验证JWT token
    const decodedToken = JSON.parse(atob(token));
    const user = mockUsers.find(u => u.id === decodedToken.userId);

    if (!user) {
      return NextResponse.json(
        { error: '用户不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Get user info error:', error);
    return NextResponse.json(
      { error: '获取用户信息失败' },
      { status: 500 }
    );
  }
} 