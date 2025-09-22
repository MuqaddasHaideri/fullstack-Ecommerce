import ProductSchemaModel from "../models/productSchema.js";
import favoriteSchemaModel from "../models/favoriteSchema.js"; 
import addToCartSchemaModel from "../models/addToCartSchema.js";
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
    const userId = req.user?._id; 
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
  
 
  
const addFavorite = async (req, res) => {
    try {
      const userId = req.user._id;
      const { productId } = req.body;
  
      if (!productId) {
        return res.status(400).json({ message: "productId is required" });
      }
  
  
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
 const filterProducts= async (req, res) => {
    try {
     
      const sort = req.query.sort; 
  
      let sortOrder = 1; 
      if (sort === "desc") sortOrder = -1; 
  
      const products = await ProductSchemaModel.find().sort({ price: sortOrder });
  
      res.status(200).json(products);
    } catch (error) {
      console.error("Error filtering products by price:", error);
      res.status(500).json({ message: "Error filtering products" });
    }
  };

  const addItemToCart = async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const userId = req.user._id;
  
      if (!productId || !quantity) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      if (!Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({ message: "Quantity must be a positive integer" });
      }
  
      // Atomic update or insert
      const cartItem = await addToCartSchemaModel.findOneAndUpdate(
        { userId, productId },
        { $inc: { quantity }, $setOnInsert: { userId, productId } },
        { new: true, upsert: true }
      );
  
      const message = cartItem.isNew ? "Item added to cart" : "Cart updated";
  
      res.status(200).json({ message, cartItem });
    } catch (error) {
      console.error("Add to cart error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  
  /**
   * @desc Get all cart items for a user
   * @route GET /api/cart/:userId
   */
   const getUserCart = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const cartItems = await addToCartSchemaModel.find({ userId }).populate("productId");
  
      res.status(200).json(cartItems);
    } catch (error) {
      console.error("Get cart error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  /**
   * @desc Remove item from cart
   * @route DELETE /api/cart/:itemId
   */
  const removeItemFromCart = async (req, res) => {
    try {
      const { id } = req.params;       // <-- param is called :id
      const userId = req.user._id;
  
      const deletedItem = await addToCartSchemaModel.findOneAndDelete({
        _id: id,
        userId,
      });
  
      if (!deletedItem) {
        return res.status(404).json({ message: "Item not found in cart" });
      }
  
      res.status(200).json({ message: "Item removed from cart" });
    } catch (error) {
      console.error("Remove cart error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  
  // PUT /cart/:id/quantity
const updateCartQuantity = async (req, res) => {
  try {
    const { quantity } = req.body; // new quantity
    const cartItemId = req.params.id;
    const userId = req.user._id;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be >= 1" });
    }

    const item = await addToCartSchemaModel.findOne({ _id: cartItemId, userId });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.quantity = quantity;
    await item.save();

    res.status(200).json({ message: "Quantity updated", cartItem: item });
  } catch (err) {
    console.error("Update quantity error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export { getProducts, productById, productbycategory, category,searchProduct,removeFavorite,getUserFavorites,addFavorite,filterProducts,addItemToCart, getUserCart,removeItemFromCart,updateCartQuantity};