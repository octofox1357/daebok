'use client'

import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'

type UserMenuProps = {
  onEditProfile?: () => void // 프로필 수정 버튼 동작
  onLogout?: () => void // 로그아웃 버튼 동작
}

export default function UserMenu({ onEditProfile }: UserMenuProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggleDropdown = () => setDropdownOpen((prev) => !prev)

  const router = useRouter()

  const defaultEditProfile = () => router.push('/user/profile/edit')

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST'
      })

      if (res.ok) {
        router.push('/auth/login')
      } else {
        console.error('로그아웃 실패:', await res.json())
        alert('로그아웃에 실패했습니다. 다시 시도해주세요.')
      }
    } catch (error) {
      console.error('로그아웃 요청 오류:', error)
      alert('로그아웃 요청 중 오류가 발생했습니다.')
    }
  }

  const dropdownMenu = (
    <div className="w-36 bg-white border border-gray-200 rounded shadow-md">
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
  )

  return (
    <>
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="text-gray-600 hover:text-black focus:outline-none"
        >
          사용자 메뉴
        </button>
        {dropdownOpen &&
          createPortal(
            <div
              className="fixed inset-0 z-40" // 배경 클릭 시 닫힘
              onClick={() => setDropdownOpen(false)}
            />,
            document.body
          )}
        {dropdownOpen &&
          createPortal(
            <div
              className="fixed top-16 right-4 z-50" // 상위 레이어 위치 설정
              onClick={(e) => e.stopPropagation()}
            >
              {dropdownMenu}
            </div>,
            document.body // Portal을 body에 렌더링
          )}
      </div>
    </>
  )
}
