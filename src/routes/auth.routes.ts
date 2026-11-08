import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import * as authShema from "../schemas/auth.shema.js";

const router = Router();

router.post("/register", validate(authShema.registerShema), register);
router.post("/login", validate(authShema.loginShema),login);

export default router;
