"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import prisma from "@repo/db/client";
import { randomUUID } from "crypto";

export async function createOnRampTransaction(
  amount: number,
  provider: string,
) {
  const token = randomUUID();
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  if (!userId) {
    return {
      message: "User not logged in",
    };
  }
  try {
    const [onRampTxns, balance] = await prisma.$transaction([
      prisma.onRampTransaction.create({
        data: {
          userId: Number(userId),
          amount: amount * 100,
          status: "Processing",
          startTime: new Date(),
          provider,
          token: token,
        },
      }),

      prisma.balance.update({
        where: { userId: Number(session.user.id) },
        data: {
          locked: { increment: amount * 100 },
        },
      }),
    ]);
    if (onRampTxns && balance) {
      return {
        success: true,
        message: "OnRampTransactions added.",
        onRampTxns: {
          ...onRampTxns,
          time: onRampTxns.startTime,
          id: String(onRampTxns.id),
        },
        balance,
      };
    }
    return {
      success: false,
      message: "Internal server error",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Internal server error",
    };
  }
}
