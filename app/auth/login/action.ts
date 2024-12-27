// app/auth/login/action.ts
'use server'

import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'
import { generateToken } from '@/lib/jwt'

export async function loginUser({
  id,
  password
}: {
  id: string
  password: string
}) {
  // 사용자 확인
  const user = await prisma.user.findUnique({ where: { username: id } })
  if (!user) {
    throw new Error('User not found')
  }

  // 비밀번호 검증
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    throw new Error('Invalid credentials')
  }

  // JWT 생성
  const token = generateToken({ id: user.id, username: user.username })

  // 서버 액션에서 쿠키 설정 가능
  return {
    token,
    message: 'Login successful'
  }
}
