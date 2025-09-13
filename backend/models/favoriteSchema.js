import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", 
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products", 
      required: true,
    },
  },
  { timestamps: true } 
);

const favoriteSchemaModel = mongoose.model("Favorite", favoriteSchema);

export default favoriteSchemaModel;
