import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import fs from 'fs'
import path from 'path'
import { User } from '../../../models/User'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        
        const usersFilePath = path.join(process.cwd(), 'app/data/users.json')
        const users: User[] = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'))
        
        const user = users.find(u => u.email === credentials.email && u.password === credentials.password)
        
        if (user) {
          return { id: user.id, email: user.email, name: user.name }
        } else {
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user = {
          ...session.user,
          id: token.id as string
        } as {
          name?: string | null | undefined;
          email?: string | null | undefined;
          image?: string | null | undefined;
          id: string;
        }
      }
      return session
    }
  }
})

export { handler as GET, handler as POST }
