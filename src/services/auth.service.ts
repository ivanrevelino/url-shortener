import bcrypt from "bcryptjs";
import { AppError } from "../errors/app-error.js";
import { createUser, findUserByEmail } from "../repositories/auth.repository.js";
import { createAccessToken } from "../security/jwt.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernamePattern = /^[a-zA-Z0-9_]{3,32}$/;
const passwordMinimumLength = 8;
const passwordMaximumBytes = 72;

interface AuthCredentials {
  email: string;
  password: string;
}

function getCredentials(value: unknown): AuthCredentials {
  if (typeof value !== "object" || value === null) {
    throw new AppError("Email and password are required", 400);
  }

  const body = value as Record<string, unknown>;
  if (typeof body.email !== "string" || typeof body.password !== "string") {
    throw new AppError("Email and password are required", 400);
  }

  const email = body.email.trim().toLowerCase();
  if (email.length > 254 || !emailPattern.test(email)) {
    throw new AppError("A valid email is required", 400);
  }

  if (
    body.password.length < passwordMinimumLength ||
    Buffer.byteLength(body.password, "utf8") > passwordMaximumBytes
  ) {
    throw new AppError(
      "Password must be at least 8 characters and at most 72 bytes",
      400,
    );
  }

  return { email, password: body.password };
}

export async function register(value: unknown) {
  const credentials = getCredentials(value);
  const body = value as Record<string, unknown>;

  if (typeof body.username !== "string") {
    throw new AppError("A username is required", 400);
  }

  const username = body.username.trim().toLowerCase();
  if (!usernamePattern.test(username)) {
    throw new AppError(
      "Username must be 3-32 characters using letters, numbers, or underscores",
      400,
    );
  }

  const passwordHash = await bcrypt.hash(credentials.password, 12);
  const user = await createUser(username, credentials.email, passwordHash);
  const token = createAccessToken({ id: user.id, username: user.username });

  return { user, token };
}

export async function login(value: unknown) {
  const credentials = getCredentials(value);
  const user = await findUserByEmail(credentials.email);

  if (!user || !(await bcrypt.compare(credentials.password, user.passwordHash))) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = createAccessToken({ id: user.id, username: user.username });
  return {
    token
  };
}
