"use server";

import { authOptions } from "@/app/lib/authOptions";
import { RevenueData } from "@/lib/types";
import prisma from "@repo/db/client";
import { endOfDay, startOfDay, subDays } from "date-fns";
import { getServerSession } from "next-auth";

export async function getRevenueData(days: number = 30): Promise<RevenueData> {
  const startDate = subDays(new Date(), days);
  const endDate = new Date();
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return {
      data: [],
      success: false,
    };
  }

  try {
    const result = await prisma.p2PTransfer.groupBy({
      by: ["timestamp"],
      where: {
        toMerchantId: Number(session.user.id),
        timestamp: {
          gte: startOfDay(startDate),
          lte: endOfDay(endDate),
        },
      },
      _sum: {
        amount: true,
      },
      orderBy: {
        timestamp: "asc",
      },
    });

    const data = result.map((entry) => ({
      timestamp: entry.timestamp.toISOString(),
      amount: entry._sum.amount ?? 0,
    }));

    return {
      data,
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      data: [],
      success: false,
    };
  }
}
