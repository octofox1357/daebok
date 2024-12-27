'use client'
import React, { useState, useEffect } from 'react'

// Application 모델 타입(필요한 필드만 선언)
type Application = {
  id: number
  applicationTitle: string
  applicationType: string
  rangeStartDate: string
  rangeEndDate: string
  applicationApprove?: boolean | null
  createdAt: string
  updatedAt: string
}

export default function OutingApplication() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  // 페이지네이션이 필요하다면 state 추가
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(applications.length / itemsPerPage)
  const currentData = applications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // 컴포넌트 마운트 시 데이터 페치
  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      // applicationType이 '외출'인 데이터만 필터링
      const res = await fetch('/api/applications?applicationType=외출')
      if (!res.ok) {
        throw new Error('Failed to fetch applications')
      }
      const data = await res.json()
      // data 구조: { applications: Application[], pagination: {...} }
      setApplications(data.applications)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setError('외출 신청 데이터를 불러오는 중 오류가 발생했습니다.')
      setLoading(false)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // 간단히 ‘마감/신청’ 상태 등을 표시하고 싶다면
  // rangeEndDate 또는 applicationApprove 등을 사용해 로직 구현 가능
  const getStatusLabel = (app: Application) => {
    // 예: 오늘 날짜가 신청 마감일보다 지나면 '접수마감'
    const now = new Date()
    const end = new Date(app.rangeEndDate)
    if (now > end) {
      return '접수마감'
    }
    // 그 외엔 '신청'
    return '신청'
  }

  if (loading) return <p className='p-4'>Loading...</p>
  if (error) return <p className='p-4 text-red-500'>{error}</p>

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>외출 신청 목록</h1>

      <div className='overflow-x-auto'>
        <table className='min-w-full table-auto border-collapse border border-gray-200'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='border border-gray-200 px-4 py-2'>제목</th>
              <th className='border border-gray-200 px-4 py-2'>종류</th>
              <th className='border border-gray-200 px-4 py-2'>마감일</th>
              <th className='border border-gray-200 px-4 py-2'>상태</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((app) => {
              const status = getStatusLabel(app)
              return (
                <tr
                  key={app.id}
                  className='hover:bg-gray-50'
                >
                  <td className='border border-gray-200 px-4 py-2'>
                    {app.applicationTitle}
                  </td>
                  <td className='border border-gray-200 px-4 py-2'>
                    {app.applicationType}
                  </td>
                  <td className='border border-gray-200 px-4 py-2'>
                    {/* YYYY-MM-DD 형태로 표시 */}
                    {new Date(app.rangeEndDate).toLocaleDateString()}
                  </td>
                  <td className='border border-gray-200 px-4 py-2'>
                    <button
                      className={`px-4 py-1 rounded text-white ${
                        status === '신청' ? 'bg-blue-500' : 'bg-gray-400'
                      }`}
                    >
                      {status}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div className='flex justify-center mt-4'>
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
