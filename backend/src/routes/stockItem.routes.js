import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  createStockItem,
  getStockItems,
} from "../controllers/stockItem.controller.js";

const router = express.Router();

router.post("/create", authMiddleware, createStockItem);
router.get("/", authMiddleware, getStockItems);

export default router;