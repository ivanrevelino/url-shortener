import { Prisma } from "@prisma/client";
import { prisma } from "../database.js";
import { AppError } from "../errors/app-error.js";

export async function createUser(
  username: string,
  email: string,
  passwordHash: string,
) {
  try {
    return await prisma.user.create({
      data: { username, email, passwordHash },
      select: { id: true, username: true, email: true },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new AppError("Username or email is already in use", 409);
    }

    throw error;
  }
}

export function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    select: { id: true, username: true, email: true, passwordHash: true },
  });
}
