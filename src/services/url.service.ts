import { createUrl } from "../repositories/url.repository.js";

export class InvalidUrlError extends Error {
  constructor() {
    super("A valid HTTP or HTTPS URL is required");
    this.name = "InvalidUrlError";
  }
}

export async function shortenUrl(value: unknown) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new InvalidUrlError();
  }

  let url: URL;
  try {
    url = new URL(value.trim());
  } catch {
    throw new InvalidUrlError();
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new InvalidUrlError();
  }

  return createUrl(url.toString());
}
