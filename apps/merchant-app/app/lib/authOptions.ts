import prisma from "@repo/db/client";
import { Account, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    })
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/signin'
  },
  callbacks: {
    async signIn({ user, account }: { user: User, account: Account }) {
      if (account?.provider === "google") {
        try {
          if (!user.email) {
            console.error("No email found in user object");
            return false;
          }

          const existingUser = await prisma.merchant.findUnique({
            where: {
              email: user.email
            }
          });

          if (!existingUser) {
            await prisma.merchant.create({
              data: {
                email: user.email,
                auth_type: "Google",
                name: user.name || "",
              }
            });
          }
        } catch (error) {
          console.error("Error during Google sign-in:", error);
          return false;
        }
      }
      return true;
    }
  },

}