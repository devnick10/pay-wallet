import CredentialProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import prisma from "@repo/db/client";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";


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

export const authOptions = {
    providers: [
        CredentialProvider({
            name: "Credentials",
            credentials: {
                name: { label: "Name", type: "text", placeholder: "john doe" },
                phone: { label: "Phone number", type: "text", placeholder: "123123", required: true },
                password: { label: "Password", type: "password", placeholder: "***", required: true },
            },
            async authorize(credentials: any) {
                // do zod validation, OTP validaton
                const hashedpassword = await bcrypt.hash(credentials.password, 10)
                const existingUser = await prisma.user.findFirst({
                    where: {
                        number: credentials.phone
                    }
                });

                if (existingUser) {
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password)
                    if (passwordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.number
                        }
                    }
                    return null;
                }

                try {

                    const user = await prisma.user.create({
                        data: {
                            number: credentials.phone,
                            password: hashedpassword
                        }
                    });

                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.number
                    }

                } catch (err) {
                    console.error(err)
                }
                return null

            },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET || "secret",
    callbacks: {
        async session({ token, session }: { token: JWT, session: Session }) {
            if (session.user) {
                session.user.id = token.sub || "";
            }
            return session;
        }
    }
} 
