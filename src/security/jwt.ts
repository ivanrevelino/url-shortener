import "dotenv/config";
import jwt, { type JwtPayload } from "jsonwebtoken";
import type { AuthenticatedUser } from "../types/express.js";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret || Buffer.byteLength(secret) < 32) {
    throw new Error("JWT_SECRET must be set and contain at least 32 bytes");
  }
  return secret;
}

const jwtSecret = getJwtSecret();

export function createAccessToken(user: AuthenticatedUser): string {
  return jwt.sign(
    { id: user.id, username: user.username },
    jwtSecret,
    { algorithm: "HS256", expiresIn: "1h" },
  );
}

export function verifyAccessToken(token: string): AuthenticatedUser | null {
  try {
    const payload = jwt.verify(token, jwtSecret, {
      algorithms: ["HS256"],
    }) as JwtPayload;

    if (
      typeof payload.id !== "number" ||
      !Number.isSafeInteger(payload.id) ||
      typeof payload.username !== "string"
    ) {
      return null;
    }

    return { id: payload.id, username: payload.username };
  } catch {
    return null;
  }
}
