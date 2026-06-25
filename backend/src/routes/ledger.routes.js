import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";

import {
  createLedger,
  getLedgers,
} from "../controllers/ledger.controller.js";

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  createLedger
);

router.get(
  "/",
  authMiddleware,
  getLedgers
);

export default router;