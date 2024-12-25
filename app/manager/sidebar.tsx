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
    { label: '신청 관리', path: '/admin/applications' },
    { label: '휴가 관리', path: '/admin/vacation' },
    { label: '외출 관리', path: '/admin/outing' },
    { label: '사용자 관리', path: '/admin/users' },
  ]

  const handleNavigation = (path: string) => {
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
        {/* 메뉴 목록 */}
        <nav className='flex-1 p-4'>
          <ul className='space-y-2'>
            {menuItems.map(({ label, path }, index) => (
              <li key={index}>
                <button
                  onClick={() => handleNavigation(path)}
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
