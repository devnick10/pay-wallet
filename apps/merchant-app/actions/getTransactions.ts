import { authOptions } from "@/app/lib/authOptions"
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth"

export const getTransactions = async () => {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
        return []
    }

    try {
        const transactions = await prisma.p2PTransfer.findMany({
            where: {
                fromUserId: Number(session.user.id)
            },
            select: {
                id: true,
                amount: true,
                fromUser: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                }
            }
        })        
        return transactions;
    } catch (error) {
        console.error(error);
        return [];
    }
}