import React, { useEffect, useState } from 'react';
import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
    useUser,
    useAuth,
} from '@clerk/clerk-react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const { user } = useUser();
    const { getToken } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        const handleSaveUser = async () => {
            try {
                if (user) {
                    await axios.post("http://localhost:3000/auth/save-user", {
                        userId: user.id,
                        email: user.primaryEmailAddress.emailAddress,
                        name: user.fullName
                    });
                }
            } catch (error) {
                console.error("Error saving user:", error);
            }
        };
        handleSaveUser();
    }, [user]);

    const handleStoreClick = async () => {
        if (!user) {
            return alert("login please")
        }; // if not signed in

        try {
            const token = await getToken();

            const res = await axios.get('http://localhost:3000/auth/fetch-seller', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.status === 200 && res.data.user.role === 'seller') {
                navigate('/fetch-seller');
            } else {
                navigate('/become-seller');
            }

        } catch (error) {
            console.log("Error checking seller role:", error.response?.data || error.message);
            navigate('/become-seller');
        }
    };

    return (
        <>
            <div className="bg-white z-50 relative">
                <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-3xl font-bold">
                        <Link to="/">ShopVerse</Link>
                    </h1>

                    {/* Desktop Icons */}
                    <div className="hidden md:flex text-2xl items-center space-x-3">
                        {/* <i className="ri-search-line cursor-pointer"></i>
                        <Link title='Favourites'><i className="ri-heart-line cursor-pointer"></i></Link> */}
                        <Link to="user-cart" title='Cart'>
                            <i className="ri-shopping-cart-2-line cursor-pointer"></i>
                        </Link>
                        <button onClick={handleStoreClick} title="Store">
                            <i className="ri-store-2-line cursor-pointer"></i>
                        </button>

                        <SignedOut>
                            <SignInButton mode="modal">
                                <i className="ri-user-line cursor-pointer"></i>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                    </div>

                    {/* Mobile Menu Icon */}
                    <div className="md:hidden text-3xl cursor-pointer" onClick={toggleMenu}>
                        <i className={menuOpen ? "ri-menu-fold-2-line" : "ri-menu-fold-3-line"}></i>
                    </div>
                </div>

                {/* Right Sidebar Drawer for Mobile */}
                <div className={`fixed top-0 right-0 w-64 h-screen bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex justify-end p-4">
                        <button onClick={toggleMenu}>
                            <i className="ri-close-line text-2xl"></i>
                        </button>
                    </div>
                    <div className="flex flex-col gap-4 px-6 text-xl">
                        {/* <i className="ri-search-line cursor-pointer"></i>
                        <i className="ri-heart-line cursor-pointer"></i> */}
                        <Link to="user-cart" title='Cart'>
                            <i className="ri-shopping-cart-2-line cursor-pointer"></i>
                        </Link>
                        <span onClick={handleStoreClick}>
                            <i className="ri-store-2-line cursor-pointer"></i>
                        </span>
                        <SignedOut>
                            <SignInButton mode="modal">
                                <i className="ri-user-line cursor-pointer"></i>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <div className="w-10">
                                <UserButton afterSignOutUrl="/" />
                            </div>
                        </SignedIn>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
