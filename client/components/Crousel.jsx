import React, { useEffect, useState } from 'react';
import menPic from "../img/men.png";
import womenPic from "../img/women.png";

const Crousel = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const images = [
        {
            src: menPic,
            title: "men's fashion",
            subTitle: "season sale",
            offer: "MIN. 35-70% off"
        },
        {
            src: womenPic,
            title: "women's fashion",
            subTitle: "mega sale",
            offer: "FLAT 50% off"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage(prev => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className='bg-gray-100 flex flex-col-reverse md:flex-row justify-between items-center px-4 md:px-10 py-6 overflow-hidden h-auto md:h-[60vh] transition-all duration-700'>
                {/* Text Section */}
                <div className='mt-6 md:mt-20 md:ml-2 text-center md:text-left'>
                    <div className='text-2xl md:text-4xl font-bold text-blue-500 italic'>
                        {images[currentImage].subTitle}
                    </div>
                    <div className='text-4xl md:text-7xl font-bold uppercase py-2 md:py-4'>
                        {images[currentImage].title}
                    </div>
                    <div className='text-lg md:text-2xl font-medium'>
                        {images[currentImage].offer}
                    </div>
                </div>

                {/* Image Section */}
                <div className='w-full md:w-[50%] flex justify-center md:justify-end transition-all duration-700'>
                    <img
                        src={images[currentImage].src}
                        alt="Fashion"
                        className='max-h-[300px] md:max-h-[400px] object-contain transition-all duration-700'
                    />
                </div>
            </div>
        </>
    );
};

export default Crousel;
