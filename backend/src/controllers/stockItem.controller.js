import prisma from "../config/prisma.js";

export const createStockItem = async (req, res) => {
  try {
    const {
      name,
      quantity,
      purchasePrice,
      sellingPrice,
      companyId,
      unitId,
      stockGroupId,
    } = req.body;

    const item = await prisma.stockItem.create({
      data: {
        name,
        quantity,
        purchasePrice,
        sellingPrice,
        companyId,
        unitId,
        stockGroupId,
      },
    });

    res.status(201).json({
      success: true,
      item,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create stock item",
    });
  }
};

export const getStockItems = async (req, res) => {
  try {
    const { companyId } = req.query;

    const items = await prisma.stockItem.findMany({
      where: {
        companyId,
      },
      include: {
        unit: true,
        stockGroup: true,
      },
    });

    res.json({
      success: true,
      items,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch stock items",
    });
  }
};