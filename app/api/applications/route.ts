import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    // Extract query parameters
    const applicationType = searchParams.get('applicationType') // Filter by application type
    const startDate = searchParams.get('startDate') // Filter by range start date
    const endDate = searchParams.get('endDate') // Filter by range end date
    const page = parseInt(searchParams.get('page') || '1', 10) // Current page
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10) // Items per page

    // Apply filters
    const filters = {
      ...(applicationType && { applicationType }),
      ...(startDate &&
        endDate && {
          rangeStartDate: {
            gte: new Date(startDate),
          },
          rangeEndDate: {
            lte: new Date(endDate),
          },
        }),
    }

    // Fetch applications with filters and pagination
    const applications = await prisma.application.findMany({
      where: filters,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Get total count for pagination
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

    // Validate required fields
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

    // Create application in the database
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
