import prisma from "../config/prisma.js";

export const createCustomer = async (req, res) => {
  try {
    const { name, phone, email, address, companyId } = req.body;

    const customer = await prisma.customer.create({
      data: {
        name,
        phone,
        email,
        address,
        companyId,
      },
    });

    await prisma.ledger.create({
        data: {
        name: customer.name,
        type: "CUSTOMER",
        openingBalance: 0,
        companyId: customer.companyId,
      },
    });

    res.status(201).json({
      success: true,
      customer,
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create customer",
    });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const { companyId } = req.query;

    const customers = await prisma.customer.findMany({
      where: {
        companyId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      customers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch customers",
    });
  }
};