'use client'

import { useState } from 'react'
import React from 'react'
import { outingApplicationAction } from '@/app/actions'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// date-fns 한국어 locale
import { ko } from 'date-fns/locale/ko'
import { CustomInput } from './customInput'
registerLocale('ko', ko)

export default function ApplicationCreation() {
  const [error, setError] = useState('')

  // "신청 기간"을 하나의 범위로 관리
  const [applicationRange, setApplicationRange] = useState<
    [Date | null, Date | null]
  >([null, null])
  const [exposeRange, setExposeRange] = useState<[Date | null, Date | null]>([
    null,
    null
  ])

  const [applicationStart, applicationEnd] = applicationRange
  const [exposeStart, exposeEnd] = exposeRange

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    const formData = new FormData(e.currentTarget)

    // 신청 기간
    if (applicationStart) {
      formData.set(
        'rangeStartDate',
        applicationStart.toISOString().split('T')[0]
      )
    }
    if (applicationEnd) {
      formData.set('rangeEndDate', applicationEnd.toISOString().split('T')[0])
    }

    // 노출 기간
    if (exposeStart) {
      formData.set('startDate', exposeStart.toISOString().split('T')[0])
    }
    if (exposeEnd) {
      formData.set('endDate', exposeEnd.toISOString().split('T')[0])
    }

    try {
      const response = await outingApplicationAction(formData)
      if (!response.success) {
        setError(response.message)
      } else {
        alert(response.message)
      }
    } catch (err) {
      console.error(err)
      setError('서버 통신 중 예기치 못한 오류가 발생했습니다.')
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">신청접수 생성하기</h1>
      {/* 에러 메시지 */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form
        method="POST"
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6"
      >
        {/* 신청 제목 */}
        <div className="mb-4">
          <label className="block font-bold mb-2">신청 제목</label>
          <input
            type="text"
            name="applicationTitle"
            className="form-input w-full"
            placeholder="제목을 입력하세요"
            required
          />
        </div>

        {/* 종류 라디오 버튼 */}
        <div className="mb-4">
          <label className="block font-bold mb-2">종류</label>
          <div className="flex space-x-4">
            {['외출', '외박', '휴가'].map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="applicationType"
                  value={type}
                  defaultChecked={type === '외출'}
                  className="form-radio"
                  required
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 신청 기간 (단일 DatePicker, 범위 선택) */}
        <div className="mb-4">
          <label className="block font-bold mb-2">신청 기간</label>
          <DatePicker
            locale="ko"
            selected={applicationStart}
            onChange={(dates: [Date | null, Date | null]) =>
              setApplicationRange(dates)
            }
            startDate={applicationStart}
            endDate={applicationEnd}
            selectsRange
            dateFormat="yyyy-MM-dd"
            // placeholderText="시작일 ~ 종료일" <- customInput 사용 시 무시됨
            customInput={<CustomInput />}
          />
        </div>

        {/* 노출 기간 (단일 DatePicker, 범위 선택) */}
        <div className="mb-4">
          <label className="block font-bold mb-2">노출 기간</label>
          <DatePicker
            locale="ko"
            selected={exposeStart}
            onChange={(dates: [Date | null, Date | null]) =>
              setExposeRange(dates)
            }
            startDate={exposeStart}
            endDate={exposeEnd}
            selectsRange
            dateFormat="yyyy-MM-dd"
            // placeholderText="노출 시작일 ~ 마감일" <- customInput 사용 시 무시됨
            customInput={<CustomInput />}
          />
        </div>

        {/* 제한 사항 */}
        <div className="mb-4">
          <label className="block font-bold mb-2">제한 사항</label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="weekDayLimit"
              className="form-input w-full"
              placeholder="평일 외출 일수"
              required
            />
            <input
              type="number"
              name="weekEndLimit"
              className="form-input w-full"
              placeholder="휴일 외출 일수"
              required
            />
          </div>
        </div>

        {/* 승인 여부 (체크박스) */}
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="applicationApprove"
              value="true"
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
