import Product from '../models/productModel.js';
import { getAuth } from '@clerk/express';

// @desc    Create a new product
// @route   POST /products
// @access  Private (Seller)

const createProduct = async (req, res) => {
    try {
        const auth = getAuth(req);

        if (!auth.userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const {
            title,
            description,
            price,
            category,
            stock,
            discount,
            tags,
            deliveryInDays,
            productHighlights,
            services
        } = req.body;

        const seller = auth.userId;

        const product = new Product({
            title,
            description,
            price,
            category,
            stock,
            discount,
            tags: tags || [],
            deliveryInDays: deliveryInDays || 2,
            productHighlights: productHighlights || [],
            services: services || [],
            seller,
        });

        await product.save();
        res.status(201).json({ success: true, product });
    } catch (error) {
        res.json({ success: false, message: 'Product creation failed', error: error.message });
    }
};


// @desc    Get seller's products
// @route   GET /products/seller
// @access  Private (Seller)
const getMyProducts = async (req, res) => {
    try {
        const products = await Product.find({ seller: req.auth.userId })

        res.json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch your products', error: error.message });
    }
};

// @desc    Get all products
// @route   GET /products
// @access  Public
const getAllProducts = async (req, res) => {

    try {
        const products = await Product.find();

        res.json({ success: true, products });
    } catch (error) {
        res.json({ success: false, message: 'Failed to fetch products', error: error.message });
    }
};

// @desc    Get single product
// @route   GET /products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('seller', 'username email');

        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

        res.json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching product', error: error.message });
    }
};

const deleteProduct = async (req, res) => {

    try {
        const productId = req.params.id;

        // Find the product by ID and delete it
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting product', error: error.message });
    }
}

// GET /api/products/new
const getNewArrivalProducts = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // midnight

        const tomorrow = new Date();
        tomorrow.setHours(24, 0, 0, 0); // next midnight

        const products = await Product.find({
            createdAt: { $gte: today, $lt: tomorrow }
        }).populate('seller', 'username');

        res.json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching new arrivals', error: error.message });
    }

};

// GET /products/best-selling
const bestSellingProducts = async (req, res) => {
    try {
        const topProducts = await Product.find().sort({ sold: -1 }).limit(10);
        res.json(topProducts);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

// GET /products/top-rated
const topRatedProducts = async (req, res) => {
    try {
        const topRatedProducts = await Product.find()
            .sort({ averageRating: -1 }).limit(10);

        res.json(topRatedProducts);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

// GET /products/category/:categoryName
const getProductsByCategory = async (req, res) => {
    try {
        const categoryParam = req.params.categoryName;

        // Capitalize first letter of the category name
        const category = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1).toLowerCase();

        const products = await Product.find({ category });

        res.json(products);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// GET /products/:id
const getProductDetailsById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


export {
    createProduct,
    getMyProducts,
    getAllProducts,
    getProductById,
    deleteProduct,
    getNewArrivalProducts,
    bestSellingProducts,
    topRatedProducts,
    getProductsByCategory,
    getProductDetailsById
};