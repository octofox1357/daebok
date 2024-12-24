'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

type SidebarProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const router = useRouter()

  const menuItems = [
    { label: '관리 대시보드', path: '/admin/dashboard' },
    { label: '접수 관리', path: '/admin/applications' },
    { label: '휴가 신청 현황', path: '/admin/vacation' },
    { label: '외출 관리', path: '/admin/outing' },
    { label: '유저 관리', path: '/admin/users' },
    { label: '시스템 설정', path: '/admin/settings' },
    { label: '로그아웃', path: '/logout', isLogout: true },
  ]

  const handleNavigation = (path: string, isLogout?: boolean) => {
    if (isLogout) {
      // 로그아웃 추가 로직
      console.log('Logging out...')
    }
    router.push(path)
    setIsOpen(false)
  }

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform transition-transform duration-300 z-40 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className='flex flex-col h-full'>
        {/* 사이드바 헤더 */}
        <div className='p-4 bg-gray-900 border-b border-gray-700'>
          <h1 className='text-xl font-bold'>어드민 대시보드</h1>
        </div>

        {/* 메뉴 목록 */}
        <nav className='flex-1 p-4'>
          <ul className='space-y-2'>
            {menuItems.map(({ label, path, isLogout }, index) => (
              <li key={index}>
                <button
                  onClick={() => handleNavigation(path, isLogout)}
                  className='block w-full text-left px-4 py-2 rounded hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600'
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* 하단 영역 - 필요시 추가 가능 */}
      </div>
    </aside>
  )
}
