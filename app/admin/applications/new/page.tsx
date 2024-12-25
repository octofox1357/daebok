'use client'

import React, { useState } from 'react'

export default function ApplicationCreation() {
  const [formData, setFormData] = useState({
    applicationTitle: '',
    applicationType: '외출',
    rangeStartDate: '',
    rangeEndDate: '',
    startDate: '',
    endDate: '',
    applicationLimit: '',
    applicationApprove: false,
  })

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name } = e.target

  if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
    const { checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }))
  } else {
    // 그 외 (radio, text, select 등)
    const { value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
}

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  try {
    // POST /api/applications
    const response = await fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error('Failed to create application')
    }

    const result = await response.json()
    alert('신청 접수가 성공적으로 생성되었습니다!')
    console.log('Response:', result)
  } catch (error) {
    console.error('Error submitting form:', error)
    alert('신청 접수 생성 중 오류가 발생했습니다.')
  }
}

return (
  <div className='max-w-4xl mx-auto p-4'>
    <h1 className='text-2xl font-bold mb-4'>신청접수 생성하기</h1>
    <form
      onSubmit={handleSubmit}
      className='bg-white shadow-md rounded-lg p-6'
    >
      {/* 제목 */}
      <div className='mb-4'>
        <label className='block font-bold mb-2'>신청 제목</label>
        <input
          type='text'
          name='applicationTitle'
          value={formData.applicationTitle}
          onChange={handleChange}
          className='form-input w-full'
          placeholder='제목을 입력하세요'
          required
        />
      </div>

      {/* 종류: 외출, 외박, 휴가 */}
      <div className='mb-4'>
        <label className='block font-bold mb-2'>종류</label>
        <div className='flex space-x-4'>
          {['외출', '외박', '휴가'].map((type) => (
            <label
              key={type}
              className='flex items-center space-x-2'
            >
              <input
                type='radio'
                name='applicationType'
                value={type}
                checked={formData.applicationType === type}
                onChange={handleChange}
                className='form-radio'
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 신청 기간 (rangeStartDate ~ rangeEndDate) */}
      <div className='mb-4'>
        <label className='block font-bold mb-2'>신청 기간</label>
        <div className='grid grid-cols-2 gap-4'>
          <input
            type='date'
            name='rangeStartDate'
            value={formData.rangeStartDate}
            onChange={handleChange}
            className='form-input w-full'
            required
          />
          <input
            type='date'
            name='rangeEndDate'
            value={formData.rangeEndDate}
            onChange={handleChange}
            className='form-input w-full'
            required
          />
        </div>
      </div>

      {/* 노출 기간 (startDate ~ endDate) */}
      <div className='mb-4'>
        <label className='block font-bold mb-2'>노출 기간</label>
        <div className='grid grid-cols-2 gap-4'>
          <input
            type='date'
            name='startDate'
            value={formData.startDate}
            onChange={handleChange}
            className='form-input w-full'
            placeholder='노출 시작일 선택'
          />
          <input
            type='date'
            name='endDate'
            value={formData.endDate}
            onChange={handleChange}
            className='form-input w-full'
            placeholder='노출 마감일 선택'
          />
        </div>
      </div>

      {/* 생성 버튼 */}
      <button
        type='submit'
        className='bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600'
      >
        생성하기
      </button>
    </form>
  </div>
)
}
