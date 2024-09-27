'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      const responseText = await response.text();
      console.log('Response text:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        setError('服务器返回了无效的响应。');
        return;
      }

      console.log('Registration response:', data);

      if (response.ok) {
        // 注册成功后直接登录
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });

        if (result?.error) {
          console.error('Login error after registration:', result.error);
          setError('注册成功，但无法自动登录。');
        } else {
          router.push('/');
        }
      } else {
        setError(data.error || '注册过程中发生错误。');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('注册过程中发生错误。请稍后再试。');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-2">姓名</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value.slice(0, 100))}
          required
          maxLength={100}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="email" className="block mb-2">邮箱</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value.slice(0, 100))}
          required
          maxLength={100}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-2">密码</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value.slice(0, 100))}
          required
          maxLength={100}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        注册
      </button>
    </form>
  );
}


function setError(arg0: string) {
    throw new Error('Function not implemented.');
}

function validatePassword(password: string) {
    throw new Error('Function not implemented.');
}

