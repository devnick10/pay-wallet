"use server"
import { authOptions } from "@/app/lib/authOptions"
import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
type OnRampStatus = "Success" | "Failure" | "Processing"

export interface Payouts {
    id: number;
    status: OnRampStatus;
    token: string;
    provider: string;
    amount: number;
    startTime: Date;
    merchantId: number | null;
}

export const getPayout = async (): Promise<Payouts[]> => {
    const session = await getServerSession(authOptions)
    try {

        const payouts = await prisma.payout.findMany({
            where: {
                merchantId: Number(session?.user.id)
            }
        })

        if (payouts) {
            return payouts
        }

        return []
    } catch (err) {
        console.error(err)
        return []
    }
}