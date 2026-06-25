import prisma from "../config/prisma.js";

export const createLedger = async (req, res) => {
  try {
    const {
      name,
      type,
      openingBalance,
      companyId,
    } = req.body;

    const ledger = await prisma.ledger.create({
      data: {
        name,
        type,
        openingBalance,
        companyId,
      },
    });

    res.status(201).json({
      success: true,
      ledger,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create ledger",
    });
  }
};

export const getLedgers = async (req, res) => {
  try {
    const { companyId } = req.query;

    const ledgers = await prisma.ledger.findMany({
      where: {
        companyId,
      },
      orderBy: {
        name: "asc",
      },
    });

    res.json({
      success: true,
      ledgers,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch ledgers",
    });
  }
};