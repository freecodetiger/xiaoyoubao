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

    console.log('Auth header:', authorization);

    if (!authorization || !authorization.startsWith('Bearer ')) {
      console.log('No valid auth token found');
      return new NextResponse(
        JSON.stringify({ error: '未授权访问' }),
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const token = authorization.split(' ')[1];
    console.log('Token:', token);
    
    try {
      // 在实际应用中，这里应该验证JWT token
      const decodedToken = JSON.parse(atob(token));
      console.log('Decoded token:', decodedToken);
      
      const user = mockUsers.find(u => u.id === decodedToken.userId);
      console.log('Found user:', user);

      if (!user) {
        console.log('User not found');
        return new NextResponse(
          JSON.stringify({ error: '用户不存在' }),
          { 
            status: 404,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      return new NextResponse(
        JSON.stringify({ user }),
        { 
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    } catch (error) {
      console.error('Token parsing error:', error);
      return new NextResponse(
        JSON.stringify({ error: '无效的token' }),
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  } catch (error) {
    console.error('Get user info error:', error);
    return new NextResponse(
      JSON.stringify({ error: '获取用户信息失败' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
} 