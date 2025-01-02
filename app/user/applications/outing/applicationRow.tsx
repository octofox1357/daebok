import React, { useState } from 'react'
// import 'react-calendar/dist/Calendar.css'
import '../../../calendar.css'
import Calendar from 'react-calendar'
import { createPortal } from 'react-dom'
import { Application } from '../types'
import { Value } from 'react-calendar/src/shared/types.js'

export default function ApplicationRow({
  application
}: {
  application: Application
}) {
  const [showModal, setShowModal] = useState(false)
  const [selectedDates, setSelectedDates] = useState<Date[]>([])

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
        setSelectedDates((prev) =>
          prev.filter((date) => date.toDateString() !== value.toDateString())
        )
      } else {
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

        setSelectedDates((prev) => [...prev, value])
      }
    }
  }

  const tileClassName = ({ date }: { date: Date }) => {
    if (
      selectedDates.some(
        (selectedDate) => selectedDate.toDateString() === date.toDateString()
      )
    ) {
      if (date.getDay() === 0 || date.getDay() === 6) {
        return 'bg-red-500 text-white'
      }
      return 'bg-blue-500 text-white'
    }

    if (date.getDay() === 0 || date.getDay() === 6) {
      return 'text-red-500'
    }
    return ''
  }

  const status = getStatusLabel(application.rangeEndDate)

  const Modal = () =>
    showModal
      ? createPortal(
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h2 className="text-lg font-semibold mb-4">날짜 선택</h2>
              <Calendar
                onClickDay={handleDateSelect}
                locale="ko-KR"
                // minDate={new Date()}
                tileClassName={tileClassName}
                minDetail="month"
                maxDetail="month"
                className="rounded-lg"
                calendarType="gregory"
                prev2Label={null}
                next2Label={null}
              />
              <div className="mt-4 text-gray-700 text-sm">
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
                {selectedDates.length > 0 &&
                  selectedDates
                    .map((date) => date.toLocaleDateString())
                    .join(', ')}
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => {
                    alert(
                      `날짜 신청: ${selectedDates.map((d) => d.toDateString())}`
                    )
                  }}
                  className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 mr-2"
                >
                  신청
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>,
          document.body
        )
      : null

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="border border-gray-200 px-4 py-2">
          {application.applicationTitle}
        </td>
        <td className="border border-gray-200 px-4 py-2">
          {application.applicationType}
        </td>
        <td className="border border-gray-200 px-4 py-2">
          {new Date(application.rangeEndDate).toLocaleDateString()}
        </td>
        <td className="border border-gray-200 px-4 py-2">
          <button
            onClick={() => status === '신청' && setShowModal(true)}
            className={`px-4 py-1 rounded text-white ${
              status === '신청' ? 'bg-blue-500' : 'bg-gray-400'
            }`}
          >
            {status}
          </button>
        </td>
      </tr>
      <Modal />
    </>
  )
}
