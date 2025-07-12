"use server";

import { authOptions } from "@/app/lib/authOptions";
import { StoreCategory, StoreData } from "@/lib/types";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";

export const addStoreInfo = async (storeData: StoreData) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  if (!Object.values(StoreCategory).includes(storeData.category)) {
    return {
      success: false,
      message: "Invalid store category",
    };
  }

  const updatePayload: Partial<StoreData> = {};

  if (storeData.name !== undefined) updatePayload.name = storeData.name;
  if (storeData.description !== undefined)
    updatePayload.description = storeData.description;
  if (storeData.category !== undefined)
    updatePayload.category = storeData.category;

  try {
    // check if store exists
    const existingStore = await prisma.store.findUnique({
      where: {
        merchantId: Number(session.user.id),
      },
    });

    if (existingStore) {
      await prisma.store.update({
        where: {
          merchantId: Number(session.user.id),
        },
        data: updatePayload,
      });
    } else {
      await prisma.store.create({
        data: {
          name: storeData.name,
          description: storeData.description,
          category: storeData.category,
          merchantId: Number(session.user.id),
        },
      });
    }

    return {
      success: true,
      message: "Info upserted",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Internal server error",
    };
  }
};
