import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcryptjs from "bcryptjs"
import connectDB from "@/lib/dbConfig"
import userModel from "@/models/user.model"


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials: any): Promise<any> {
        await connectDB();
        try {
          const user = await userModel.findOne({
            $or: [
              {
                email: credentials?.identifier.email
              },
              {
                username: credentials?.identifier.username
              }
            ]
          })

          if (!user) {
            throw new Error("User not found with this email");
          }
          const checkPassword = await bcryptjs.compare(credentials?.password, user.password);
          if (!checkPassword) {
            throw new Error("Password is incorrect");
          }

          return user

        } catch (err: any) {
          throw new Error(err)
        }
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString(); // Convert ObjectId to string
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }
      return token
    },

    async session({ session, token }) {
      if (token) {
        session.user._id = token._id
        session.user.isVerified = token.isVerified
        session.user.isAcceptingMessages = token.isAcceptingMessages
        session.user.username = token.username
      }
      return session;
    }
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-in',
  },

})
