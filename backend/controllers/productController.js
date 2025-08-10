import ProductSchemaModel from "../models/productSchema.js";

const getProducts = async (req, res) => {
    try {
        const products = await ProductSchemaModel.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error in getting products" });
    }
}
const productById = async (req, res) => {
    try {
        const product = await ProductSchemaModel.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error in getting product by id" });
    }
}
const productbycategory = async (req, res) => {
    try {
        const products = await ProductSchemaModel.find({ category: req.params.category });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error in getting products by category" });
    }
}
const category = async (req, res) => {
    try {
        const categories = await ProductSchemaModel.distinct("category");
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Error in getting categories" });
    }
}
export { getProducts, productById, productbycategory, category };