import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'
import { generateToken } from '@/lib/jwt'

export async function POST(request: Request) {
  const { id, password } = await request.json()

  // 사용자 확인
  const user = await prisma.user.findUnique({ where: { username: id } })
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  // 비밀번호 검증
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  // JWT 생성
  const token = generateToken({ id: user.id, username: user.username })

  // 응답 및 쿠키 설정
  const response = NextResponse.json({ message: 'Login successful' })
  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // 프로덕션 환경에서는 true
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 일주일
  })

  return response
}
