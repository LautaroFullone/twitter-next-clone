import { PrismaClient } from '@prisma/client'

// Evita la creacion de muchos prisma client debido al hot reloading de next

declare global {
   var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
   globalThis.prisma = client
}

export default client
