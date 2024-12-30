'use client'

import { useState } from 'react'
import Link from 'next/link'
import { loginAction } from '@/app/actions'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget)
    e.preventDefault()
    setError('')

    try {
      const res = await loginAction(formData)
      alert(res.message)
      router.push('/user')
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">ID</label>
          <input
            type="text"
            name="id"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            name="password"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>

      <div className="text-center mt-4">
        아직 계정이 없으신가요?{' '}
        <Link href="/auth/register" className="text-blue-500 hover:underline">
          회원가입
        </Link>
      </div>
    </div>
  )
}
