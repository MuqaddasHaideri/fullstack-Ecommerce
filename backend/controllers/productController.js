import ProductSchemaModel from "../models/productSchema.js";
import favoriteSchemaModel from "../models/favoriteSchema.js"; // adjust the path
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
    const userId = req.user?._id; // requires auth middleware to attach user
    const product = await ProductSchemaModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    let favorited = false;
    if (userId) {
      const favExists = await favoriteSchemaModel.exists({
        userId,
        productId: product._id,
      });
      favorited = !!favExists;
    }
    res.status(200).json({
      ...product.toObject(),
      favorited,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in getting product by id" });
  }
};

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
  
 
  
  // POST /api/favorites
const addFavorite = async (req, res) => {
    try {
      const userId = req.user._id; // from your isAuthenticated middleware
      const { productId } = req.body;
  
      if (!productId) {
        return res.status(400).json({ message: "productId is required" });
      }
  
      // optional: check if product exists
      // const productExists = await Product.findById(productId);
      // if (!productExists) return res.status(404).json({ message: "Product not found" });
  
      // prevent duplicates
      const existing = await favoriteSchemaModel.findOne({ userId, productId });
      if (existing) {
        return res.status(400).json({ message: "Already in favorites" });
      }
  
      const favorite = await favoriteSchemaModel.create({ userId, productId });
      res.status(201).json(favorite);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error adding to favorites" });
    }
  };
  
  // DELETE /api/favorites/:id
   const removeFavorite = async (req, res) => {
    try {
      const userId = req.user._id;
      const favoriteId = req.params.id;
  
      const favorite = await favoriteSchemaModel.findOneAndDelete({
        _id: favoriteId,
        userId,
      });
  
      if (!favorite) {
        return res.status(404).json({ message: "Favorite not found" });
      }
  
      res.status(200).json({ message: "Removed from favorites" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error removing from favorites" });
    }
  };
  
  // GET /api/favorites/user
const getUserFavorites = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const favorites = await favoriteSchemaModel.find({ userId }).populate("productId");
      res.status(200).json(favorites);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching favorites" });
    }
  };
  
export { getProducts, productById, productbycategory, category,searchProduct,removeFavorite,getUserFavorites,addFavorite };