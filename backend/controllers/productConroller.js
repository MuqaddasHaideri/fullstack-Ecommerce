import express from "express";
import { isAuthenticated } from "../middleware/verifyAPI.js";

const router = express.Router();

router.get("/product", isAuthenticated, (req, res) => {
//   const { name, price } = req.body;

//   // Dummy product creation logic
//   const newProduct = {
//     id: Date.now(),
//     name,
//     price,
//   };

  return res.status(201).json({
    message: "Product created successfully",
    product: newProduct,
  });
});

export default router;
