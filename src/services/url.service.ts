import { createUrl } from "../repositories/url.repository.js";
import type { z } from "zod";
import type { createUrlShema } from "../schemas/url.schema.js";

type CreateUrlInput = z.infer<typeof createUrlShema>;

export async function shortenUrl(value: CreateUrlInput["originalUrl"], ownerId: number) {
  return createUrl(value, ownerId);
}
