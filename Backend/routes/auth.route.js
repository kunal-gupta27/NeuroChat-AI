import { Router } from "express";
import {
  login,
  register,
  logout,
  user,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/me", protect, user);

router.delete("/logout",protect, logout);

export default router;
