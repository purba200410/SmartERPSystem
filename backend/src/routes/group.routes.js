import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";

import {
  createGroup,
  getGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
} from "../controllers/group.controller.js";

const router = express.Router();

router.post("/create", authMiddleware, createGroup);

router.get("/", authMiddleware, getGroups);

router.get("/:id", authMiddleware, getGroupById);

router.put("/:id", authMiddleware, updateGroup);

router.delete("/:id", authMiddleware, deleteGroup);

export default router;