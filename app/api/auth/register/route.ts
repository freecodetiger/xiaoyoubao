import { NextResponse } from 'next/server';

// 模拟用户数据存储
let users = [
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
    const { email, password, name, userType, graduationYear, major } = body;

    // 检查邮箱是否已被注册
    if (users.some(u => u.email === email)) {
      return NextResponse.json(
        { error: '该邮箱已被注册' },
        { status: 400 }
      );
    }

    // 创建新用户
    const newUser = {
      id: String(users.length + 1),
      email,
      password, // 在实际应用中，这里应该对密码进行加密
      name,
      userType,
      graduationYear,
      major,
    };

    users.push(newUser);

    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({
      message: '注册成功',
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: '注册过程中发生错误' },
      { status: 500 }
    );
  }
} 