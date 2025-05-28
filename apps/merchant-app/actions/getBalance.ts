"use server"
import { authOptions } from "@/app/lib/authOptions";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";

export async function getBalance() {
    const session = await getServerSession(authOptions);
    try {
        const balance = await prisma.balance.findUnique({
            where: {
                userId: Number(session?.user?.id)
            }
        });
        return {
            amount: balance?.amount || 0,
            locked: balance?.locked || 0
        }
    } catch (error) {
        console.error(error)
        return {
            amount: 0,
            locked: 0
        }
    }
}