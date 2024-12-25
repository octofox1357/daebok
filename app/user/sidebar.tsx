'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

type SidebarProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function UserSidebar({ isOpen, setIsOpen }: SidebarProps) {
  const router = useRouter()

  const menuItems = [
    // 관리자와는 다른 메뉴 구성
    { label: '나의 외출 현황', path: '/user/outing' },
    { label: '외출 신청', path: '/user/outing/applications' },
    { label: '나의 휴가 현황', path: '/user/vacation' },
  ]

  const handleNavigation = (path: string) => {
    router.push(path)
    setIsOpen(false)
  }

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform 
                  transition-transform duration-300 z-40 
                  ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className='flex flex-col h-full'>
        {/* 메뉴 */}
        <nav className='flex-1 p-4'>
          <ul className='space-y-2'>
            {menuItems.map(({ label, path }, index) => (
              <li key={index}>
                <button
                  onClick={() => handleNavigation(path)}
                  className='block w-full text-left px-4 py-2 rounded 
                             hover:bg-gray-700 transition-colors'
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
