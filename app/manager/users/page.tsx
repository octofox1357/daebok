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
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [filter, setFilter] = useState({ username: '', role: '' })
  const [roleChanges, setRoleChanges] = useState<
    { id: number; role: string }[]
  >([])

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [filter, users])

  // 유저 데이터 가져오기
  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users') // API 엔드포인트
      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }
      const data: User[] = await response.json()
      setUsers(data)
      setFilteredUsers(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching users:', error)
      setError('Failed to load users')
      setLoading(false)
    }
  }

  // 필터 적용
  const applyFilters = () => {
    const { username, role } = filter
    let filtered = users

    if (username) {
      filtered = filtered.filter((user) =>
        user.username.toLowerCase().includes(username.toLowerCase())
      )
    }

    if (role) {
      filtered = filtered.filter((user) => user.role === role)
    }

    setFilteredUsers(filtered)
  }

  // 필터 핸들러
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFilter((prev) => ({ ...prev, [name]: value }))
  }

  // 권한 변경 핸들러
  const handleRoleChange = (id: number, newRole: string) => {
    setRoleChanges((prevChanges) => {
      const existingChange = prevChanges.find((change) => change.id === id)
      if (existingChange) {
        return prevChanges.map((change) =>
          change.id === id ? { ...change, role: newRole } : change
        )
      } else {
        return [...prevChanges, { id, role: newRole }]
      }
    })
    setFilteredUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, role: newRole } : user
      )
    )
  }

  // 변경 사항 저장
  const saveChanges = async () => {
    try {
      for (const change of roleChanges) {
        const response = await fetch(`/api/users/${change.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ role: change.role })
        })
        if (!response.ok) {
          throw new Error(`Failed to update role for user ID ${change.id}`)
        }
      }
      alert('변경 사항이 저장되었습니다.')
      setRoleChanges([])
    } catch (error) {
      console.error('Error saving changes:', error)
      alert('변경 사항 저장 중 오류가 발생했습니다.')
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
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">유저 관리</h1>

      {/* 필터링 섹션 */}
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          name="username"
          value={filter.username}
          onChange={handleFilterChange}
          placeholder="유저명 검색"
          className="p-2 border rounded w-1/3"
        />
        <select
          name="role"
          value={filter.role}
          onChange={handleFilterChange}
          className="p-2 border rounded w-1/3"
        >
          <option value="">모든 권한</option>
          <option value="user">User</option>
          <option value="manager">Manager</option>
        </select>
      </div>

      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">유저명</th>
            <th className="border border-gray-300 px-4 py-2">권한</th>
            <th className="border border-gray-300 px-4 py-2">생성일</th>
            <th className="border border-gray-300 px-4 py-2">작업</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 text-center">
                {index + 1}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {user.username}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  className="w-full p-1 border rounded"
                >
                  <option value="user">User</option>
                  <option value="manager">Manager</option>
                </select>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => alert(`Edit user ${user.id}`)}
                  className="mr-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                >
                  편집
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 저장 버튼 */}
      {roleChanges.length > 0 && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={saveChanges}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            변경 사항 저장
          </button>
        </div>
      )}
    </div>
  )
}
