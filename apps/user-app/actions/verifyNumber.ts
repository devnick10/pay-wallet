"use server"
import prisma from "@repo/db/client"

export const verifyNumber = async (phoneNumber: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { number: phoneNumber },
        });

        if (user) {
            return {
                success: true,
            };
        }
        return { success: false };
    } catch (error) {
        console.error("Number verify error", error);
        return {
            success: false,
        };
    }
}