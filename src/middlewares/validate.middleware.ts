import type { RequestHandler } from "express";
import type { ZodType } from "zod";

export function validate(schema: ZodType): RequestHandler {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        message: "Validation failed",
        error: result.error.issues,
      });
      return;
    }

    req.body = result.data;
    next();
  };
}