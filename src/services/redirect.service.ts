import { recordClickAndGetOriginalUrl } from "../repositories/redirect.repository.js";

function getReferrerDomain(referrer: string | undefined): string | null {
  if (!referrer) return null;

  try {
    return new URL(referrer).hostname || null;
  } catch {
    return null;
  }
}

export function getOriginalUrl(
  shortCode: string,
  referrer: string | undefined,
): Promise<string | null> {
  if (!/^[a-z0-9]{8}$/i.test(shortCode)) {
    return Promise.resolve(null);
  }

  return recordClickAndGetOriginalUrl(
    shortCode.toLowerCase(),
    getReferrerDomain(referrer),
  );
}
