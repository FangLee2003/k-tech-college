import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Cho phép chuyển hướng nội bộ
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Cho phép chuyển hướng đến URL cùng origin
      else if (new URL(url).origin === baseUrl) return url
      // Mặc định về task-csr
      return `${baseUrl}/task-csr`
    }
  }
})