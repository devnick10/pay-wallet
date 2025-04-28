"use server"
import { authOptions } from "@/app/lib/authOptions";
import prisma from "@repo/db/client"
import { getServerSession } from "next-auth";

interface UpdateUserData {
  name?: string;
  email?: string;
}

export const updateUser = async (data: UpdateUserData) => {
  const session = await getServerSession(authOptions);
  try {
    const updatePayload: Partial<UpdateUserData> = {};

    if (data.name !== undefined) updatePayload.name = data.name;
    if (data.email !== undefined) updatePayload.email = data.email;

    await prisma.user.update({
      where: { id: Number(session?.user.id) },
      data: updatePayload
    });

    return {
      success: true,
      message: "User updated successfully",
    };
  } catch (error) {
    console.error("User update error:", error);
    return {
      success: false,
      message: "Failed to update user"
    };
  }
}