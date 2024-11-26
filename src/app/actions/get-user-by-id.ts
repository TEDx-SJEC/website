import prisma from "@/server/db"; // Adjust the import based on your structure

export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        role: true, 
      },
    });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    return user;
  } catch (error) {
    console.error("Error getting user by id:", error);
    throw new Error("Failed to get user. Please try again later.");
  }
}
