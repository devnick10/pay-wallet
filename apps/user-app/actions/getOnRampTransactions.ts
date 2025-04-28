"use server"
import { authOptions } from "@/app/lib/authOptions";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";

export interface OnRampTransaction {
    id: string;
    time: Date;
    provider: string;
    amount: number;
    status: "Success" | "Failure" | "Processing";
}
export async function getOnRampTransactions(): Promise<OnRampTransaction[]> {
    const session = await getServerSession(authOptions);
    try {
        const txns = await prisma.onRampTransaction.findMany({
            where: {
                userId: Number(session?.user.id)
            }
        });
        return txns.map((t:{
            id: number;
            token: string;
            userId: number;
            amount: number;
            status: "Success" | "Failure" | "Processing";
            provider: string;
            startTime: Date;
        }) => ({
            id: t.id.toString(),
            time: t.startTime,
            amount: t.amount,
            status: t.status,
            provider: t.provider
        }))
    } catch (error) {
        console.error(error)
        throw new Error("Failed to fetch onramptarsactios")
    }
}