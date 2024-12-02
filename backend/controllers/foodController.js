import foodModel from "../models/foodModel.js";
import fs from "fs";

// add Food Item
export const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.json({ success: true, message: "Food Added Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something Went Wrong" });
  }
};

// List All FoodItems
export const listFood = async (req, res) => {
  try {
    const food = await foodModel.find({});
    res.json({ success: true, food: food });
  } catch (error) {
    res.json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

// Delete FoodItem
export const deleteFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (!food) {
      return res.json({
        success: false,
        message: "Food Not Found",
      });
    } else {
      fs.unlink(`uploads/${food.image}`, () => {});
      await foodModel.findByIdAndDelete(req.body.id);
      res.json({ success: true, message: "Food Deleted Successfully" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something Went Wrong" });
  }
};
// Get Food Item by ID
export const getFoodById = async (req, res) => {
  const { id } = req.params;

  try {
    const food = await foodModel.findById(id);
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food Item Not Found" });
    }
    res.json({ success: true, food });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something Went Wrong" });
  }
};

// Edit Food Item
export const editFood = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category } = req.body;
  const image = req.file ? req.file.filename : req.body.image;

  try {
    const food = await foodModel.findById(id);
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food Item Not Found" });
    }

    // Update the food item
    food.name = name;
    food.description = description;
    food.price = price;
    food.category = category;
    food.image = image;

    await food.save();
    res.json({ success: true, message: "Food Item Updated Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something Went Wrong" });
  }
};
