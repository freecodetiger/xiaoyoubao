import { NextResponse } from 'next/server';

// 模拟用户数据
const mockUsers = [
  {
    id: '1',
    email: 'test@example.com',
    password: '123456',
    name: '测试用户',
    userType: 'alumni',
    graduationYear: '2020',
    major: '计算机科学',
  },
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 在实际应用中，这里应该进行密码加密比对
    const user = mockUsers.find(u => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json(
        { error: '邮箱或密码错误' },
        { status: 401 }
      );
    }

    // 在实际应用中，这里应该使用proper JWT签名
    const token = btoa(JSON.stringify({ userId: user.id, email: user.email }));

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: '登录过程中发生错误' },
      { status: 500 }
    );
  }
} 