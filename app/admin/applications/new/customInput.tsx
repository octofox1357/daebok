import React, { forwardRef } from 'react'

export const CustomInput = forwardRef<
  HTMLButtonElement,
  React.HTMLProps<HTMLButtonElement>
>(({ value, onClick }, ref) => {
  return (
    <button
      type="button"
      className="border-2 border-blue-500 rounded-md px-3 py-2 w-full text-left"
      onClick={onClick}
      ref={ref}
    >
      {value || '날짜 범위를 선택하세요'}
    </button>
  )
})

// Add a displayName property for better debugging & ESLint compliance
CustomInput.displayName = 'CustomInput'
