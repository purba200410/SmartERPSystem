import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  createSupplier,
  getSuppliers,
} from "../controllers/supplier.controller.js";

const router = express.Router();

router.post("/create", authMiddleware, createSupplier);
router.get("/", authMiddleware, getSuppliers);

export default router;