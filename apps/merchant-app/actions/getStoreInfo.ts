'use server'

import { authOptions } from "@/app/lib/authOptions"
import { StoreCategory } from "@/lib/types"
import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"

export const getStoreInfo = async () => {
    const session = await getServerSession(authOptions);

    try {
        const store = await prisma.store.findUnique({
            where: {
                merchantId: Number(session?.user.id)
            },
            select: {
                name: true,
                description: true,
                category: true
            }
        })

        if (!store) {
            throw new Error("Internal server error")
        }

        return {
            success: true,
            data: {
                ...store,
                category: store.category as StoreCategory
            }
        }
    } catch (error) {
        console.error(error)
        return {
            success: false,
            data: null
        }
    }
}