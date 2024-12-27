'use server'

import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { generateToken } from '@/lib/jwt'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function loginAction(formData: FormData) {
  // Extract data from FormData
  const id = formData.get('id') as string
  const password = formData.get('password') as string

  // Input validation
  if (!id || !password) {
    throw new Error('모든 필드를 입력해주세요.') // "Please fill in all fields."
  }

  // 사용자 확인 (User verification)
  const user = await prisma.user.findUnique({ where: { username: id } })
  if (!user) {
    throw new Error('사용자를 찾을 수 없습니다.') // "User not found."
  }

  // 비밀번호 검증 (Password validation)
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    throw new Error('잘못된 비밀번호입니다.') // "Invalid password."
  }

  // JWT 생성 (Generate JWT)
  const token = generateToken({ id: user.id, username: user.username })

  ;(await cookies()).set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Set to true in production
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    sameSite: 'lax' // Optional: CSRF protection
  })

  redirect('/user')
}

export async function logoutAction() {
  ;(await cookies()).set('token', '', {
    maxAge: 0,
    path: '/'
  })
}

export async function registerAction({
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
