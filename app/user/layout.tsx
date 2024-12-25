'use client'

import { useState } from 'react'
import UserHeader from './header'
import UserSidebar from './sidebar'

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)

  // 사이드바 토글
  const toggleSidebar = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div
      className={`flex h-screen transition-all duration-300 ${
        isOpen ? 'ml-64' : ''
      }`}
    >
      {/* 사이드바 */}
      <UserSidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* 컨텐츠 영역 */}
      <div className='flex flex-col flex-1'>
        {/* 헤더 */}
        <UserHeader
          toggleSidebar={toggleSidebar}
          isOpen={isOpen}
        />

        {/* 메인 콘텐츠 */}
        <main className='p-6 bg-gray-100 flex-1'>{children}</main>
      </div>
    </div>
  )
}
