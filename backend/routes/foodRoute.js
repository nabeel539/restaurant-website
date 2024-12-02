import express from "express";
import {
  addFood,
  deleteFood,
  listFood,
  getFoodById,
  editFood,
} from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

// Image Storage Engine

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
// Route to get a food item by ID
foodRouter.get("/edit/:id", getFoodById);

// Route to edit a food item
foodRouter.post("/edit/:id", upload.single("image"), editFood);
foodRouter.post("/remove", deleteFood);

export default foodRouter;
