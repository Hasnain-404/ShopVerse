import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const categories = ['electronics', 'beauty', 'sports', 'healthcare', 'food', 'toys'];

const ShowCards = ({ customCategory = null, customProducts = null }) => {
    const [categoryProducts, setCategoryProducts] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                const allData = {};
                await Promise.all(
                    categories.map(async (cat) => {
                        const res = await axios.get(`http://localhost:3000/products/category/${cat}`);
                        allData[cat] = res.data || [];
                    })
                );
                setCategoryProducts(allData);
            } catch (error) {
                console.error('Error fetching products:', error.message);
            } finally {
                setLoading(false);
            }
        };

        if (!customCategory) {
            fetchCategoryProducts();
        } else {
            setCategoryProducts({ [customCategory]: customProducts || [] });
            setLoading(false);
        }
    }, [customCategory, customProducts]);

    if (loading) return <p className="p-4">Loading products...</p>;

    return (
        <div className="min-h-screen px-4 py-6">
            {Object.keys(categoryProducts).map((cat) => (
                <div key={cat} className="mb-10">
                    <h2 className="text-3xl font-medium capitalize mb-4">{cat} Products</h2>
                    <div className="flex flex-wrap justify-center gap-6 bg-gray-200 py-3 rounded">
                        {categoryProducts[cat]?.length > 0 ? (
                            categoryProducts[cat].map((item, index) => (
                                <Link
                                    to={`/product/${item._id}`}
                                    key={index}
                                    className="relative bg-white w-full sm:w-[45%] md:w-[30%] lg:w-[22%] h-[55vh] rounded-xl shadow-md hover:shadow-2xl hover:scale-[1.02] transition duration-300 p-4 flex flex-col gap-4"
                                >
                                    <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl transition">
                                        <i className="ri-heart-line"></i>
                                    </button>

                                    <div className="h-[45%] w-full bg-gray-200 rounded-lg overflow-hidden">
                                        <img
                                            src={item.image || 'https://via.placeholder.com/400x300?text=No+Image'}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                                        <p className="text-gray-600 text-sm line-clamp-3">
                                            {item.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="text-lg font-bold text-gray-800">₹{item.price}</span>
                                        <span className="text-sm line-through text-gray-500">
                                            ₹{Math.floor(item.price / (1 - item.discount / 100))}
                                        </span>
                                        <span className="text-sm text-green-600 font-semibold">
                                            {item.discount}% off
                                        </span>
                                    </div>
                                </Link>

                            ))
                        ) : (
                            <p className="text-center text-gray-500">No products found.</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ShowCards;
