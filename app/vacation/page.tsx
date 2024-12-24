'use client'

// import 'react-calendar/dist/Calendar.css'
import '../calendar.css'
import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import { Value } from 'react-calendar/src/shared/types.js'

// 더미 데이터
const dummyData = [
  {
    date: '2024-12-06',
    text: '[금일현황]\n(출발) 1명 (복귀) 0명\n정기외박 출발 - 1명 정찬',
    color: 'red',
  },
  {
    date: '2024-12-08',
    text: '[금일현황]\n(출발) 0명 (복귀) 0명\n정기외박 - 1명 정찬',
    color: 'red',
  },
  {
    date: '2024-12-09',
    text: '[금일현황]\n(출발) 0명 (복귀) 1명\n정기외박 복귀 - 1명 정찬',
    color: 'blue',
  },
]

export default function VacationPage() {
  const [selectedDate, setSelectedDate] = useState<Value | null>(null)

  useEffect(() => {
    setSelectedDate(new Date())
  }, [])

  // 날짜별 커스터마이즈된 내용을 표시
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const formattedDate = date.toISOString().split('T')[0]
      const data = dummyData.find((item) => item.date === formattedDate)
      if (data) {
        return (
          <div
            style={{
              backgroundColor: data.color,
              color: 'white',
              fontSize: '12px',
              borderRadius: '5px',
              padding: '2px',
              whiteSpace: 'pre-line',
            }}
          >
            {data.text}
          </div>
        )
      }
    }
    return null
  }

  return (
    <div className='flex flex-col h-screen'>
      <header className='bg-blue-500 text-white text-center py-4'>
        <h1 className='text-2xl font-bold'>휴가 / 외박 현황</h1>
      </header>
      <main className='flex-1 flex justify-center items-center p-4'>
        {selectedDate && (
          <Calendar
            onChange={(value) => setSelectedDate(value)}
            value={selectedDate}
            className='bg-white shadow-lg rounded-md w-full max-w-4xl p-2'
            view='month' // 월 보기
            minDetail='month' // 최소 상세 보기
            maxDetail='month' // 최대 상세 보기
            prev2Label={null} // 연도 이동 비활성화
            next2Label={null}
            tileContent={tileContent} // 각 타일에 커스터마이즈된 내용 표시
          />
        )}
      </main>
    </div>
  )
}
