import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from './Cards';

const BestSelling = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBestSelling = async () => {
            try {
                const res = await axios.get("http://localhost:3000/products/best-selling");
                setProducts(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch best selling products:", err);
                setLoading(false);
            }
        };

        fetchBestSelling();
    }, []);

    return (
        <div className='px-4 md:px-10 py-6'>
            <h2 className='capitalize text-xl md:text-2xl font-semibold mb-4'>
                best selling
            </h2>

            {loading ? (
                <p className='text-center'>Loading best selling products...</p>
            ) : (
                <div className='flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth'>
                    {products.map((item, index) => (
                        <div key={index} className='flex-shrink-0'>
                            <Cards
                                id={item._id}
                                img={item.image}
                                price={item.price}
                                title={item.title}
                                description={item.description}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BestSelling;
