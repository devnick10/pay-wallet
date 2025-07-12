"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
  const session = await getServerSession(authOptions);
  const sender = session?.user;

  if (!sender?.id) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const [toUser, toMerchant] = await Promise.all([
    prisma.user.findFirst({ where: { number: to } }),
    prisma.merchant.findFirst({ where: { number: to } }),
  ]);

  if (!toUser && !toMerchant) {
    return {
      success: false,
      message: "Invalid user or merchant phone number",
    };
  }

  try {
    const p2p = await prisma.$transaction(async (txn) => {
      // Lock sender's balance
      await txn.$executeRaw`SELECT 1 FROM "Balance" WHERE "userId" = ${Number(sender.id)} FOR UPDATE`;

      const fromBalance = await txn.balance.findUnique({
        where: { userId: Number(sender.id) },
        select: { amount: true },
      });

      if (!fromBalance || fromBalance.amount < amount) {
        throw new Error("Insufficient funds");
      }

      // Deduct from sender
      await txn.balance.update({
        where: { userId: Number(sender.id) },
        data: { amount: { decrement: amount } },
      });

      // Credit receiver
      if (toUser) {
        await txn.balance.update({
          where: { userId: toUser.id },
          data: { amount: { increment: amount } },
        });

        const p2p = await txn.p2PTransfer.create({
          data: {
            fromUserId: Number(sender.id),
            toUserId: toUser.id,
            amount,
            timestamp: new Date(),
          },
        });

        return {
          id: p2p.id,
          timestamp: p2p.timestamp,
          amount: p2p.amount,
          fromUser: {
            id: p2p.fromUserId,
            number: sender.email?.toString(),
            name: sender.name || "Unknown",
          },
          toUser: {
            id: p2p.toUserId ?? undefined,
            number: toUser.number || undefined,
            name: toUser.name || "Unknown",
          },
        };
      } else if (toMerchant) {
        await txn.balance.update({
          where: { merchantId: toMerchant.id },
          data: { amount: { increment: amount } },
        });

        const p2p = await txn.p2PTransfer.create({
          data: {
            fromUserId: Number(sender.id),
            toMerchantId: toMerchant.id,
            amount,
            timestamp: new Date(),
          },
        });

        return {
          id: p2p.id,
          timestamp: p2p.timestamp,
          amount: p2p.amount,
          fromUser: {
            id: p2p.fromUserId,
            number: sender.email?.toString(),
            name: sender.name || "Unknown",
          },
          toUser: {
            id: p2p.toMerchantId ?? undefined,
            number: toMerchant.number || undefined,
            name: toMerchant.name || "Unknown",
          },
        };
      }
    });

    return {
      success: true,
      message: "Transfer successful",
      p2p,
    };
  } catch (error) {
    console.error("Transfer failed:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error during transfer",
    };
  }
}
