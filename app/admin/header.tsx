'use client'

import React from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

type HeaderProps = {
  toggleSidebar: () => void
  isOpen: boolean
}

export default function Header({ toggleSidebar, isOpen }: HeaderProps) {
  return (
    <header
      className={`bg-white border-b p-4 shadow-sm flex justify-between items-center transition-all duration-300`}
    >
      <button
        onClick={toggleSidebar}
        className='text-gray-800 bg-white p-2 focus:outline-none focus:ring-2 focus:ring-gray-300'
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
      <h1 className='text-lg font-bold'>어드민 헤더</h1>
      <div className='text-gray-600'>사용자 메뉴</div>
    </header>
  )
}
