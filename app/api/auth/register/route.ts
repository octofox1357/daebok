import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    // console.log('ssssss', await request.json())
    // 폼에서 전달된 데이터 구조 분해
    const { username, password, confirmPassword, name, congregation } =
      await request.json()

    // 1) 기본 유효성 검사
    if (!username || !password || !confirmPassword) {
      return NextResponse.json(
        {
          error:
            'username, password, confirmPassword, email은 필수 입력 항목입니다.'
        },
        { status: 400 }
      )
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: '비밀번호가 일치하지 않습니다.' },
        { status: 400 }
      )
    }

    // 2) 중복된 username(아이디)인지 검사
    const existingUser = await prisma.user.findUnique({
      where: { username }
    })
    if (existingUser) {
      return NextResponse.json(
        { error: '이미 존재하는 아이디입니다.' },
        { status: 400 }
      )
    }

    // 3) 비밀번호 해싱 후 DB에 저장
    const hashedPassword = await bcrypt.hash(password, 10)
    await prisma.user.create({
      data: {
        // username: '1',
        // congregation: '1',
        // password: '1',
        // name: '1',
        // role: '1',
        // isActive: true,
        username,
        congregation: congregation || '',
        password: hashedPassword,
        name: name || '',
        role: 'user', // 회원가입 시 기본 역할
        isActive: true // 회원가입 시 기본 활성 상태
      }
    })

    return NextResponse.json({ message: '회원가입이 완료되었습니다.' })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: '서버 에러가 발생했습니다.' },
      { status: 500 }
    )
  }
}
