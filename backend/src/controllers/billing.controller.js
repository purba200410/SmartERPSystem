import prisma from "../config/prisma.js";

// GENERATE INVOICE

export const getInvoice = async (req, res) => {
  try {
    const { salesVoucherId } = req.params;

    const voucher = await prisma.salesVoucher.findUnique({
      where: {
        id: salesVoucherId,
      },

      include: {
        customer: true,
        company: true,
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
        message: "Invoice not found",
      });
    }

    const subtotal = voucher.items.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    const gst = subtotal * 0.18;

    const grandTotal = subtotal + gst;

    res.json({
      success: true,

      invoice: {
        invoiceNumber: voucher.voucherNumber,

        date: voucher.createdAt,

        company: {
          name: voucher.company.name,
          phone: voucher.company.phone,
          email: voucher.company.email,
          address: voucher.company.address,
          gstNumber: voucher.company.gstNumber,
        },

        customer: {
          name: voucher.customer.name,
          phone: voucher.customer.phone,
          email: voucher.customer.email,
          address: voucher.customer.address,
        },

        items: voucher.items.map((item) => ({
          itemName: item.stockItem.name,
          quantity: item.quantity,
          rate: item.rate,
          amount: item.amount,
        })),

        subtotal,

        gst,

        grandTotal,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate Invoice",
    });
  }
};