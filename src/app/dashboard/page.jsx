// src/app/dashboard/page.js
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { account } from "@/utils/appwrite/config";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await account.get();
                setUser(userData);
            } catch (error) {
                console.error("Error fetching user:", error);
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [router]);

    const handleLogout = async () => {
        try {
            await account.deleteSession('current');
            router.push('/login');
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a]">
                <div className="text-white text-2xl animate-pulse">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Navigation Bar */}
            <nav className="bg-[#121212] border-b border-[#333] px-4 py-3 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center">
                    <span className="text-[#ffe632] font-extrabold text-xl tracking-tight">VICTOR<span className="text-white"> GAME SHOP</span></span>
                </div>

                <div className="flex items-center space-x-4">
                    <Link href="/" className="px-4 py-2 text-gray-300 hover:text-white transition duration-200">
                        Back to Home
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-[#333] hover:bg-[#444] rounded text-gray-300 hover:text-white transition duration-200"
                    >
                        Logout
                    </button>

                    <div className="flex items-center space-x-2 ml-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-[#9146ff] flex items-center justify-center">
                            {user?.name?.charAt(0) || "U"}
                        </div>
                        <span className="text-sm font-medium hidden sm:block">{user?.name || "User"}</span>
                    </div>
                </div>
            </nav>

            {/* Dashboard Content */}
            <div className="max-w-6xl mx-auto p-5">
                <div className="bg-[#121212] rounded-lg border border-[#333] p-6 mb-6">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-[#9146ff] flex items-center justify-center text-2xl font-bold">
                            {user?.name?.charAt(0) || "U"}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">{user?.name || "Welcome back!"}</h1>
                            <p className="text-gray-400">Twitch Viewer</p>

                            {/* Badge */}
                            <div className="mt-2 inline-block bg-[#9146ff] px-2 py-0.5 rounded-full text-xs font-semibold">
                                Twitch Connected
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <h2 className="text-xl font-bold mb-3">Your Benefits</h2>
                        <div className="bg-[#1a1a1a] p-3 rounded-lg border-l-4 border-[#9146ff]">
                            <p className="text-gray-300">
                                <strong>You're eligible for:</strong> 10% discount on all game keys, daily giveaways, and early access to new releases.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Game Keys */}
                    <div className="bg-[#121212] rounded-lg border border-[#333] p-6">
                        <h2 className="text-xl font-bold mb-4">Your Game Keys</h2>
                        <div className="text-center py-8">
                            <div className="flex justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                </svg>
                            </div>
                            <p className="text-lg font-bold">You don't have any game keys yet</p>
                            <p className="text-gray-400">Check out our store to get started!</p>
                        </div>
                    </div>

                    <div>
                        {/* Special Offers */}
                        <div className="bg-[#121212] rounded-lg border border-[#333] p-6 mb-6">
                            <h2 className="text-xl font-bold mb-4">Special Offers</h2>
                            <div className="bg-gradient-to-r from-[#9146ff]/20 to-[#9146ff]/5 rounded-lg p-4 border border-[#9146ff]/30">
                                <h3 className="font-bold text-lg mb-2">Twitch Subscriber Exclusive</h3>
                                <p className="text-gray-300 mb-3">Upgrade to a Twitch subscription to receive a free AAA game key every month!</p>
                                <a href="https://twitch.tv/victorgamestudio" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#9146ff] text-white px-4 py-2 rounded hover:bg-opacity-90 transition duration-200">
                                    Subscribe on Twitch
                                </a>
                            </div>
                        </div>

                        {/* Upcoming Streams */}
                        <div className="bg-[#121212] rounded-lg border border-[#333] p-6">
                            <h2 className="text-xl font-bold mb-4">Upcoming Streams with Giveaways</h2>
                            <ul className="space-y-3">
                                <li className="border-b border-[#333] pb-3">
                                    <p className="font-medium">Cyberpunk 2077 Walkthrough</p>
                                    <p className="text-gray-400">Tomorrow @ 3PM (CET)</p>
                                </li>
                                <li className="border-b border-[#333] pb-3">
                                    <p className="font-medium">Elden Ring Boss Rush</p>
                                    <p className="text-gray-400">Friday @ 5PM (CET)</p>
                                </li>
                                <li>
                                    <p className="font-medium">Viewer Game Keys Giveaway</p>
                                    <p className="text-gray-400">Sunday @ 7PM (CET)</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-[#1a1a1a] to-[#121212] rounded-lg border border-[#333] p-6 mt-6">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-4 md:mb-0">
                            <h2 className="text-xl font-bold mb-1">Unlock More Benefits</h2>
                            <p className="text-gray-400">Follow Victor's streams and participate in chat to earn points!</p>
                        </div>
                        <a href="https://twitch.tv/victorgamestudio" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#9146ff] text-white rounded-lg hover:bg-opacity-90 transition duration-200 flex items-center">
                            <svg className="w-5 h-5 fill-current mr-2" viewBox="0 0 24 24">
                                <path d="M4.3 3H21.7V17.9L16.7 23H12.2L9.4 23H4.3V3.9L4.3 3ZM19.7 15.8V5H6.3V19H9.3V23L12.9 19H16.7L19.7 15.8Z" />
                                <path d="M12.8 13.3H10.8V8.7H12.8V13.3ZM17.8 13.3H15.8V8.7H17.8V13.3Z" />
                            </svg>
                            Watch on Twitch
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-[#0a0a0a] text-gray-400 text-center py-6 mt-12 border-t border-[#333]">
                <p className="text-sm">© 2024 Victor Game Shop. All rights reserved.</p>
            </footer>
        </div>
    );
}
