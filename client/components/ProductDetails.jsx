import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext.jsx';
import { Link } from 'react-router-dom';


const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart, cartItems } = useCart();


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/products/${id}`);
                setProduct(res.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <div className="text-center py-10 text-lg">Loading product details...</div>;
    }

    if (!product) {
        return <div className="text-center py-10 text-red-600">Product not found!</div>;
    }

    // Convert discount if needed and calculate MRP
    const discountValue = typeof product.discount === 'string'
        ? parseFloat(product.discount.replace('%', ''))
        : product.discount;

    const mrp = Math.round(product.price / (1 - discountValue / 100));

    // Calculate Delivery Date
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3); // Add 3 days to the current date

    // Format the date to 'DD MMM, YYYY'
    const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });

    // Calculate stars for average rating (5 stars max)
    const rating = product.averageRating;
    const fullStars = Math.floor(rating); // Number of full stars
    const halfStar = rating % 1 !== 0;  // If there is a half star
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Remaining empty stars

    const isInCart = cartItems.some(item => item.id === product._id);

    return (
        <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-6">
            <div className="bg-white rounded-xl shadow-md p-4 flex flex-col md:flex-row gap-6">

                {/* LEFT SECTION: Image + Buttons */}
                <div className="w-full md:w-[35%] flex flex-col items-center gap-6">
                    <img
                        src={product.image || 'https://via.placeholder.com/200'}
                        alt={product.title}
                        className="w-full max-w-xs object-contain rounded"
                    />
                    <div className="flex gap-4 w-full px-4">
                        <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition">
                            Buy Now
                        </button>

                        {isInCart ? (
                            <button
                                className="flex-1 bg-gray-400 text-white py-2 rounded-lg cursor-not-allowed"
                                disabled
                            >
                                Added
                            </button>
                        ) : (
                            <button
                                className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white py-2 rounded-lg transition"
                                onClick={() =>
                                    addToCart({
                                        id: product._id,
                                        title: product.title,
                                        price: product.price,
                                        discount: mrp - product.price,
                                        deliveryDate: formattedDeliveryDate,
                                        deliveryCharge: 120,
                                        img: product.image
                                    })
                                }
                            >
                                Add to Cart
                            </button>
                        )}
                    </div>
                </div>

                {/* RIGHT SECTION: Details */}
                <div className="w-full md:w-[65%] space-y-4">
                    {/* Title */}
                    <h2 className="text-xl font-semibold text-gray-800">{product.title}</h2>

                    {/* Tags */}
                    <div className="flex gap-2 flex-wrap">
                        {product.tags?.map((tag, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Pricing */}
                    <div className="space-y-1">
                        <div className="text-green-600 font-semibold text-lg">Special Price</div>
                        <div className="flex items-center gap-3">
                            <span className="text-xl font-bold text-gray-800">₹{product.price}</span>
                            <span className="text-gray-500 line-through">₹{mrp}</span>
                            <span className="text-green-600 font-semibold">({discountValue}% OFF)</span>
                        </div>
                    </div>

                    {/* Delivery */}
                    <div className="text-sm text-gray-700">
                        Delivery by <span className="font-semibold text-black">{formattedDeliveryDate}</span>
                    </div>

                    {/* Highlights */}
                    <div>
                        <h3 className="font-semibold">Product Highlights:</h3>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            {product.productHighlights?.map((h, i) => (
                                <li key={i}>{h}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-semibold">Services:</h3>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            {product.services?.map((s, i) => (
                                <li key={i}>{s}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Seller */}
                    <div>
                        <h3 className="font-semibold">Seller:</h3>
                        <p className="text-sm text-gray-700">
                            <span className="text-blue-700 font-medium">{product.seller}</span> - Rated{" "}
                            <span className="text-yellow-500 font-semibold">{product.rating}★</span>
                        </p>
                    </div>

                    {/* Ratings & Reviews */}
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Ratings & Reviews</h3>
                        <div className="flex gap-1 items-center">
                            {[...Array(fullStars)].map((_, index) => (
                                <span key={index} className="text-yellow-500">★</span>
                            ))}
                            {halfStar && <span className="text-yellow-500">☆</span>}
                            {[...Array(emptyStars)].map((_, index) => (
                                <span key={index} className="text-gray-300">★</span>
                            ))}
                            <span className="text-sm text-gray-600">{rating} / 5</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductDetails;
