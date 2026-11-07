import type { RequestHandler } from "express";
import { AppError } from "../errors/app-error.js";
import { shortenUrl } from "../services/url.service.js";

export const createShortUrl: RequestHandler = async (request, response) => {
  const body: unknown = request.body;
  const originalUrl =
    typeof body === "object" && body !== null && "originalUrl" in body
      ? body.originalUrl
      : undefined;

  if (!request.user) {
    throw new AppError("Authentication required", 401);
  }

  const url = await shortenUrl(originalUrl, request.user.id);

  response.status(201).json({
    id: url.id,
    originalUrl: url.originalUrl,
    shortCode: url.shortCode,
    shortUrl: `/${url.shortCode}`,
  });
};
