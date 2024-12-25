import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key'

export function generateToken(payload: object): string {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }) // 1시간 유효
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET_KEY)
  } catch (error) {
    console.error(error)
    return null
  }
}
