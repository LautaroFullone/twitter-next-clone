import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcrypt'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { SessionStrategy } from 'next-auth'
import prisma from '@/libs/prismadb'

export const authOptions = {
   adapter: PrismaAdapter(prisma),
   providers: [
      CredentialsProvider({
         name: 'credentials',
         credentials: {
            email: { label: 'email', type: 'text' },
            password: { label: 'password', type: 'password' },
         },
         async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) {
               throw new Error('Invalid credentials')
            }

            const user = await prisma.user.findUnique({
               where: {
                  email: credentials.email,
               },
            })

            if (!user || !user?.hashedPassword) {
               throw new Error('Invalid credentials')
            }

            const isCorrectPassword = await bcrypt.compare(
               credentials.password,
               user.hashedPassword // Asegúrate de comparar con 'hashedPassword'
            )

            if (!isCorrectPassword) {
               throw new Error('Invalid credentials')
            }

            return user
         },
      }),
   ],
   debug: false,
   session: {
      strategy: 'jwt' as SessionStrategy,
   },
   jwt: {
      secret: process.env.NEXTAUTH_JWT_SECRET,
   },
   secret: process.env.NEXTAUTH_SECRET,
}

// Exporta authOptions y NextAuth por defecto
export default NextAuth(authOptions)
