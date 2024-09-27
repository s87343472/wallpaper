import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../../models/User';

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  console.log('Received registration request');
  
  try {
    const body = await request.json();
    console.log('Request body:', body);

    const { email, password, name } = body;

    if (!email || !password || !name) {
      console.log('Missing required fields');
      return NextResponse.json({ error: '所有字段都是必填的' }, { status: 400 });
    }

    const usersFilePath = path.join(process.cwd(), 'app/data/users.json');
    console.log('Users file path:', usersFilePath);

    let users: User[] = [];

    try {
      if (fs.existsSync(usersFilePath)) {
        const fileContent = fs.readFileSync(usersFilePath, 'utf-8');
        console.log('File content:', fileContent);
        users = JSON.parse(fileContent);
        console.log('Parsed users:', users);
      } else {
        console.log('Users file does not exist, creating new file');
        fs.writeFileSync(usersFilePath, '[]');
      }
    } catch (error) {
      console.error('Error reading or parsing users file:', error);
      return NextResponse.json({ error: '读取用户数据时发生错误' }, { status: 500 });
    }

    if (users.some(user => user.email === email)) {
      console.log('Email already registered:', email);
      return NextResponse.json({ error: '该邮箱已被注册' }, { status: 400 });
    }

    const newUser: User = {
      id: uuidv4(),
      email,
      password,
      name
    };

    users.push(newUser);
    
    try {
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
      console.log('New user registered:', newUser);
    } catch (error) {
      console.error('Error writing to users file:', error);
      return NextResponse.json({ error: '保存用户数据时发生错误' }, { status: 500 });
    }

    return NextResponse.json({ message: '用户注册成功' }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: '注册过程中发生错误' }, { status: 500 });
  }
}
