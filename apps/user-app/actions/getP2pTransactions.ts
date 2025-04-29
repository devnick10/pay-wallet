"use server"
import { authOptions } from "@/app/lib/authOptions";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";

export interface P2PTransfer {
    id: number;
    amount: number;
    timestamp: Date;
    fromUser: {
        id: number;
        number?: string;
        name: string | null;
    };
    toUser: {
        id: number;
        number?: string;
        name: string | null;
    };
}

export async function getP2pTransactions(): Promise<P2PTransfer[]> {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return [];
    }
    const txns = await prisma.p2PTransfer.findMany({
        where: {
            OR: [
                { fromUserId: Number(session.user.id) },
                { toUserId: Number(session.user.id) }
            ]
        },
        select: {
            id: true,
            amount: true,
            timestamp: true,
            toUser: {
                select: {
                    id: true,
                    number: true,
                    name: true
                }
            },
            fromUser: {
                select: {
                    id: true,
                    number: true,
                    name: true
                }
            }
        },
        orderBy: {
            timestamp: 'desc'
        }
    });

    return txns.map(t => ({
        id: t.id,
        timestamp: t.timestamp, 
        amount: t.amount,
        fromUser: {
            id: t.fromUser.id,
            number: t.fromUser.number.toString(),
            name: t.fromUser.name || 'Unknown'
        },
        toUser: {
            id: t.toUser.id,
            number: t.toUser.number,
            name: t.toUser.name || 'Unknown'   
        }
    }));
}