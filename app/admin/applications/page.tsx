'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation' // Next.js Router 사용

type Application = {
  id: number
  applicationTitle: string
  applicationType: string
  rangeStartDate: string
  rangeEndDate: string
  startDate?: string | null
  endDate?: string | null
  applicationLimit?: string | null
  applicationApprove?: boolean | null
  createdAt: string
  updatedAt: string
}

type Pagination = {
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export default function AdminApplications() {
  const [applications, setApplications] = useState<Application[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)
  const itemsPerPage = 10
  const router = useRouter() // Next.js Router

  useEffect(() => {
    fetchApplications()
  }, [currentPage])

  const fetchApplications = async () => {
    try {
      const response = await fetch(
        `/api/applications?page=${currentPage}&pageSize=${itemsPerPage}`
      )
      if (!response.ok) {
        throw new Error('Failed to fetch applications')
      }
      const data: { applications: Application[]; pagination: Pagination } =
        await response.json()
      setApplications(data.applications)
      setTotalPages(data.pagination.totalPages)
    } catch (error) {
      console.error('Error fetching applications:', error)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleEdit = (id: number) => {
    alert(`편집 페이지로 이동: 신청 ID ${id}`)
  }

  const navigateToNew = () => {
    router.push('/admin/applications/new') // 새 페이지로 이동
  }

  return (
    <div className='max-w-6xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>접수관리</h1>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-lg font-semibold'>접수목록</h2>
        <button
          onClick={navigateToNew}
          className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'
        >
          + 접수생성
        </button>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full table-auto border-collapse border border-gray-200'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='border border-gray-300 px-4 py-2'>제목</th>
              <th className='border border-gray-300 px-4 py-2'>종류</th>
              <th className='border border-gray-300 px-4 py-2'>시작일</th>
              <th className='border border-gray-300 px-4 py-2'>마감일</th>
              <th className='border border-gray-300 px-4 py-2'>제어</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr
                key={application.id}
                className='hover:bg-gray-50'
              >
                <td className='border border-gray-300 px-4 py-2'>
                  {application.applicationTitle}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {application.applicationType}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {new Date(application.rangeStartDate).toLocaleDateString()}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {new Date(application.rangeEndDate).toLocaleDateString()}
                </td>
                <td className='border border-gray-300 px-4 py-2 text-center'>
                  <button
                    onClick={() => handleEdit(application.id)}
                    className='bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500'
                  >
                    편집
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div className='flex justify-center mt-6'>
        <nav>
          <ul className='flex space-x-2'>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <button
                  onClick={() => handlePageChange(index + 1)}
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
      </div>
    </div>
  )
}
