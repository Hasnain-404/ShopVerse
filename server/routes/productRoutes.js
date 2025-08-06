import express from 'express';
const router = express.Router();

import {
    createProduct,
    getMyProducts,
    deleteProduct,
    getAllProducts,
    getNewArrivalProducts,
    bestSellingProducts,
    topRatedProducts,
    getProductsByCategory,
    getProductById,
    getProductDetailsById,
} from '../controllers/productControllers.js';
import { requireAuth } from '@clerk/express';

router.post('/create-product', requireAuth(), createProduct);
router.get('/my-products', requireAuth(), getMyProducts);
router.delete('/delete-product/:id', requireAuth(), deleteProduct);
router.get('/', getAllProducts);
router.get('/', getNewArrivalProducts);
router.get('/best-selling', bestSellingProducts);
router.get('/top-rated', topRatedProducts);
router.get('/category/:categoryName', getProductsByCategory);
router.get('/:id', getProductDetailsById);


export default router;
