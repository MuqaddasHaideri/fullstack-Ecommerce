import express from "express";
import { getProducts, productById, productbycategory, category } from "../controllers/productController.js";
import { isAuthenticated } from "../middleware/verifyAPI.js";

const productRouter = express.Router();

productRouter.get("/products", isAuthenticated, getProducts);
productRouter.get("/products/category", isAuthenticated, category);
productRouter.get("/products/category/:category", isAuthenticated, productbycategory);
productRouter.get("/products/:id", isAuthenticated, productById);

export default productRouter;