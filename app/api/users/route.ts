import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma' // Prisma 클라이언트

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
        createdAt: true
      }
    })
    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // 사용자 삭제
    const deletedUser = await prisma.user.delete({
      where: { id: Number(id) }
    })

    return NextResponse.json(deletedUser)
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const { username, role, isActive } = await request.json()

    // 사용자 업데이트
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        username,
        role,
        isActive
      }
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}
