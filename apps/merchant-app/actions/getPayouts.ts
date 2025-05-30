"use server"
import { authOptions } from "@/app/lib/authOptions"
import { Payouts } from "@/lib/types"
import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"

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