"use server"
import { authOptions } from "@/app/lib/authOptions";
import { UpdateMerchantData } from "@/lib/types";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth"

export const updateProfile = async (data: UpdateMerchantData) => {
    const session = await getServerSession(authOptions)
    try {
        const updatePayload: Partial<UpdateMerchantData> = {};

        if (data.name?.trim() !== undefined) updatePayload.name = data.name.trim();
        if (data.email?.trim() !== undefined) updatePayload.email = data.email.trim();
        if (data.number?.trim() !== undefined) updatePayload.number = data.number.trim();

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