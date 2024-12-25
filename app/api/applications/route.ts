import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    // 파라미터 추출
    const applicationTypeQuery = searchParams.get('applicationType')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const page = parseInt(searchParams.get('page') || '1', 10)
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10)

    // 기본값: applicationType이 지정되지 않았다면 '외출'
    const applicationType = applicationTypeQuery ?? '외출'

    // **명시적 타입을 사용해보자**
    const filters: Prisma.ApplicationWhereInput = {
      applicationType,
    }

    // startDate, endDate가 모두 존재하면 rangeStartDate, rangeEndDate 조건 추가
    if (startDate && endDate) {
      filters.rangeStartDate = { gte: new Date(startDate) }
      filters.rangeEndDate = { lte: new Date(endDate) }
    }

    // DB 조회
    const applications = await prisma.application.findMany({
      where: filters,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        createdAt: 'desc',
      },
    })

    // 전체 개수
    const totalCount = await prisma.application.count({ where: filters })

    return NextResponse.json({
      applications,
      pagination: {
        total: totalCount,
        page,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      applicationTitle,
      applicationType,
      rangeStartDate,
      rangeEndDate,
      startDate,
      endDate,
      applicationLimit,
      applicationApprove,
    } = body

    // 필수 필드 검사
    if (
      !applicationTitle ||
      !applicationType ||
      !rangeStartDate ||
      !rangeEndDate
    ) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      )
    }

    // DB에 새 Application 레코드 생성
    const application = await prisma.application.create({
      data: {
        applicationTitle,
        applicationType,
        rangeStartDate: new Date(rangeStartDate),
        rangeEndDate: new Date(rangeEndDate),
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        applicationLimit: applicationLimit || null,
        applicationApprove: applicationApprove ?? null,
      },
    })

    return NextResponse.json({ application })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

