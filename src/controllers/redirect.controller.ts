import type { RequestHandler } from "express";
import { getOriginalUrl } from "../services/redirect.service.js";

export const redirectToOriginalUrl: RequestHandler = async (request, response) => {
  const shortCode = request.params.shortCode;
  const code = Array.isArray(shortCode) ? shortCode[0] ?? "" : shortCode;
  const originalUrl = await getOriginalUrl(code);

  if (!originalUrl) {
    response.sendStatus(404);
    return;
  }

  response.redirect(302, originalUrl);
};
