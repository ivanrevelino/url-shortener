import { Router } from "express";
import { createShortUrl } from "../controllers/url.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/urls", authenticate, createShortUrl);

export default router;