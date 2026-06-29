import prisma from "../config/prisma.js";

// CREATE GROUP
export const createGroup = async (req, res) => {
  try {
    const { name, companyId } = req.body;

    const group = await prisma.group.create({
      data: {
        name,
        companyId,
      },
    });

    res.status(201).json({
      success: true,
      group,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create Group",
    });
  }
};

// GET ALL GROUPS
export const getGroups = async (req, res) => {
  try {
    const { companyId } = req.query;

    const groups = await prisma.group.findMany({
      where: {
        companyId,
      },
      include: {
        ledgers: true,
      },
      orderBy: {
        createdAt: "desc",
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
      message: "Failed to fetch Groups",
    });
  }
};

// GET SINGLE GROUP
export const getGroupById = async (req, res) => {
  try {

    const group = await prisma.group.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        ledgers: true,
      },
    });

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    res.json({
      success: true,
      group,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch Group",
    });

  }
};

// UPDATE GROUP
export const updateGroup = async (req, res) => {

  try {

    const { name } = req.body;

    const group = await prisma.group.update({
      where: {
        id: req.params.id,
      },
      data: {
        name,
      },
    });

    res.json({
      success: true,
      group,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update Group",
    });

  }

};

// DELETE GROUP
export const deleteGroup = async (req, res) => {

  try {

    await prisma.group.delete({
      where: {
        id: req.params.id,
      },
    });

    res.json({
      success: true,
      message: "Group deleted successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete Group",
    });

  }

};