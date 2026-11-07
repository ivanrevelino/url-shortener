import { randomInt } from "node:crypto";
import { Prisma } from "@prisma/client";
import { prisma } from "../database.js";

const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
const shortCodeLength = 8;
const maxAttempts = 5;

function generateShortCode(): string {
  return Array.from(
    { length: shortCodeLength },
    () => alphabet[randomInt(alphabet.length)],
  ).join("");
}

export async function createUrl(originalUrl: string, ownerId: number) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await prisma.url.create({
        data: {
          originalUrl,
          shortCode: generateShortCode(),
          ownerId,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        continue;
      }

      throw error;
    }
  }

  throw new Error("Could not generate a unique short code after several attempts");
}
