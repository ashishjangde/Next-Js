import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import connectDB from "@/lib/dbConfig";
import userModel from "@/models/user.model";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        await connectDB();

        try {
          const user = await userModel.findOne({
            $or: [
              { email: credentials.email },
              { username: credentials.email }
            ]
          }).lean();

          if (!user) {
            return null;
          }
          const stringPassword = credentials.password.toString();
          const checkPassword = await bcryptjs.compare(stringPassword, user.password);
          if (!checkPassword) {
            return null;
          }

          return{
            ...user,
            _id: user._id.toString(),
          }

        } catch (err) {
          return null;
        }
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString(); 
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
      }
      return session;
    }
  },

  logger: {
    error: (message) => {
      //console.error(message.message);
    },
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/sign-in',
  },
});
