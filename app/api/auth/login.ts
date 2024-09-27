import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { User } from '@/types/User';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const usersFilePath = path.join(process.cwd(), 'app/data/users.json');
  const users: User[] = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // 在实际应用中，这里应该生成一个 JWT token
  return NextResponse.json({ message: 'Login successful', user: { id: user.id, email: user.email, name: user.name } });
}
