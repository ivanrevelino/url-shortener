import { Router } from "express";
import { redirectToOriginalUrl } from "../controllers/redirect.controller.js";

const router = Router();

router.get("/urls/:shortCode", redirectToOriginalUrl);

export default router;
