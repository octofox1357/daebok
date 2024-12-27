'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { logoutAction } from '@/app/actions'

type UserMenuProps = {
  onEditProfile?: () => void
  onLogout?: () => void
}

export default function UserMenu({ onEditProfile }: UserMenuProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const toggleDropdown = () => setDropdownOpen((prev) => !prev)
  const router = useRouter()

  const defaultEditProfile = () => router.push('/user/profile/edit')

  const handleLogout = async () => {
    try {
      await logoutAction()
      router.push('/auth/login')
    } catch (error) {
      console.error('로그아웃 실패:', error)
      alert('로그아웃에 실패했습니다. 다시 시도해주세요.')
    }
  }

  // 드롭다운 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        aria-label="사용자 메뉴 열기"
        className="text-gray-600 hover:text-black focus:outline-none"
      >
        사용자 메뉴
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded shadow-md z-50">
          <button
            onClick={onEditProfile || defaultEditProfile}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            개인정보수정
          </button>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  )
}
