import prisma from "@/server/db"; // Adjust the import based on your structure

export async function getUserById(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      role: true, // Include any other fields you need
    },
  });

  return user;
}
