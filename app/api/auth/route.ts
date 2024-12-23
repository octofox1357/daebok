// app/api/auth/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'GET 메소드 호출 완료' })
}

export async function POST() {
  // POST 요청 처리 로직
  return NextResponse.json({ message: 'POST 메소드 호출 완료' })
}
