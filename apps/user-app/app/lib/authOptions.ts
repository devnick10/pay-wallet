import { signInSchema } from "@repo/common/common";
import prisma from "@repo/db/client";
import bcrypt from "bcrypt";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

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
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                name: { label: "Name", type: "text", placeholder: "john doe" },
                phone: { label: "Phone number", type: "text", placeholder: "123123", required: true },
                password: { label: "Password", type: "password", placeholder: "***", required: true },
            },
            async authorize(credentials: any) {
                const { data, success, error } = signInSchema.safeParse(credentials)
                if (!success) {
                    console.error(error)
                    return null
                }

                const hashedpassword = await bcrypt.hash(data.password, 10)
                const existingUser = await prisma.user.findFirst({
                    where: {
                        number: data.phone
                    }
                });

                if (existingUser) {
                    const passwordValidation = await bcrypt.compare(data.password, existingUser.password)
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
                    const user = await prisma.$transaction(async () => {
                        const user = await prisma.user.create({
                            data: {
                                name: data.name,
                                number: data.phone,
                                password: hashedpassword
                            }
                        })
                        await prisma.balance.create({
                            data: {
                                amount: 0,
                                locked: 0,
                                userId: user.id,
                            }
                        })
                        return user
                    })

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
    pages: {
        signIn: '/signin'
    },
    callbacks: {
        async session({ token, session }: { token: JWT, session: Session }) {
            if (session.user) {
                session.user.id = token.sub || "";
            }
            return session;
        }
    }
} 
