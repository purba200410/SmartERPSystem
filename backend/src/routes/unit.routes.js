import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  createUnit,
  getUnits,
} from "../controllers/unit.controller.js";

const router = express.Router();

router.post("/create", authMiddleware, createUnit);
router.get("/", authMiddleware, getUnits);

export default router;