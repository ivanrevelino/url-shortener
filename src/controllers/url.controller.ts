import type { RequestHandler } from "express";
import { AppError } from "../errors/app-error.js";
import { shortenUrl } from "../services/url.service.js";

export const createShortUrl: RequestHandler = async (request, response) => {
  if (!request.user) {
    throw new AppError("Authentication required", 401);
  }

  const url = await shortenUrl(request.body.originalUrl, request.user.id);

  response.status(201).json({
    id: url.id,
    originalUrl: url.originalUrl,
    shortCode: url.shortCode,
    shortUrl: `/${url.shortCode}`,
  });
};
