// components/Navbar.jsx
"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import Cart from "./Cart"; // Import the Cart component

export default function Navbar() {
    const { toggleCart, getCartCount } = useCart();

    return (
        <nav className="bg-[#0a0a0a] border-b border-[#222] py-4 sticky top-0 z-50">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/">
                        <span className="text-[#ffe632] font-extrabold text-2xl tracking-tight">VICTOR<span className="text-white"> GAME SHOP</span></span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/games" className="text-gray-300 hover:text-white transition-colors">
                            Browse Games
                        </Link>
                        <Link href="/deals" className="text-gray-300 hover:text-white transition-colors">
                            Deals
                        </Link>
                        <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                            About Us
                        </Link>
                        <Link href="/support" className="text-gray-300 hover:text-white transition-colors">
                            Support
                        </Link>
                    </div>

                    {/* Right Side - Login & Cart */}
                    <div className="flex items-center space-x-4">
                        {/* Cart Button with Item Count */}
                        <button
                            onClick={toggleCart}
                            className="relative text-white p-2 hover:text-[#ffe632] transition-colors"
                            aria-label="Shopping cart"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>

                            {getCartCount() > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[#ffe632] text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {getCartCount()}
                                </span>
                            )}
                        </button>

                        {/* Login Button */}
                        <Link href="/login">
                            <button className="bg-[#ffe632] hover:bg-[#f0d800] text-black px-4 py-2 rounded-md font-bold transition-colors">
                                Login
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Cart Slide-in Component */}
            <Cart />
        </nav>
    );
}
