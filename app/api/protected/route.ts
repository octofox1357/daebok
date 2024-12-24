import { NextResponse } from 'next/server'
import { verifyToken } from '@/lib/jwt'

export async function GET(request: Request) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '')

  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json({ message: 'Access granted' })
}
