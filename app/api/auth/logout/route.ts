import { NextResponse } from 'next/server'

export async function POST() {
  // NextResponse를 사용하여 쿠키 삭제 및 리다이렉션 처리
  const response = NextResponse.json({ message: '로그아웃 완료' })

  // 쿠키 삭제 설정
  response.cookies.set('token', '', {
    maxAge: 0, // 즉시 만료
    path: '/', // 쿠키의 적용 경로
  })

  return response
}
