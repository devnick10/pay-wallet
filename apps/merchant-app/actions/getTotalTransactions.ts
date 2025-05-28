"use server"
import { authOptions } from "@/app/lib/authOptions";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";

export interface P2PTransfer {
    id: number;
    amount: number;
    timestamp: Date;
    fromUser: {
        number?: string;
        name: string | null;
    };
}

export const getTotalTransactions = async (): Promise<P2PTransfer[]> => {
    const session = await getServerSession(authOptions);
    try {
        const txns = await prisma.p2PTransfer.findMany({
            where: {
                toMerchantId: Number(session?.user.id)
            },
            select: {
                id: true,
                amount: true,
                timestamp: true,
                fromUser: {
                    select: {
                        name: true,
                        number: true
                    }
                }
            }
        })
        return txns.map(t => ({
            id: t.id,
            timestamp: t.timestamp,
            amount: t.amount,
            fromUser: {
                number: t.fromUser.number.toString(),
                name: t.fromUser.name || 'Unknown'
            },
        }));
    } catch (error) {
        console.error(error);
        return []
    }

}