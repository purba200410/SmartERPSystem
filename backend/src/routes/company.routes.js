import express from "express";

import {
  createCompany,
  getCompanies,
} from "../controllers/company.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  createCompany
);

router.get(
  "/",
  authMiddleware,
  getCompanies
);

export default router;