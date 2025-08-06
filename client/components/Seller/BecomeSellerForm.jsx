import React, { useState } from 'react';
import axios from "axios";
import { useUser, useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const BecomeSellerForm = () => {
    const { getToken } = useAuth();
    const navigate = useNavigate(); // <- React Router navigate hook

    const [formData, setFormData] = useState({
        fullName: '',
        shopName: '',
        phone: '',
        email: '',
        address: '',
        pincode: '',
        gstNumber: '',
        logo: null,
    });

    const [loading, setLoading] = useState(false); // <- loading state

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "logo") {
            setFormData({ ...formData, logo: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // start loading

        try {
            const token = await getToken();

            await axios.post("http://localhost:3000/auth/become-seller", {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            navigate("/fetch-seller"); // redirect
        } catch (err) {
            console.error("Error becoming seller:", err);
        } finally {
            setLoading(false); // stop loading
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
            <h2 className="text-2xl font-semibold mb-4 text-center">Become a Seller</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input name="fullName" onChange={handleChange} required placeholder="Full Name" className="input" />
                    <input name="shopName" onChange={handleChange} required placeholder="Shop Name" className="input" />
                    <input name="phone" onChange={handleChange} required type="tel" placeholder="Phone Number" className="input" />
                    <input name="email" onChange={handleChange} required type="email" placeholder="Email" className="input" />
                    <input name="pincode" onChange={handleChange} required placeholder="Pincode" className="input" />
                    <input name="gstNumber" onChange={handleChange} placeholder="GST Number (optional)" className="input" />
                </div>

                <textarea name="address" onChange={handleChange} required placeholder="Full Address" className="input w-full h-24 resize-none" />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload Shop Logo (optional)</label>
                    <input
                        className='border-dashed border-2 rounded-xl px-2 font-medium underline'
                        type="file"
                        name="logo"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition flex items-center justify-center"
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default BecomeSellerForm;
