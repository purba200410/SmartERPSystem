import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";

import { getInvoice } from "../controllers/billing.controller.js";

const router = express.Router();

router.get("/:salesVoucherId", authMiddleware, getInvoice);

export default router;