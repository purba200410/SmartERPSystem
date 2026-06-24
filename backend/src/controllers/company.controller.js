import prisma from "../config/prisma.js";

export const createCompany = async (req, res) => {
  try {
    const {
      name,
      gstNumber,
      phone,
      email,
      address,
      financialYear,
    } = req.body;

    const userId = req.user.userId;

    // Check company count
    const companyCount = await prisma.company.count({
      where: {
        ownerId: userId,
      },
    });

    if (companyCount >= 5) {
      return res.status(400).json({
        success: false,
        message: "Maximum 5 companies allowed",
      });
    }

    const company = await prisma.company.create({
      data: {
        name,
        gstNumber,
        phone,
        email,
        address,
        financialYear,
        ownerId: userId,
      },
    });

    res.status(201).json({
      success: true,
      company,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getCompanies = async (req, res) => {
  try {
    const userId = req.user.userId;

    const companies = await prisma.company.findMany({
      where: {
        ownerId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      companies,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};