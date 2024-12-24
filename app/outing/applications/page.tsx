'use client'
import React, { useState } from 'react'

const dummyData = [
  {
    id: 1,
    title: '[외출신청] 2024-12-30 ~ 2025-01-05',
    type: '외출',
    deadline: '2024-12-25',
    status: '신청',
  },
  {
    id: 2,
    title: '[외출신청] 2024-12-23 ~ 2024-12-29',
    type: '외출',
    deadline: '2024-12-15',
    status: '접수마감',
  },
  {
    id: 3,
    title: '[외출신청] 2024-12-16 ~ 2024-12-22',
    type: '외출',
    deadline: '2024-12-08',
    status: '접수마감',
  },
  {
    id: 4,
    title: '[외출신청] 2024-12-09 ~ 2024-12-15',
    type: '외출',
    deadline: '2024-12-01',
    status: '접수마감',
  },
  {
    id: 5,
    title: '[외출신청] 2024-12-02 ~ 2024-12-08',
    type: '외출',
    deadline: '2024-11-24',
    status: '접수마감',
  },
  // 더미 데이터 추가 가능
]

export default function OutingApplication() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const totalPages = Math.ceil(dummyData.length / itemsPerPage)
  const currentData = dummyData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>신청하기</h1>
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
            {currentData.map((item) => (
              <tr
                key={item.id}
                className='hover:bg-gray-50'
              >
                <td className='border border-gray-200 px-4 py-2'>
                  {item.title}
                </td>
                <td className='border border-gray-200 px-4 py-2'>
                  {item.type}
                </td>
                <td className='border border-gray-200 px-4 py-2'>
                  {item.deadline}
                </td>
                <td className='border border-gray-200 px-4 py-2'>
                  <button
                    className={`px-4 py-1 rounded text-white ${
                      item.status === '신청' ? 'bg-blue-500' : 'bg-gray-400'
                    }`}
                  >
                    {item.status}
                  </button>
                </td>
              </tr>
            ))}
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
