import type { RequestHandler } from "express";
import { AppError } from "../errors/app-error.js";
import { verifyAccessToken } from "../security/jwt.js";

export const authenticate: RequestHandler = (request, _response, next) => {
  const authorization = request.get("authorization");
  const match = authorization?.match(/^Bearer\s+(\S+)$/i);

  if (!match) {
    next(new AppError("Authentication required", 401));
    return;
  }

  const user = verifyAccessToken(match[1]);
  if (!user) {
    next(new AppError("Invalid or expired token", 401));
    return;
  }

  request.user = user;
  next();
};
