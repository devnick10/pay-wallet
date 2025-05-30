'use server'

import { authOptions } from "@/app/lib/authOptions"
import { StoreCategory, StoreData } from "@/lib/types"
import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"

export const addStoreInfo = async (storeData: StoreData) => {
    const session = await getServerSession(authOptions);
    const updatePayload: Partial<StoreData> = {};

    if (storeData.name !== undefined) updatePayload.name = storeData.name;
    if (storeData.description !== undefined) updatePayload.name = storeData.description;
    if (storeData.category !== undefined) updatePayload.name = storeData.category;

    if (!Object.values(StoreCategory).includes(storeData.category)) {
        return {
            success: false,
            message: "Invalid store category"
        }
    }
    try {

        await prisma.store.upsert({
            where: {
                merchantId: Number(session?.user.id)
            },
            update: {
                ...updatePayload
            },
            create: {
                name: storeData.name,
                description: storeData.description,
                merchantId: Number(session?.user.id),
                category: storeData.category
            }
        })

        return {
            success: true,
            message: "Info upserted"
        }
    } catch (error) {
        console.error(error)
        return {
            success: false,
            message: "Internal server error"
        }
    }
}