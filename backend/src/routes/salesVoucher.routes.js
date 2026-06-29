import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";

import {
  createSalesVoucher,
  getSalesVouchers,
  getSalesVoucherById,
  deleteSalesVoucher,
} from "../controllers/salesVoucher.controller.js";

const router = express.Router();

router.post("/create", authMiddleware, createSalesVoucher);

router.get("/", authMiddleware, getSalesVouchers);

router.get("/:id", authMiddleware, getSalesVoucherById);

router.delete("/:id", authMiddleware, deleteSalesVoucher);

export default router;