import { Router } from "express";
import {
  aiChat,
  chat,
  deleteThread,
  getAllThread,
  getThread,
} from "../controllers/chat.controller.js";
import { isOwner } from "../middleware/isOwner.js";
import { protect } from "../middleware/auth.js";
import { authorize } from "../middleware/authorize.js";

const router = Router();

//chat
router.post("/ai/chat", aiChat);

// All routes below require login
router.use(protect);

// get all thread
router.get("/thread", getAllThread);

router.post("/chat", chat);

router.get("/thread/:threadId", isOwner, getThread);

// delete chat
router.delete("/thread/:threadId", isOwner, deleteThread);

export default router;
