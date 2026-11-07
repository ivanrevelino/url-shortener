import { prisma } from "../database.js";

export async function recordClickAndGetOriginalUrl(
  shortCode: string,
  referrer: string | null,
): Promise<string | null> {
  return prisma.$transaction(async (transaction) => {
    const url = await transaction.url.findUnique({
      where: { shortCode },
      select: { id: true, originalUrl: true },
    });

    if (!url) return null;

    await transaction.urlClick.create({
      data: {
        urlId: url.id,
        referrer,
      },
    });
    await transaction.url.update({
      where: { id: url.id },
      data: { clickCount: { increment: 1 } },
    });

    return url.originalUrl;
  });
}
