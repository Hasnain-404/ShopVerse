import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';

const MyProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { getToken } = useAuth();

    // Fetch products function
    const fetchProducts = async () => {
        try {
            const token = await getToken();

            const res = await axios.get('http://localhost:3000/products/my-products', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const fetchedProducts = res.data.products || [];
            setProducts(fetchedProducts);

            // Store products in localStorage for persistence
            localStorage.setItem('products', JSON.stringify(fetchedProducts));
        } catch (error) {
            console.error('❌ Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch products on component mount
    useEffect(() => {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
            setLoading(false);
        } else {
            fetchProducts();
        }
    }, []);

    // Handle product addition
    const handleProductAdded = () => {
        fetchProducts(); // Re-fetch products after adding a new product
    };

    // Handle delete
    const handleDelete = async (productId) => {
        try {
            const token = await getToken();

            await axios.delete(`http://localhost:3000/products/delete-product/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const updatedProducts = products.filter((p) => p._id !== productId);
            setProducts(updatedProducts);
            localStorage.setItem('products', JSON.stringify(updatedProducts));
        } catch (error) {
            console.error('❌ Error deleting product:', error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-200 rounded">
            <h2 className="text-3xl font-bold mb-6">My Products</h2>
            {loading ? (
                <p>Loading...</p>
            ) : products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div className="min-h-screen px-4 py-6">
                    <div className="flex flex-wrap justify-center gap-6">
                        {products.map((product) => (
                            <div
                                key={product._id}
                                className="relative bg-white w-full sm:w-[45%] md:w-[30%] lg:w-[22%] h-[55vh] rounded-xl shadow-md hover:shadow-2xl hover:scale-[1.02] transition duration-300 p-4 flex flex-col gap-4"
                            >
                                {/* 🗑️ Delete Icon */}
                                <button
                                    onClick={() => handleDelete(product._id)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl transition"
                                >
                                    <i className="ri-delete-bin-6-line"></i>
                                </button>

                                {/* Image */}
                                <div className="h-[45%] w-full bg-gray-200 rounded-lg overflow-hidden">
                                    <img
                                        src={product.image ? product.image : 'https://via.placeholder.com/300x200?text=No+Image'}
                                        alt={product.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Title & Description */}
                                <div className="space-y-1">
                                    <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
                                    <p className="text-gray-600 text-sm line-clamp-3">{product.description}</p>
                                </div>

                                {/* Price, Offer */}
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold text-gray-800">₹{product.price}</span>
                                    <span className="text-sm line-through text-gray-500">
                                        ₹{Math.floor(product.price / (1 - product.discount / 100))}
                                    </span>
                                    <span className="text-sm text-green-600 font-semibold">{product.discount}% off</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Add product trigger button (optional placeholder) */}
            <button
                onClick={handleProductAdded}
                className="mt-6 p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
                Add New Product
            </button>
        </div>
    );
};

export default MyProducts;
