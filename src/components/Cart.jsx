// components/Cart.jsx
"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function Cart() {
    const {
        cart,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        getCartCount,
        isCartOpen,
        closeCart
    } = useCart();

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-none" onClick={closeCart}></div>

            <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#121212] shadow-lg transform transition-transform duration-300">
                <div className="p-4 flex justify-between items-center border-b border-[#222]">
                    <h2 className="text-xl font-bold text-white">
                        Your Cart ({getCartCount()})
                    </h2>
                    <button
                        onClick={closeCart}
                        className="text-gray-400 hover:text-white"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="overflow-y-auto h-[calc(100vh-210px)]">
                    {cart.length > 0 ? (
                        <ul className="divide-y divide-[#222]">
                            {cart.map((item) => (
                                <li key={item.id} className="p-4 flex gap-4">
                                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded">
                                        <Image
                                            src={item.image || '/placeholder-game.jpg'}
                                            alt={item.title}
                                            fill
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-white font-medium truncate">{item.title}</h3>
                                        <p className="text-[#ffe632] font-bold">{item.price}</p>

                                        <div className="flex items-center mt-2">
                                            <button
                                                className="w-8 h-8 flex items-center justify-center bg-[#222] hover:bg-[#333] rounded-l"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            >
                                                -
                                            </button>
                                            <span className="w-10 h-8 flex items-center justify-center bg-[#222]">
                                                {item.quantity}
                                            </span>
                                            <button
                                                className="w-8 h-8 flex items-center justify-center bg-[#222] hover:bg-[#333] rounded-r"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                +
                                            </button>

                                            <button
                                                className="ml-auto text-gray-400 hover:text-red-500"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <h3 className="text-lg font-bold text-white mb-2">Your cart is empty</h3>
                            <p className="text-gray-400 mb-4">Start adding some awesome games!</p>
                            <button
                                onClick={closeCart}
                                className="bg-[#ffe632] hover:bg-[#f0d800] text-black font-bold py-2 px-4 rounded"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="border-t border-[#222] p-4">
                        <div className="flex justify-between font-bold text-lg mb-4">
                            <span>Total:</span>
                            <span className="text-[#ffe632]">${getCartTotal().toFixed(2)}</span>
                        </div>
                        <Link href="/checkout" onClick={closeCart}>
                            <button className="w-full bg-[#ffe632] hover:bg-[#f0d800] text-black font-bold py-3 px-4 rounded transition-colors">
                                Proceed to Checkout
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
