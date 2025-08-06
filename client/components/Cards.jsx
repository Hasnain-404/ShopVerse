import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cards = ({ id, img, price, title, description }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${id}`);
    };

    return (
        <div className="w-56">
            <div
                onClick={handleClick}
                className="w-full rounded-xl hover:scale-[1.02] transition duration-300 bg-white cursor-pointer"
            >
                <div className="h-64 bg-gray-200 overflow-hidden rounded-t-xl">
                    <img
                        src={img}
                        alt="Product"
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                </div>
                <div className="p-3 space-y-1">
                    <h3 className="text-base font-semibold text-gray-800 truncate">
                        {title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                        {description}
                    </p>
                    <div className="text-blue-600 font-bold">₹{price}</div>
                </div>
            </div>
        </div>
    );
};

export default Cards;
