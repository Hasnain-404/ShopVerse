import React from 'react';

const PriceOff = ({ discount }) => {
    return (
        <div className='bg-blue-500 text-white w-fit px-2 md:px-3 py-0.5 md:py-1 rounded font-medium uppercase mb-3 md:mb-4 text-sm md:text-base shadow-sm transition-all duration-300'>
            <span>{discount}% off</span>
        </div>
    );
};

export default PriceOff;
