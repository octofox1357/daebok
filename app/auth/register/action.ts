// app/auth/register/action.ts
'use server'

import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'

export async function registerUser({
  username,
  password,
  confirmPassword,
  name,
  congregation
}: {
  username: string
  password: string
  confirmPassword: string
  name?: string
  congregation?: string
}) {
  if (!username || !password || !confirmPassword) {
    throw new Error(
      'username, password, confirmPassword는 필수 입력 항목입니다.'
    )
  }

  if (password !== confirmPassword) {
    throw new Error('비밀번호가 일치하지 않습니다.')
  }

  const existingUser = await prisma.user.findUnique({
    where: { username }
  })

  if (existingUser) {
    throw new Error('이미 존재하는 아이디입니다.')
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      username,
      congregation: congregation || '',
      password: hashedPassword,
      name: name || '',
      role: 'user', // 기본 역할 설정
      isActive: true // 기본 활성화
    }
  })

  return { message: '회원가입이 완료되었습니다.' }
}
