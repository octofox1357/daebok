import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  const { id, password, confirmPassword } = await request.json()

  // 유효성 검사
  if (!id || !password || !confirmPassword) {
    return NextResponse.json(
      { error: 'All fields are required' },
      { status: 400 }
    )
  }
  if (password !== confirmPassword) {
    return NextResponse.json(
      { error: 'Passwords do not match' },
      { status: 400 }
    )
  }

  // 중복 확인
  const existingUser = await prisma.user.findUnique({ where: { username: id } })
  if (existingUser) {
    return NextResponse.json(
      { error: 'User ID already exists' },
      { status: 400 }
    )
  }

  // 비밀번호 해싱 및 데이터 저장
  const hashedPassword = await bcrypt.hash(password, 10)
  await prisma.user.create({
    data: { username: id, password: hashedPassword },
  })

  return NextResponse.json({ message: 'User registered successfully' })
}
