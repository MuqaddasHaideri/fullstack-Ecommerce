import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            default: "No Brand"
        },
        stock: {
            type: Number,
            required: true,
            default: 0
        },
        rating: {
            type: Number,
            default: 0
        }
    }, { timestamps: true });
    
const ProductSchemaModel = mongoose.model("products", productSchema);

export default ProductSchemaModel;