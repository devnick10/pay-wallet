"use server"

import { authOptions } from "@/app/lib/authOptions";
import prisma from "@repo/db/client"
import { getServerSession } from "next-auth";

interface passowrdData {
    currentPassword: string;
    newPassword: string;
    confirmPassowrd: string;
}

export const updatePassword = async (data: passowrdData) => {
    const session = await getServerSession(authOptions);
    try {

        const user = await prisma.user.findUnique({
            where:{
                id:Number(session?.user.id)
            }
        })

        if (user) {
            await prisma.user.update({
                where: { id: user?.id },
                data: {
                    password: data.newPassword
                }
            });

            return {
                success: true,
                message: "Password updated successfully",
            };
        }

        return {
            success: false,
            message: "Failed to update password"
        };

    } catch (error) {
        console.error("Password update error:", error);
        return {
            success: false,
            message: "Failed to update password"
        };
    }
}