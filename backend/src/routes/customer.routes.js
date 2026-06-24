import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  createCustomer,
  getCustomers,
} from "../controllers/customer.controller.js";

const router = express.Router();

router.post("/create", authMiddleware, createCustomer);
router.get("/", authMiddleware, getCustomers);

export default router;