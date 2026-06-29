import prisma from "../config/prisma.js";

// CREATE SALES VOUCHER
export const createSalesVoucher = async (req, res) => {
  try {
    const { voucherNumber, customerId, companyId, items } = req.body;

    const result = await prisma.$transaction(async (tx) => {

      let totalAmount = 0;

      // Check stock availability
      for (const item of items) {

        const stock = await tx.stockItem.findUnique({
          where: {
            id: item.stockItemId,
          },
        });

        if (!stock) {
          throw new Error(`Stock Item not found: ${item.stockItemId}`);
        }

        if (stock.quantity < item.quantity) {
          throw new Error(
            `${stock.name} has only ${stock.quantity} items in stock`
          );
        }

        totalAmount += item.quantity * item.rate;
      }

      // Create Sales Voucher
      const salesVoucher = await tx.salesVoucher.create({
        data: {
          voucherNumber,
          customerId,
          companyId,
          totalAmount,
        },
      });

      // Create Items & Reduce Stock
      for (const item of items) {

        await tx.salesVoucherItem.create({
          data: {
            salesVoucherId: salesVoucher.id,
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
              decrement: item.quantity,
            },
          },
        });
      }

      return salesVoucher;
    });

    res.status(201).json({
      success: true,
      salesVoucher: result,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// GET ALL SALES VOUCHERS

export const getSalesVouchers = async (req, res) => {

  try {

    const { companyId } = req.query;

    const vouchers = await prisma.salesVoucher.findMany({

      where: {
        companyId,
      },

      include: {
        customer: true,
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
      message: "Failed to fetch Sales Vouchers",
    });

  }

};

// GET SINGLE SALES VOUCHER

export const getSalesVoucherById = async (req, res) => {

  try {

    const voucher = await prisma.salesVoucher.findUnique({

      where: {
        id: req.params.id,
      },

      include: {
        customer: true,
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
        message: "Sales Voucher not found",
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
      message: "Failed to fetch Sales Voucher",
    });

  }

};

// DELETE SALES VOUCHER

export const deleteSalesVoucher = async (req, res) => {

  try {

    await prisma.salesVoucher.delete({

      where: {
        id: req.params.id,
      },

    });

    res.json({
      success: true,
      message: "Sales Voucher deleted successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete Sales Voucher",
    });

  }

};