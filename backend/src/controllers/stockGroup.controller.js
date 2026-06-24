import prisma from "../config/prisma.js";

export const createStockGroup = async (req, res) => {
  try {
    const { name, companyId } = req.body;

    const stockGroup = await prisma.stockGroup.create({
      data: {
        name,
        companyId,
      },
    });

    res.status(201).json({
      success: true,
      stockGroup,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create stock group",
    });
  }
};

export const getStockGroups = async (req, res) => {
  try {
    const { companyId } = req.query;

    const groups = await prisma.stockGroup.findMany({
      where: {
        companyId,
      },
    });

    res.json({
      success: true,
      groups,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch stock groups",
    });
  }
};