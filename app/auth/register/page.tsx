'use client'

import { useState } from 'react'
import Link from 'next/link'
import { registerUser } from './action' // 서버 액션 import

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    congregation: ''
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

    // 클라이언트 측 유효성 검사
    if (!form.username || !form.password || !form.confirmPassword) {
      setError('필수 입력 항목을 모두 입력해주세요.')
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }

    try {
      // 서버 액션 호출
      const response = await registerUser(form)
      setSuccess(response.message)
      setForm({
        username: '',
        password: '',
        confirmPassword: '',
        name: '',
        congregation: ''
      })
    } catch (err) {
      setError(err.message || '회원가입 중 오류가 발생했습니다.')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">회원가입</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        {/* ID(username) */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">아이디</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* 비밀번호 */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">비밀번호</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* 비밀번호 확인 */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">비밀번호 확인</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">회중</label>
          <input
            type="text"
            name="congregation"
            value={form.congregation}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="회중"
          />
        </div>

        {/* 이름 */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">이름</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          회원가입
        </button>
      </form>

      {/* 로그인 이동 링크 */}
      <div className="text-center mt-4">
        이미 계정이 있으신가요?{' '}
        <Link href="/auth/login" className="text-blue-500 hover:underline">
          로그인
        </Link>
      </div>
    </div>
  )
}
