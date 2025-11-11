import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // TODO: Replace with actual authentication logic
        // This should verify against your database or Strapi

        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Example: Authenticate with Strapi
        // const res = await fetch(`${process.env.STRAPI_URL}/api/auth/local`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     identifier: credentials.email,
        //     password: credentials.password,
        //   }),
        // })
        // const user = await res.json()
        // if (res.ok && user) {
        //   return user
        // }

        // Temporary mock user for development
        if (credentials.email === "admin@peakpoint.africa") {
          return {
            id: "1",
            email: credentials.email,
            name: "Admin User",
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
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
        session.user.id = token.id as string
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
