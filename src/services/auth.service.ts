import bcrypt from "bcryptjs";
import { AppError } from "../errors/app-error.js";
import { createUser, findUserByEmail } from "../repositories/auth.repository.js";
import { createAccessToken } from "../security/jwt.js";
import type { z } from "zod";
import type {
  loginShema,
  registerShema,
} from "../schemas/auth.shema.js";

type RegisterInput = z.infer<typeof registerShema>;
type LoginInput = z.infer<typeof loginShema>;

export async function register(input: RegisterInput) {

  if (await findUserByEmail(input.email) !== null) {
    throw new AppError("User already exists", 400)
  }

  const passwordHash = await bcrypt.hash(input.password, 12);


  const user = await createUser(input.username, input.email, passwordHash);
  const token = createAccessToken({ id: user.id, username: user.username });

  return { user, token };
}

export async function login(credentials: LoginInput) {
  const user = await findUserByEmail(credentials.email);

  if (!user || !(await bcrypt.compare(credentials.password, user.passwordHash))) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = createAccessToken({ id: user.id, username: user.username });
  return token;
}
