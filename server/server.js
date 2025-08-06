import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { clerkMiddleware } from '@clerk/express';
import connectDB from './database/db.js';
import userRoutes from './routes/userRoutes.js';
import productRouters from './routes/productRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//Connect to DB
connectDB();

//CORRECT MIDDLEWARE ORDER
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(clerkMiddleware());

//Routes
app.use('/auth', userRoutes);
app.use('/products', productRouters);

app.get('/', (req, res) => {
    res.send('Welcome to the ShopVerse API!');
});

//Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
