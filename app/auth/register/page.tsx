'use client'

import { useState } from 'react'
// 이미 로그인한 유저를 위한 안내 링크 (예: 로그인 페이지로 이동)
import Link from 'next/link'

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    name: '',
    phone: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // 폼 입력값 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // 회원가입 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // 필요한 입력값이 제대로 들어있나 체크 (프론트에서 1차 확인)
    if (
      !form.username ||
      !form.password ||
      !form.confirmPassword ||
      !form.email
    ) {
      setError('필수 입력 항목을 모두 입력해주세요.')
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }

    try {
      // 회원가입 API 호출
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (res.ok) {
        setSuccess('회원가입이 완료되었습니다!')
        // 가입 완료 후 폼 초기화
        setForm({
          username: '',
          password: '',
          confirmPassword: '',
          email: '',
          name: '',
          phone: '',
        })
      } else {
        setError(data.error || '회원가입 중 오류가 발생했습니다.')
      }
    } catch (err) {
      setError('서버와 통신 중 오류가 발생했습니다.')
    }
  }

  return (
    <div className='max-w-md mx-auto mt-10'>
      <h1 className='text-2xl font-bold mb-4'>회원가입</h1>
      {error && <p className='text-red-500 mb-4'>{error}</p>}
      {success && <p className='text-green-500 mb-4'>{success}</p>}

      <form onSubmit={handleSubmit}>
        {/* ID(username) */}
        <div className='mb-4'>
          <label className='block mb-2 font-semibold'>아이디</label>
          <input
            type='text'
            name='username'
            value={form.username}
            onChange={handleChange}
            className='w-full p-2 border rounded'
            required
          />
        </div>

        {/* 비밀번호 */}
        <div className='mb-4'>
          <label className='block mb-2 font-semibold'>비밀번호</label>
          <input
            type='password'
            name='password'
            value={form.password}
            onChange={handleChange}
            className='w-full p-2 border rounded'
            required
          />
        </div>

        {/* 비밀번호 확인 */}
        <div className='mb-4'>
          <label className='block mb-2 font-semibold'>비밀번호 확인</label>
          <input
            type='password'
            name='confirmPassword'
            value={form.confirmPassword}
            onChange={handleChange}
            className='w-full p-2 border rounded'
            required
          />
        </div>

        {/* 이메일 */}
        <div className='mb-4'>
          <label className='block mb-2 font-semibold'>이메일</label>
          <input
            type='email'
            name='email'
            value={form.email}
            onChange={handleChange}
            className='w-full p-2 border rounded'
            placeholder='example@domain.com'
            required
          />
        </div>

        {/* 이름 */}
        <div className='mb-4'>
          <label className='block mb-2 font-semibold'>이름</label>
          <input
            type='text'
            name='name'
            value={form.name}
            onChange={handleChange}
            className='w-full p-2 border rounded'
          />
        </div>

        {/* 전화번호 */}
        <div className='mb-4'>
          <label className='block mb-2 font-semibold'>전화번호</label>
          <input
            type='text'
            name='phone'
            value={form.phone}
            onChange={handleChange}
            className='w-full p-2 border rounded'
            placeholder='010-XXXX-XXXX'
          />
        </div>

        <button
          type='submit'
          className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'
        >
          회원가입
        </button>
      </form>

      {/* 로그인 이동 링크 */}
      <div className='text-center mt-4'>
        이미 계정이 있으신가요?{' '}
        <Link
          href='/auth/login'
          className='text-blue-500 hover:underline'
        >
          로그인
        </Link>
      </div>
    </div>
  )
}
