import prisma from "@repo/db/client";

export async function storeOtp(phoneNumber: string, otp: number) {
    try {
        await prisma.otp.upsert({
            where:{
                number:phoneNumber
            },
            update: {
                otp,
                expiresAt: new Date(Date.now() + 10 * 60 * 1000)
            },
            create:{number:phoneNumber,otp,expiresAt:new Date(Date.now() + 10 * 60 * 1000)}
        });
        return true
    } catch (error) {
        console.error(error);
        return false
    }
}

export async function verifyOtp(phoneNumber: string, otp: number) {
    try {
        const record = await prisma.otp.findUnique({
            where: { number: phoneNumber },
        });

        if (!record || record.otp !== otp || record.expiresAt < new Date()) {
            return false;
        }

        await prisma.otp.delete({ where: { number: phoneNumber } });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}