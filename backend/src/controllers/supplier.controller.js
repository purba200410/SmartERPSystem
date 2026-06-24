import prisma from "../config/prisma.js";

export const createSupplier = async (req, res) => {
  try {
    const { name, phone, email, address, companyId } = req.body;

    const supplier = await prisma.supplier.create({
      data: {
        name,
        phone,
        email,
        address,
        companyId,
      },
    });

    res.status(201).json({
      success: true,
      supplier,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create supplier",
    });
  }
};

export const getSuppliers = async (req, res) => {
  try {
    const { companyId } = req.query;

    const suppliers = await prisma.supplier.findMany({
      where: {
        companyId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      suppliers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch suppliers",
    });
  }
};