'use client'

import { useState } from 'react'

export default function RegisterPage() {
  const [form, setForm] = useState({
    id: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const data = await res.json()

    if (res.ok) {
      setSuccess('User registered successfully!')
      setForm({ id: '', password: '', confirmPassword: '' })
    } else {
      setError(data.error || 'An error occurred')
    }
  }

  return (
    <div className='max-w-md mx-auto mt-10'>
      <h1 className='text-2xl font-bold mb-4'>Register</h1>
      {error && <p className='text-red-500 mb-4'>{error}</p>}
      {success && <p className='text-green-500 mb-4'>{success}</p>}
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
        <div className='mb-4'>
          <label className='block mb-2'>Confirm Password</label>
          <input
            type='password'
            name='confirmPassword'
            value={form.confirmPassword}
            onChange={handleChange}
            className='w-full p-2 border rounded'
            required
          />
        </div>
        <button
          type='submit'
          className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'
        >
          Register
        </button>
      </form>
    </div>
  )
}
