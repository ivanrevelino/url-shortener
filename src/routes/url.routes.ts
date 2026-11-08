import { Router } from "express";
import { createShortUrl } from "../controllers/url.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createUrlShema } from "../schemas/url.schema.js";

const router = Router();

router.post("/", authenticate, validate(createUrlShema), createShortUrl);

export default router;