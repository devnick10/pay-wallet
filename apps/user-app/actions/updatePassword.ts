"use server"

import { authOptions } from "@/app/lib/authOptions";
import prisma from "@repo/db/client"
import { getServerSession } from "next-auth";
import bcrypt from "bcrypt"
interface passowrdData {
    number?: string;
    currentPassword?: string;
    newPassword: string;
}

export const updatePassword = async (data: passowrdData) => {
    const session = await getServerSession(authOptions);
    const hashedpassword = await bcrypt.hash(data.newPassword, 10)

    try {

        if (!session?.user.id) {
            await prisma.user.update({
                where: { number: data.number },
                data: {
                    password: hashedpassword
                }
            });
            return {
                success: true,
                message: "Password updated successfully",
            };
        }

        await prisma.user.update({
            where: { id: Number(session.user.id) },
            data: {
                password: hashedpassword
            }
        });

        return {
            success: true,
            message: "Password updated successfully",
        };
    } catch (error) {
        console.error("Password update error:", error);
        return {
            success: false,
            message: "Failed to update password"
        };
    }
}