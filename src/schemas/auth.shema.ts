import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email().max(254));

const passwordSchema = z
  .string()
  .min(8, { error: "Password must be at least 8 characters" })
  .refine((password) => Buffer.byteLength(password, "utf8") <= 72, {
    error: "Password must be at most 72 bytes",
  });

export const registerShema = z.object({
  email: emailSchema,
  password: passwordSchema,
  username: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9_]{3,32}$/, {
      error:
        "Username must be 3-32 characters using letters, numbers, or underscores",
    }),
});

export const loginShema = z.object({
  email: emailSchema,
  password: passwordSchema,
});