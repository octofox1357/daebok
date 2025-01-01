'use client'

import { useState } from 'react'
import React from 'react'
import { outingApplicationAction } from '@/app/actions'
import { useRouter } from 'next/navigation'

export default function ApplicationCreation() {
  const router = useRouter()
  const [error, setError] = useState('')
  //const [success, setSuccess] = useState('')

  //외출 신청 생성 제출
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget)
    e.preventDefault()
    setError('')
    //setSuccess('')

    try {
      const response = await outingApplicationAction(formData)
      alert(response.message)
      //router.push('/api/actions')
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message)
        setError(err.message || '외출신청 생성 중 오류가 발생했습니다.')
      }
    }
  }



  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">신청접수 생성하기</h1>
      <form
        method="POST"
        onSubmit={handleSubmit}
        //action={'/api/applications/'}
        className="bg-white shadow-md rounded-lg p-6"
      >
        <div className="mb-4">
          <label className="block font-bold mb-2">신청 제목</label>
          <input
            type="text"
            name="applicationTitle"
            defaultValue=""
            className="form-input w-full"
            placeholder="제목을 입력하세요"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-2">종류</label>
          <div className="flex space-x-4">
            {['외출', '외박', '휴가'].map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="applicationType"
                  value={type} // 필수: 선택 시 전송될 값
                  defaultChecked={type === '외출'}
                  className="form-radio"
                  required
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 신청 기간 (rangeStartDate ~ rangeEndDate) */}
        <div className="mb-4">
          <label className="block font-bold mb-2">신청 기간</label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              name="rangeStartDate"
              defaultValue=""
              className="form-input w-full"
              required
            />
            <input
              type="date"
              name="rangeEndDate"
              defaultValue=""
              className="form-input w-full"
              required
            />
          </div>
        </div>

        {/* 노출 기간 (startDate ~ endDate) */}
        <div className="mb-4">
          <label className="block font-bold mb-2">노출 기간</label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              name="startDate"
              defaultValue=""
              className="form-input w-full"
              placeholder="노출 시작일 선택"
              required
            />
            <input
              type="date"
              name="endDate"
              defaultValue=""
              className="form-input w-full"
              placeholder="노출 마감일 선택"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-2">제한 사항</label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="weekDayLimit"
              defaultValue=""
              className="form-input w-full"
              placeholder="핑일 외출 일수"
              required
            />
            <input
              type="number"
              name="weekEndLimit"
              defaultValue=""
              className="form-input w-full"
              placeholder="휴일 외출 일수"
              required
            />
          </div>
        </div>

        {/* 승인 여부 (체크박스 추가) */}
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="applicationApprove"
              value="true" // 필수: 체크 시 전송될 값
              className="form-checkbox"
              required
            />
            <span className="ml-2">승인 필요</span>
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          생성하기
        </button>
      </form>
    </div>
  )
}

