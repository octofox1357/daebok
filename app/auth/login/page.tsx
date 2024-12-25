'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [form, setForm] = useState({ id: '', password: '' })
  const [error, setError] = useState('')
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const data = await res.json()

    if (res.ok) {
      // JWT를 localStorage에 저장
      localStorage.setItem('token', data.token)
      // 로그인 성공 시 '/user/outing' 페이지로 이동
      router.push('/user')
    } else {
      setError(data.error || 'An error occurred')
    }
  }

  return (
    <div className='max-w-md mx-auto mt-10'>
      <h1 className='text-2xl font-bold mb-4'>Login</h1>
      {error && <p className='text-red-500 mb-4'>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block mb-2'>ID</label>
          <input
            type='text'
            name='id'
            value={form.id}
            onChange={handleChange}
            className='w-full p-2 border rounded'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>Password</label>
          <input
            type='password'
            name='password'
            value={form.password}
            onChange={handleChange}
            className='w-full p-2 border rounded'
            required
          />
        </div>
        <button
          type='submit'
          className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'
        >
          Login
        </button>
      </form>

      <div className='text-center mt-4'>
        아직 계정이 없으신가요?{' '}
        <Link
          href='/auth/register'
          className='text-blue-500 hover:underline'
        >
          회원가입
        </Link>
      </div>
    </div>
  )
}
