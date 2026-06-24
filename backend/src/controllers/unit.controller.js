import prisma from "../config/prisma.js";

export const createUnit = async (req, res) => {
  try {
    const { name, companyId } = req.body;

    const unit = await prisma.unit.create({
      data: {
        name,
        companyId,
      },
    });

    res.status(201).json({
      success: true,
      unit,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create unit",
    });
  }
};

export const getUnits = async (req, res) => {
  try {
    const { companyId } = req.query;

    const units = await prisma.unit.findMany({
      where: {
        companyId,
      },
    });

    res.json({
      success: true,
      units,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch units",
    });
  }
};