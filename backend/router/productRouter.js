import express from "express";
import { getProducts, productById, productbycategory, category,searchProduct, addFavorite, removeFavorite,getUserFavorites, filterProducts, addItemToCart, getUserCart, removeItemFromCart, updateCartQuantity} from "../controllers/productController.js";
import { isAuthenticated } from "../middleware/verifyAPI.js";

const productRouter = express.Router();

productRouter.get("/products/favorites", isAuthenticated, getUserFavorites);
productRouter.post("/products/favorites", isAuthenticated, addFavorite);
productRouter.delete("/products/favorites/:id", isAuthenticated, removeFavorite);

productRouter.get("/products", isAuthenticated, getProducts);
productRouter.get("/products/category", isAuthenticated, category);
productRouter.post("/products/cart", isAuthenticated, addItemToCart);
productRouter.get("/products/cart", isAuthenticated, getUserCart);
productRouter.put(
    "/products/cart/:id/quantity",isAuthenticated,updateCartQuantity);
productRouter.delete("/products/cart/:id", isAuthenticated,removeItemFromCart);
productRouter.get("/products/category/:category", isAuthenticated, productbycategory);
productRouter.get("/products/search", isAuthenticated, searchProduct);
productRouter.get("/products/filter", isAuthenticated, filterProducts);
productRouter.get("/products/:id", isAuthenticated, productById);

export default productRouter;