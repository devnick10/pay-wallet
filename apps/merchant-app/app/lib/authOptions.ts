// import prisma from "@repo/db/client";
// import { Account, User } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID || "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
//     })
//   ],
//   secret: process.env.JWT_SECRET,
//   pages: {
//     signIn: '/signin'
//   },
//   callbacks: {
//     async signIn({ user, account }: { user: User, account: Account }) {
//       if (account?.provider === "google") {
//         try {
//           if (!user.email) {
//             console.error("No email found in user object");
//             return false;
//           }

//           const existingUser = await prisma.merchant.findUnique({
//             where: {
//               email: user.email
//             }
//           });

//           if (!existingUser) {
//             await prisma.merchant.create({
//               data: {
//                 email: user.email,
//                 auth_type: "Google",
//                 name: user.name || "",
//               }
//             });
//           }
//         } catch (error) {
//           console.error("Error during Google sign-in:", error);
//           return false;
//         }
//       }
//       return true;
//     }
//   },

// }

import prisma from "@repo/db/client";
import { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

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
            await prisma.merchant.create({
              data: {
                email: user.email,
                auth_type: "Google",
                name: user.name || "",
              }
            });
          }
          return true;
        } catch (error) {
          console.error("Error during Google sign-in:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: { session: Session, token: JWT }) {
      if (session.user) {
        session.user = token.user || "";
      }
      return session;
    }
  }
};