'use client'

import React, { useState } from 'react'

const tableData = {
  dates: [
    '2024-12-23 월',
    '2024-12-24 화',
    '2024-12-25 수',
    '2024-12-26 목',
    '2024-12-27 금',
    '2024-12-28 토',
    '2024-12-29 일',
  ],
  confirmedCount: [33, 37, 36, 27, 40, 35, 35],
  rows: [
    [
      '김준수(보안야간)',
      '김재길(직식휴무)',
      '김현수(보안야간)',
      '김현수(보안야간)',
      '유성연(대체휴무)',
      '김현수(보안야간)',
      '김현수(보안야간)',
    ],
    [
      '강재민(보안야간)',
      '김현수(보안야간)',
      '이민호(보안야간)',
      '이민호(보안야간)',
      '김유진(직식휴무)',
      '이민호(보안야간)',
      '이민호(보안야간)',
    ],
    [
      '전효인(보안야간)',
      '이민호(보안야간)',
      '김준수(보안야간)',
      '김준수(보안야간)',
      '김도일(직식휴무)',
      '강재민(보안야간)',
      '김준수(보안야간)',
    ],
    [
      '이승호(보안야간)',
      '강재민(보안야간)',
      '박훈석(보안야간)',
      '박훈석(보안야간)',
      '조현상(대체휴무)',
      '전효인(보안야간)',
      '박훈석(보안야간)',
    ],
    [
      '최 훈(대체휴무)',
      '전효인(보안야간)',
      '김영옥(보안야간)',
      '강재민(보안야간)',
      '조성균(대체휴무)',
      '김영옥(보안야간)',
      '김영옥(보안야간)',
    ],
    [
      '임정빈',
      '김영옥(보안야간)',
      '이승호(보안야간)',
      '전효인(보안야간)',
      '김준수(보안야간)',
      '이승호(보안야간)',
      '이승호(보안야간)',
    ],
    [
      '김도윤',
      '이승호(보안야간)',
      '지성형(대체휴무)',
      '이현용',
      '박훈석(보안야간)',
      '고준영',
      '김지윤',
    ],
    [
      '김지윤',
      '정규영(대체휴무)',
      '임정빈',
      '김도윤',
      '강재민(보안야간)',
      '이현용',
      '박성현',
    ],
    [
      '최동인',
      '고준영',
      '김도윤',
      '김성훈',
      '전효인(보안야간)',
      '최 훈',
      '권지상',
    ],
    [
      '황강민',
      '김준수',
      '김성훈',
      '유성연',
      '이경훈',
      '김영옥(보안야간)',
      '강무진',
    ],
  ],
}

export default function OutingPage() {
  const [dateRange, setDateRange] = useState()

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-xl font-bold'>외출신청목록</h1>
        <div className='flex gap-2'>
          <button className='px-4 py-2 border rounded'>{'<'}</button>
          <span className='font-medium'>{dateRange}</span>
          <button className='px-4 py-2 border rounded'>{'>'}</button>
          <button className='px-4 py-2 bg-blue-500 text-white rounded'>
            오늘
          </button>
        </div>
      </div>
      <table className='table-auto w-full border-collapse border border-gray-300'>
        <thead className='bg-gray-200'>
          <tr>
            <th className='border border-gray-300 px-4 py-2'>#</th>
            {tableData.dates.map((date, index) => (
              <th
                key={index}
                className='border border-gray-300 px-4 py-2'
              >
                {date} <br />
                {tableData.confirmedCount[index]}명
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className='text-center'
            >
              <td className='border border-gray-300 px-4 py-2'>
                {rowIndex + 1}
              </td>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className='border border-gray-300 px-4 py-2'
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
