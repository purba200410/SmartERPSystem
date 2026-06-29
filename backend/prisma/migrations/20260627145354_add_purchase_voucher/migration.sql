-- CreateTable
CREATE TABLE "PurchaseVoucher" (
    "id" TEXT NOT NULL,
    "voucherNumber" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PurchaseVoucher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseVoucherItem" (
    "id" TEXT NOT NULL,
    "purchaseVoucherId" TEXT NOT NULL,
    "stockItemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PurchaseVoucherItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseVoucher_voucherNumber_key" ON "PurchaseVoucher"("voucherNumber");

-- AddForeignKey
ALTER TABLE "PurchaseVoucher" ADD CONSTRAINT "PurchaseVoucher_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseVoucher" ADD CONSTRAINT "PurchaseVoucher_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseVoucherItem" ADD CONSTRAINT "PurchaseVoucherItem_purchaseVoucherId_fkey" FOREIGN KEY ("purchaseVoucherId") REFERENCES "PurchaseVoucher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseVoucherItem" ADD CONSTRAINT "PurchaseVoucherItem_stockItemId_fkey" FOREIGN KEY ("stockItemId") REFERENCES "StockItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
