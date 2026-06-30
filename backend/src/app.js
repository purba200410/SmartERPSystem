// src/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import companyRoutes from "./routes/company.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import supplierRoutes from "./routes/supplier.routes.js";
import unitRoutes from "./routes/unit.routes.js";
import stockGroupRoutes from "./routes/stockGroup.routes.js";
import stockItemRoutes from "./routes/stockItem.routes.js";
import ledgerRoutes from "./routes/ledger.routes.js";
import purchaseVoucherRoutes from "./routes/purchaseVoucher.routes.js";
import salesVoucherRoutes from "./routes/salesVoucher.routes.js";
import groupRoutes from "./routes/group.routes.js";
import billingRoutes from "./routes/billing.routes.js";




dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/unit", unitRoutes);
app.use("/api/stock-group", stockGroupRoutes);
app.use("/api/stock-item", stockItemRoutes);
app.use("/api/ledger", ledgerRoutes);
app.use("/api/purchase-voucher", purchaseVoucherRoutes);
app.use("/api/sales-voucher", salesVoucherRoutes);
app.use("/api/group", groupRoutes);
app.use("/api/billing", billingRoutes);


app.get("/", (req, res) => {
  res.json({
    message: "SmartERP API Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});