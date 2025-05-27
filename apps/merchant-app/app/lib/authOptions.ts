import prisma from "@repo/db/client";
import { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string;
      email?: string;
      image?: string;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    })
  ],
  secret: process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin'
  },
  callbacks: {
    async signIn(params) {
      const { user, account } = params;
      if (account?.provider === "google") {
        try {
          if (!user.email) {
            console.error("No email found in user object");
            return false;
          }

          const existingUser = await prisma.merchant.findUnique({
            where: { email: user.email }
          });

          if (!existingUser) {
            const newUser = await prisma.merchant.create({
              data: {
                email: user.email,
                auth_type: "Google",
                name: user.name || "",
              }
            });
            user.id = String(newUser.id)
            return true
          }
          user.id = String(existingUser.id)
          return true
        } catch (error) {
          console.error("Error during Google sign-in:", error);
          return false;
        }
      }
      return true;
    },
<<<<<<< HEAD
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
=======
    async jwt({ token }) {
      // Fetch the merchant from the database based on the email
      if (token.email) {
        const merchant = await prisma.merchant.findUnique({
          where: { email: token.email }
        });

        if (merchant) {
          token.sub = String(merchant.id);
        }
>>>>>>> de32c7e474d9b01c7f237ed6b7e4d191aec7d93c
      }
      return token;
    },
    async session({ session, token }: { session: Session, token: JWT }) {
      if (session.user) {
        session.user.id = token.sub || "";
      }
      return session;
    }
  }
};