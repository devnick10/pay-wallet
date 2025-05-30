"use server"
import { UpdateMerchantData } from "@/lib/types";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth"

export const updateProfile = async (data: UpdateMerchantData) => {
    const session = await getServerSession()
    try {
        const updatePayload: Partial<UpdateMerchantData> = {};

        if (data.name !== undefined) updatePayload.name = data.name;
        if (data.email !== undefined) updatePayload.email = data.email;

        await prisma.merchant.update({
            where: { id: Number(session?.user.id) },
            data: updatePayload
        });

        return {
            success: true,
            message: "Profile updated successfully",
        };
    } catch (error) {
        console.error("Profile update error:", error);
        return {
            success: false,
            message: "Failed to update profile"
        };
    }

}