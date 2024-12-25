import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')

  // 허용 경로 설정 (정적 파일 포함)
  const publicPaths = [
    '/auth/login',
    '/auth/register',
    '/favicon.ico',
    '/_next/',
    '/api/',
  ]

  const { pathname } = req.nextUrl

  // 정적 파일 및 허용 경로 예외 처리
  if (!token && !publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  return NextResponse.next()
}

// 모든 경로에 미들웨어 적용
export const config = {
  matcher: ['/:path*'],
}

// 미들웨어 적용 경로
// export const config = {
//   matcher: ['/admin/:path*', '/protected/:path*'],
// }
