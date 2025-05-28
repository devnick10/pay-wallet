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
            const merchant = await prisma.$transaction(async () => {
              const newMerchant = await prisma.merchant.create({
                data: {
                  email: user.email as string,
                  auth_type: "Google",
                  name: user.name || "",
                }
              });
              await prisma.balance.create({
                data: {
                  amount: 0,
                  locked: 0,
                  merchantId: newMerchant.id,
                }
              })
              return newMerchant
            })

            user.id = String(merchant.id)
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
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
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