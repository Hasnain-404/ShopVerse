import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CategoryCard from './CategoryCard';

const FeaturedCategories = () => {
    const scrollRef = useRef(null);
    const navigate = useNavigate();

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (direction === 'left') {
            current.scrollBy({ left: -300, behavior: 'smooth' });
        } else {
            current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    const [electronics, setElectronics] = useState([]);
    const [beauty, setBeauty] = useState([]);
    const [sports, setSports] = useState([]);
    const [healthcare, setHealthcare] = useState([]);
    const [food, setFood] = useState([]);
    const [toys, setToys] = useState([]);

    useEffect(() => {
        const fetchByCategory = async (category, setter) => {
            try {
                const res = await axios.get(`http://localhost:3000/products/category/${category}`);
                setter(res.data);
            } catch (err) {
                console.error(`Error fetching ${category} products:`, err);
            }
        };

        fetchByCategory("electronics", setElectronics);
        fetchByCategory("beauty", setBeauty);
        fetchByCategory("sports", setSports);
        fetchByCategory("healthcare", setHealthcare);
        fetchByCategory("food", setFood);
        fetchByCategory("toys", setToys);
    }, []);

    const handleCategoryClick = (category, products) => {
        navigate('/category-products', {
            state: { category, products }
        });
    };


    const renderCategorySection = (title, products) => (
        <div className='bg-gray-100 px-4 md:px-10 py-6 relative'>
            <h2 className='text-xl md:text-2xl font-semibold mb-4 capitalize'>{title}</h2>

            <div
                ref={scrollRef}
                className='flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-2'
            >
                {products.map((item, index) => (
                    <CategoryCard
                        key={index}
                        img={item.image}
                        title={item.title}
                        description={item.description}
                        onClick={() =>
                            handleCategoryClick(item.category, products.filter(p => p.category === item.category))
                        }
                    />
                ))}
            </div>
        </div>
    );

    return (
        <div className='flex flex-col-reverse gap-5 px-10'>
            {renderCategorySection("Electronics", electronics)}
            {renderCategorySection("Beauty, food, toys & more", [...beauty, ...food, ...toys])}
            {renderCategorySection("Sports, healthcare & more", [...sports, ...healthcare])}
        </div>
    );
};

export default FeaturedCategories;
