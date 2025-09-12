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

const searchProduct = async (req, res) => {
    try {
      const { query } = req.query;   
      
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
  
      const products = await ProductSchemaModel.find({
        $or: [
          { name: { $regex: query, $options: 'i' } },        
          { description: { $regex: query, $options: 'i' } }
        ]
      });
  
      res.status(200).json(products);
    } catch (error) {
      console.error("Error searching products:", error);
      res.status(500).json({ message: "Error in searching products" });
    }
  }
  

export { getProducts, productById, productbycategory, category,searchProduct };