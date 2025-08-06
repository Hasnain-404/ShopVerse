import React, { useEffect, useState } from 'react';
import {
    RiDashboardLine,
    RiShoppingBagLine,
    RiFileListLine,
    RiLogoutBoxRLine,
} from "@remixicon/react";
import axios from 'axios';
import { useUser, useAuth } from '@clerk/clerk-react';
import { Link, redirect } from 'react-router-dom';

const SellerDashboard = () => {
    const [seller, setSeller] = useState(null);
    const { user } = useUser();
    const { getToken } = useAuth();

    useEffect(() => {
        const fetchSeller = async () => {
            try {
                const token = await getToken();
                const res = await axios.get('http://localhost:3000/auth/fetch-seller', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSeller(res.data.user);
            } catch (error) {
                console.error("Error fetching seller:", error.response?.data || error.message);
            }
        };

        if (user) {
            fetchSeller()
        } else {
            redirect("http://localhost:5173/")
        };
    }, [user]);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md px-6 py-8">
                <h2 className="text-2xl font-bold text-blue-600 mb-10">Seller Panel</h2>
                <nav className="space-y-4">
                    <MenuItem icon={<RiDashboardLine />} text="Dashboard" />
                    <Link to="/add-product" className="block">
                        <MenuItem icon={<RiShoppingBagLine />} text="Add Product" />
                    </Link>
                    <Link to="/my-product" className="block">
                        <MenuItem icon={<RiFileListLine />} text="My Products" />
                    </Link>
                    <MenuItem icon={<RiLogoutBoxRLine />} text="Logout" />
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10">
                <h1 className="text-3xl font-semibold mb-4">
                    Welcome, {seller?.name || "Seller"}
                </h1>
                <p className="text-gray-600">This is your dashboard. Start managing your store.</p>
            </main>
        </div>
    );
};

const MenuItem = ({ icon, text }) => (
    <div className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 cursor-pointer">
        <span className="text-xl">{icon}</span>
        <span className="text-base">{text}</span>
    </div>
);

export default SellerDashboard;
