import { z } from "zod";

export const createUrlShema = z.object({
  originalUrl: z
    .string()
    .trim()
    .pipe(
      z.url({
        protocol: /^https?$/,
        error: "A valid HTTP or HTTPS URL is required",
      }),
    )
    .transform((value) => new URL(value).toString()),
});