import { prisma } from "../database.js";

export async function findOriginalUrl(shortCode: string): Promise<string | null> {
  const url = await prisma.url.findUnique({
    where: { shortCode },
    select: { originalUrl: true },
  });

  return url?.originalUrl ?? null;
}
