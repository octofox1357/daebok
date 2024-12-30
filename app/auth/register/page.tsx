'use client'

import { useState } from 'react'
import Link from 'next/link'
import { registerAction } from '@/app/actions'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // 회원가입 제출
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget)
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      const response = await registerAction(formData)
      alert(response.message)
      router.push('/auth/login')
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message)
        setError(err.message || '회원가입 중 오류가 발생했습니다.')
      }
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
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">회중</label>
          <input
            type="text"
            name="congregation"
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
