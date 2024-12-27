'use server'

import { cookies } from 'next/headers'

export async function logoutAction() {
  ;(await cookies()).set('token', '', {
    maxAge: 0,
    path: '/'
  })
}
