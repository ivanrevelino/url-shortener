import { findOriginalUrl } from "../repositories/redirect.repository.js";

export function getOriginalUrl(shortCode: string): Promise<string | null> {
  if (!/^[a-z0-9]{8}$/i.test(shortCode)) {
    return Promise.resolve(null);
  }

  return findOriginalUrl(shortCode.toLowerCase());
}
