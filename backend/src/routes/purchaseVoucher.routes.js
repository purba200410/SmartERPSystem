import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
  createPurchaseVoucher,
  getPurchaseVouchers,
  getPurchaseVoucherById,
  deletePurchaseVoucher,
} from "../controllers/purchaseVoucher.controller.js";

const router = express.Router();

router.post("/create", authMiddleware, createPurchaseVoucher);

router.get("/", authMiddleware, getPurchaseVouchers);

router.get("/:id", authMiddleware, getPurchaseVoucherById);

router.delete("/:id", authMiddleware, deletePurchaseVoucher);

export default router;