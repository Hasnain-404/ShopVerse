import React from 'react';
import { useCart } from '../context/CartContext.jsx'; // adjust path


const CartPage = () => {
    const { cartItems } = useCart();


    const protectFee = 27;
    const totalAmount = cartItems.reduce(
        (acc, item) => acc + item.price - item.discount + item.deliveryCharge,
        0
    ) + protectFee;

    const totalSaved = cartItems.reduce((acc, item) => acc + item.discount, 0);

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-6 md:px-10">
            <div className="flex flex-col md:flex-row gap-6">

                {/* LEFT: Cart Items */}
                <div className="w-full md:w-[65%] space-y-4">
                    <h2 className="text-lg font-semibold mb-2">My Cart ({cartItems.length})</h2>

                    {cartItems.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl p-4 shadow-md flex gap-4 items-center">
                            <img src={item.img} alt={item.title} className="w-24 h-24 object-cover rounded" />

                            <div className="flex-1 space-y-2">
                                <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                                    {item.title.length > 60
                                        ? `${item.title.slice(0, 60)}...`
                                        : item.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Delivery by <span className="font-medium text-black">{item.deliveryDate}</span> | ₹{item.deliveryCharge}
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="font-semibold text-lg text-gray-800">₹{item.price - item.discount}</p>
                                <p className="text-sm text-gray-500 line-through">₹{item.price}</p>
                                <p className="text-sm text-green-600 font-medium">You save ₹{item.discount}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* RIGHT: Price Details */}
                <div className="w-full md:w-[35%]">
                    <div className="bg-white rounded-xl shadow-md p-4">
                        <h2 className="text-lg font-semibold border-b pb-2 mb-4">Price Details</h2>
                        <div className="space-y-3 text-sm text-gray-700">
                            <div className="flex justify-between">
                                <span>Price ({cartItems.length} item)</span>
                                <span>₹{cartItems.reduce((acc, item) => acc + item.price, 0)}</span>
                            </div>
                            <div className="flex justify-between text-green-600">
                                <span>Discount</span>
                                <span>- ₹{cartItems.reduce((acc, item) => acc + item.discount, 0)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery Charges</span>
                                <span>₹{cartItems.reduce((acc, item) => acc + item.deliveryCharge, 0)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Protect Promise Fee</span>
                                <span>₹{protectFee}</span>
                            </div>
                        </div>

                        <hr className="my-4" />

                        <div className="flex justify-between font-semibold text-base text-gray-800">
                            <span>Total Amount</span>
                            <span>₹{totalAmount}</span>
                        </div>

                        <p className="text-green-600 text-sm mt-2">
                            You will save ₹{totalSaved} on this order
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
