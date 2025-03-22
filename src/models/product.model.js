import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    image: {
        type: String,
        required: true
    },
    discountPrice: {
        type: Number
    },
    quantity: {
        type: String,
        required: true
    },
},
    {
        timestamps: true
    }
);

export const Product = mongoose.model('Product', productSchema, 'Product');