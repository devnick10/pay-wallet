"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import prisma from "@repo/db/client";


export async function p2pTransfer(to: string, amount: number) {

    const session = await getServerSession(authOptions)
    const senderId = session?.user.id;

    if (!senderId) {
        return {
            message: "Error while sending"
        }
    }

    const toUser = await prisma.user.findFirst({
        where: {
            number: to
        }
    })



    if (toUser) {
        try {

            await prisma.$transaction(async (txn) => {
                await txn.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(senderId)} FOR UPDATE`

                const fromBalace = await txn.balance.findUnique({
                    where: {
                        userId: Number(senderId)
                    }
                })

                if (!fromBalace || fromBalace.amount < amount) {
                    throw new Error("Insufficient funds")
                }

                await txn.balance.update({
                    where: { userId: Number(senderId) },
                    data: { amount: { decrement: amount } }
                })

                await txn.balance.update({
                    where: {
                        userId: toUser.id
                    },
                    data: {
                        amount: { increment: amount }
                    }
                })

                await txn.p2PTransfer.create({
                    data: {
                        fromUserId: Number(senderId),
                        toUserId: toUser.id,
                        amount,
                        timestamp: new Date()
                    }
                })

            })

            return {
                message: "Transfer success"
            }

        } catch (error) {
            console.error(error)
            return {
                message: "Error while transfer"
            }
        }
    }

    const toMerchant = await prisma.merchant.findFirst({
        where: {
            number: to
        }
    })

    if (toMerchant) {
        try {

            await prisma.$transaction(async (txn) => {
                await txn.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(senderId)} FOR UPDATE`

                const fromBalace = await txn.balance.findUnique({
                    where: {
                        userId: Number(senderId)
                    }
                })

                if (!fromBalace || fromBalace.amount < amount) {
                    throw new Error("Insufficient funds")
                }

                await txn.balance.update({
                    where: { userId: Number(senderId) },
                    data: { amount: { decrement: amount } }
                })

                await txn.balance.update({
                    where: {
                        merchantId: toMerchant.id
                    },
                    data: {
                        amount: { increment: amount }
                    }
                })

                await txn.p2PTransfer.create({
                    data: {
                        fromUserId: Number(senderId),
                        toMerchantId: toMerchant.id,
                        amount,
                        timestamp: new Date()
                    }
                })
            })

            return {
                message: "Transfer success"
            }

        } catch (error) {
            console.error(error)
            return {
                message: "Error while transfer"
            }
        }
    }

    if (!toUser || !toMerchant) {
        return {
            message: "Invalid user or merchant phone number"
        }
    }
}