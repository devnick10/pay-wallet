"use server";
import { authOptions } from "@/app/lib/authOptions";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";

export async function getMerchantInfo() {
  const session = await getServerSession(authOptions);
  try {
    const merchant = await prisma.merchant.findUnique({
      where: {
        id: Number(session?.user?.id),
      },
      select: {
        name: true,
        email: true,
        number: true,
      },
    });

    if (merchant) {
      return {
        success: true,
        data: {
          name: merchant.name,
          email: merchant.email,
          number: merchant.number,
        },
      };
    }

    return {
      success: false,
      data: {
        name: "",
        email: "",
        number: "",
      },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data: {
        name: "",
        email: "",
        number: "",
      },
    };
  }
}
