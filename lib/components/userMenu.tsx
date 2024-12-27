'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

type UserMenuProps = {
  onEditProfile?: () => void
  onLogout?: () => void
}

export default function UserMenu({ onEditProfile }: UserMenuProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggleDropdown = () => setDropdownOpen((prev) => !prev)

  const router = useRouter()
  const defaultEditProfile = () => router.push('/user/profile/edit')
  const handleLogout = async () => {
    /* 기존 로직 */
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="text-gray-600 hover:text-black focus:outline-none"
      >
        사용자 메뉴
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded shadow-md">
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
