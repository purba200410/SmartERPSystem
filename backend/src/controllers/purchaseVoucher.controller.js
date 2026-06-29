import prisma from "../config/prisma.js";

// CREATE PURCHASE VOUCHER
export const createPurchaseVoucher = async (req, res) => {
  try {
    const { voucherNumber, supplierId, companyId, items } = req.body;

    const result = await prisma.$transaction(async (tx) => {

      // Calculate Total
      const totalAmount = items.reduce(
        (sum, item) => sum + item.quantity * item.rate,
        0
      );

      // Create Voucher
      const purchaseVoucher = await tx.purchaseVoucher.create({
        data: {
          voucherNumber,
          supplierId,
          companyId,
          totalAmount,
        },
      });

      // Create Voucher Items & Increase Stock
      for (const item of items) {

        await tx.purchaseVoucherItem.create({
          data: {
            purchaseVoucherId: purchaseVoucher.id,
            stockItemId: item.stockItemId,
            quantity: item.quantity,
            rate: item.rate,
            amount: item.quantity * item.rate,
          },
        });

        await tx.stockItem.update({
          where: {
            id: item.stockItemId,
          },
          data: {
            quantity: {
              increment: item.quantity,
            },
          },
        });
      }

      return purchaseVoucher;
    });

    res.status(201).json({
      success: true,
      purchaseVoucher: result,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create Purchase Voucher",
    });
  }
};

// GET ALL PURCHASE VOUCHERS
export const getPurchaseVouchers = async (req, res) => {
  try {

    const { companyId } = req.query;

    const vouchers = await prisma.purchaseVoucher.findMany({
      where: {
        companyId,
      },
      include: {
        supplier: true,
        items: {
          include: {
            stockItem: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      vouchers,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch Purchase Vouchers",
    });

  }
};

// GET SINGLE PURCHASE VOUCHER
export const getPurchaseVoucherById = async (req, res) => {

  try {

    const voucher = await prisma.purchaseVoucher.findUnique({

      where: {
        id: req.params.id,
      },

      include: {
        supplier: true,
        items: {
          include: {
            stockItem: true,
          },
        },
      },

    });

    if (!voucher) {
      return res.status(404).json({
        success: false,
        message: "Purchase Voucher not found",
      });
    }

    res.json({
      success: true,
      voucher,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch Purchase Voucher",
    });

  }

};

// DELETE PURCHASE VOUCHER
export const deletePurchaseVoucher = async (req, res) => {

  try {

    await prisma.purchaseVoucher.delete({
      where: {
        id: req.params.id,
      },
    });

    res.json({
      success: true,
      message: "Purchase Voucher deleted successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete Purchase Voucher",
    });

  }

};