import { Schema, model } from 'mongoose';
import User from './userModel.js';

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [1, 'Price must be greater than 0']
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: [1, 'Stock must be at least 1']
    },
    discount: {
        type: Number,
        default: 0
    },
    image: {
        type: String
    },
    sold: {
        type: Number,
        default: 0
    },
    averageRating: {
        type: Number,
        default: 0
    },
    seller: {
        type: String,
        ref: User,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    deliveryInDays: {
        type: Number,
        default: 3
    },
    productHighlights: {
        type: [String],
        default: []
    },
    services: {
        type: [String],
        default: []
    }
}, { timestamps: true });


const Product = model('Product', productSchema);

export default Product;
