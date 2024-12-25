import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { createPortal } from 'react-dom'
import { Application } from './types'
import { Value } from 'react-calendar/src/shared/types.js'

export default function ApplicationRow({
  application,
}: {
  application: Application
}) {
  const [showModal, setShowModal] = useState(false) // 모달 표시 여부
  const [selectedDates, setSelectedDates] = useState<Date[]>([]) // 선택된 날짜들

  const getStatusLabel = (rangeEndDate: string): string => {
    const now = new Date()
    const end = new Date(rangeEndDate)
    return now > end ? '접수마감' : '신청'
  }

  const handleDateSelect = (value: Value) => {
    if (value && !Array.isArray(value)) {
      const isAlreadySelected = selectedDates.some(
        (date) => date.toDateString() === value.toDateString()
      )

      if (isAlreadySelected) {
        // 이미 선택된 날짜를 클릭하면 선택 해제
        setSelectedDates((prev) =>
          prev.filter((date) => date.toDateString() !== value.toDateString())
        )
      } else {
        // 선택 조건 검사 (최대 3일, 주중 2일, 주말 1일 제한)
        const weekdays = selectedDates.filter(
          (date) => date.getDay() !== 0 && date.getDay() !== 6
        ).length
        const weekends = selectedDates.filter(
          (date) => date.getDay() === 0 || date.getDay() === 6
        ).length

        const isWeekend = value.getDay() === 0 || value.getDay() === 6
        if (selectedDates.length >= 3) {
          alert('총 3일까지 선택 가능합니다.')
          return
        }
        if (!isWeekend && weekdays >= 2) {
          alert('주중은 최대 2일까지만 선택 가능합니다.')
          return
        }
        if (isWeekend && weekends >= 1) {
          alert('주말은 최대 1일까지만 선택 가능합니다.')
          return
        }

        // 새로운 날짜 추가
        setSelectedDates((prev) => [...prev, value])
      }
    }
  }

  const tileClassName = ({ date }: { date: Date }) => {
    // 선택된 날짜에 파란색 배경과 하얀 텍스트 클래스 추가
    if (
      selectedDates.some(
        (selectedDate) => selectedDate.toDateString() === date.toDateString()
      )
    ) {
      return 'bg-blue-500 text-white' // 배경 파랑, 텍스트 하얀색
    }
    return ''
  }

  const status = getStatusLabel(application.rangeEndDate)

  const Modal = () =>
    showModal
      ? createPortal(
          <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
            <div className='bg-white p-6 rounded shadow-lg w-96'>
              <h2 className='text-lg font-semibold mb-4'>날짜 선택</h2>
              <Calendar
                onChange={handleDateSelect} // 날짜 선택 이벤트
                value={null} // 선택된 날짜를 보여주지 않음
                minDate={new Date()} // 현재 날짜 이후만 선택 가능
                tileClassName={tileClassName} // 선택된 날짜 스타일 적용
                className='rounded-lg'
              />
              <div className='mt-4 text-gray-700 text-sm'>
                <p>
                  주중 2일 중{' '}
                  <strong>
                    {
                      selectedDates.filter(
                        (date) => date.getDay() !== 0 && date.getDay() !== 6
                      ).length
                    }
                  </strong>
                  일, 주말 1일 중{' '}
                  <strong>
                    {
                      selectedDates.filter(
                        (date) => date.getDay() === 0 || date.getDay() === 6
                      ).length
                    }
                  </strong>
                  일 선택됨
                </p>
              </div>
              <div className='mt-4 flex justify-end'>
                <button
                  onClick={() => setShowModal(false)}
                  className='px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600'
                >
                  닫기
                </button>
              </div>
            </div>
          </div>,
          document.body // Render modal in the document body
        )
      : null

  return (
    <>
      <tr className='hover:bg-gray-50'>
        <td className='border border-gray-200 px-4 py-2'>
          {application.applicationTitle}
        </td>
        <td className='border border-gray-200 px-4 py-2'>
          {application.applicationType}
        </td>
        <td className='border border-gray-200 px-4 py-2'>
          {new Date(application.rangeEndDate).toLocaleDateString()}
        </td>
        <td className='border border-gray-200 px-4 py-2'>
          <button
            onClick={() => status === '신청' && setShowModal(true)}
            className={`px-4 py-1 rounded text-white ${
              status === '신청' ? 'bg-blue-500' : 'bg-gray-400'
            }`}
          >
            {status}
          </button>
        </td>
        {selectedDates.length > 0 && (
          <td className='border border-gray-200 px-4 py-2'>
            {selectedDates.map((date) => date.toLocaleDateString()).join(', ')}
          </td>
        )}
      </tr>
      <Modal />
    </>
  )
}
