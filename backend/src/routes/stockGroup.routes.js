import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  createStockGroup,
  getStockGroups,
} from "../controllers/stockGroup.controller.js";

const router = express.Router();

router.post("/create", authMiddleware, createStockGroup);
router.get("/", authMiddleware, getStockGroups);

export default router;