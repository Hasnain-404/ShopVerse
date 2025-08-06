import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from './Cards';

const TopRated = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchTopRated = async () => {
            try {
                const res = await axios.get('http://localhost:3000/products/top-rated');
                setProducts(res.data);
            } catch (err) {
                console.error('Error fetching top rated products:', err);
            }
        };

        fetchTopRated();
    }, []);

    return (
        <div className='px-4 md:px-10 py-6'>
            <h2 className='capitalize text-xl md:text-2xl font-semibold mb-4'>
                top rated
            </h2>

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
        </div>
    );
};

export default TopRated;
