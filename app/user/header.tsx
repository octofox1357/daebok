'use client'

import React from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import UserMenu from '@/lib/components/userMenu'

type HeaderProps = {
  toggleSidebar: () => void
  isOpen: boolean
}

export default function UserHeader({ toggleSidebar, isOpen }: HeaderProps) {
  return (
    <header className='bg-white border-b p-4 shadow-sm flex justify-between items-center transition-all duration-300'>
      {/* 사이드바 토글 버튼 */}
      <button
        onClick={toggleSidebar}
        className='text-gray-800 bg-white p-2 focus:outline-none focus:ring-2 focus:ring-gray-300'
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
      {/* 헤더 제목 */}
      <h1 className='text-lg font-bold'>대체복무</h1>
      <UserMenu />
    </header>
  )
}
