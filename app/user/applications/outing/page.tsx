'use client'
import React, { useState, useEffect } from 'react'
import ApplicationRow from './applicationRow'
import { Application } from '../types'

// 상수
const ITEMS_PER_PAGE = 10

// 페이지네이션 버튼 컴포넌트
const Pagination = ({
  totalPages,
  currentPage,
  onPageChange
}: {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
}) => {
  return (
    <nav>
      <ul className="flex space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index}>
            <button
              onClick={() => onPageChange(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function OutingApplication() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(applications.length / ITEMS_PER_PAGE)
  const currentData = applications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const res = await fetch('/api/applications?applicationType=외출')
      if (!res.ok) {
        throw new Error('Failed to fetch applications')
      }
      const data = await res.json()
      setApplications(data.applications)
    } catch (err) {
      console.error('Fetch Error:', err)
      setError('외출 신청 데이터를 불러오는 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (loading) return <p className="p-4">Loading...</p>
  if (error) return <p className="p-4 text-red-500">{error}</p>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">외출 신청 목록</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">제목</th>
              <th className="border border-gray-200 px-4 py-2">종류</th>
              <th className="border border-gray-200 px-4 py-2">마감일</th>
              <th className="border border-gray-200 px-4 py-2">상태</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((app) => (
              <ApplicationRow key={app.id} application={app} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}
