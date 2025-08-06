import React, { useState, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';

const AddProduct = () => {
    const { getToken } = useAuth();
    const { user } = useUser();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [finalPrice, setFinalPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');
    const [tags, setTags] = useState('');
    const [deliveryInDays, setDeliveryInDays] = useState(2);
    const [productHighlights, setProductHighlights] = useState('');
    const [services, setServices] = useState('');

    useEffect(() => {
        const discountAmount = (Number(price) * Number(discount)) / 100;
        const discountedPrice = Number(price) - discountAmount;
        setFinalPrice(discountedPrice || 0);
    }, [price, discount]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            console.error('User not authenticated');
            return;
        }

        try {
            const token = await getToken();

            const res = await axios.post(
                'http://localhost:3000/products/create-product',
                {
                    title,
                    description,
                    price: Number(price),
                    discount: Number(discount),
                    finalPrice,
                    category,
                    stock: Number(stock),
                    tags: tags.split(',').map(tag => tag.trim()), // Convert to array
                    deliveryInDays: Number(deliveryInDays),
                    productHighlights: productHighlights.split('\n').filter(Boolean),
                    services: services.split('\n').filter(Boolean),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            console.log('✅ Product added:', res.data);
            window.location.href = 'my-product';
        } catch (error) {
            console.error('❌ Error adding product:', error);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter product title (e.g. Noise Smartwatch...)"
                    required
                    className="w-full p-2 border rounded"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter product short description"
                    required
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Enter comma-separated tags (e.g. Smartwatch, Bluetooth)"
                    className="w-full p-2 border rounded"
                />
                <input
                    type="number"
                    value={deliveryInDays}
                    onChange={(e) => setDeliveryInDays(e.target.value)}
                    placeholder="Enter delivery in days (e.g. 2)"
                    className="w-full p-2 border rounded"
                />
                <textarea
                    value={productHighlights}
                    onChange={(e) => setProductHighlights(e.target.value)}
                    placeholder="Enter product highlights, each on new line"
                    className="w-full p-2 border rounded"
                    rows={4}
                />
                <textarea
                    value={services}
                    onChange={(e) => setServices(e.target.value)}
                    placeholder="Enter services offered, each on new line"
                    className="w-full p-2 border rounded"
                    rows={4}
                />
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter price (e.g. 999)"
                    required
                    className="w-full p-2 border rounded"
                />
                <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    placeholder="Enter discount in % (e.g. 10)"
                    className="w-full p-2 border rounded"
                />
                <input
                    type="number"
                    value={finalPrice}
                    readOnly
                    placeholder="Final price (auto-calculated)"
                    className="w-full p-2 border rounded bg-gray-100 text-gray-600"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="w-full p-2 border rounded"
                >
                    <option value="" disabled>Select category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Books">Books</option>
                    <option value="Home">Home</option>
                    <option value="Sports">Sports</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Food">Food</option>
                    <option value="Toys">Toys</option>
                </select>
                <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="Enter stock quantity"
                    required
                    className="w-full p-2 border rounded"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
