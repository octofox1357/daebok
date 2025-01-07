import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient().$extends({
  model: {
    user: {}
  }
})

export default prisma
