import React, { useEffect, useState } from 'react'
import Cards from './Cards'
import axios from 'axios'

const NewArrival = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchNewArrivals = async () => {
            try {
                const res = await axios.get('http://localhost:3000/products');
                setProducts(res.data.products);
            } catch (error) {
                console.error("Failed to fetch new arrivals", error);
            }
        };

        fetchNewArrivals();
    }, []);

    return (
        <div className='px-4 md:px-10 py-6'>
            <h2 className='capitalize text-xl md:text-2xl font-semibold mb-4'>
                new arrival
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
    )
}

export default NewArrival
