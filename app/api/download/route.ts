import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let filename = searchParams.get('file');

  console.log('Requested filename:', filename);

  if (!filename) {
    console.log('No filename provided');
    return NextResponse.json({ error: 'No filename provided' }, { status: 400 });
  }

  // 移除路径中的 '/wallpapers/' 前缀（如果存在）
  filename = filename.replace(/^\/wallpapers\//, '');

  const filePath = path.join(process.cwd(), 'public', 'wallpapers', filename);

  console.log('Attempting to access file:', filePath);

  if (!fs.existsSync(filePath)) {
    console.log('File not found:', filePath);
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  console.log('File found, preparing download');

  const fileBuffer = fs.readFileSync(filePath);
  
  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Disposition': `attachment; filename=${filename}`,
      'Content-Type': 'image/jpeg', // 根据实际文件类型调整
    },
  });
}
