"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/lib/authOptions"
import prisma from "@repo/db/client";
import { randomUUID } from "crypto";

export async function createOnRampPayout(amount: number, provider: string) {

    const token = randomUUID()
    const session = await getServerSession(authOptions)
    const merchantId = session?.user.id;
    if (!merchantId) {
        return {
            success: false,
            message: "User not logged in"
        }
    }
    try {
        const [payout, balance] = await prisma.$transaction([
            prisma.payout.create({
                data: {
                    merchantId: Number(merchantId),
                    amount: amount * 100,
                    status: "Processing",
                    startTime: new Date(),
                    provider,
                    token: token
                }
            }),

            prisma.balance.update({
                where: { merchantId: Number(session.user.id) },
                data: {
                    locked: { increment: amount * 100 }
                }
            })
        ])
        if (payout && balance) {
            return {
                success: true,
                message: "On ramp payout added",
                payout,
                balance
            }
        }
        return {
            success: false,
            message: "Internal server error"
        }
    } catch (error) {
        console.error(error)
        return {
            success: false,
            message: "Internal server error"
        }
    }
}