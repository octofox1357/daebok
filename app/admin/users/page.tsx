'use client'

import React, { useState, useEffect } from 'react'

type User = {
  id: number
  username: string
  email: string
  role: string
  createdAt: string
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    fetchUsers()
  }, [])

  // 유저 데이터 가져오기
  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users') // API 엔드포인트
      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }
      const data: User[] = await response.json()
      setUsers(data)
      setLoading(false)
    } catch (error) {
      console.error('Error deleting user:', error)
      setError('Failed to load users')
      setLoading(false)
    }
  }

  // 유저 삭제
  const handleDelete = async (id: number) => {
    if (confirm('정말로 이 유저를 삭제하시겠습니까?')) {
      try {
        const response = await fetch(`/api/users/${id}`, { method: 'DELETE' })
        if (!response.ok) {
          throw new Error('Failed to delete user')
        }
        setUsers(users.filter((user) => user.id !== id))
        alert('유저가 성공적으로 삭제되었습니다.')
      } catch (error) {
        console.error('Error deleting user:', error)
        alert('유저 삭제 중 오류가 발생했습니다.')
      }
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p className='text-red-500'>{error}</p>

  return (
    <div className='max-w-6xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>유저 관리</h1>

      <table className='min-w-full table-auto border-collapse border border-gray-300'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='border border-gray-300 px-4 py-2'>#</th>
            <th className='border border-gray-300 px-4 py-2'>유저명</th>
            <th className='border border-gray-300 px-4 py-2'>이메일</th>
            <th className='border border-gray-300 px-4 py-2'>권한</th>
            <th className='border border-gray-300 px-4 py-2'>생성일</th>
            <th className='border border-gray-300 px-4 py-2'>작업</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              className='hover:bg-gray-50'
            >
              <td className='border border-gray-300 px-4 py-2 text-center'>
                {index + 1}
              </td>
              <td className='border border-gray-300 px-4 py-2'>
                {user.username}
              </td>
              <td className='border border-gray-300 px-4 py-2'>{user.email}</td>
              <td className='border border-gray-300 px-4 py-2'>{user.role}</td>
              <td className='border border-gray-300 px-4 py-2'>
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className='border border-gray-300 px-4 py-2 text-center'>
                <button
                  onClick={() => alert(`Edit user ${user.id}`)}
                  className='mr-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600'
                >
                  편집
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className='bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600'
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
