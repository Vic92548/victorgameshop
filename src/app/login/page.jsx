"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { account } from "@/utils/appwrite/config"; // Correct import path

export default function TwitchLoginPage() {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Check if user is already logged in
        const checkSession = async () => {
            try {
                const session = await account.get();
                setUser(session);
                router.push('/dashboard'); // Redirect to dashboard if already logged in
            } catch (error) {
                // User not logged in, which is expected
                setUser(null);
            }
        };

        checkSession();
    }, [router]);

    const loginWithTwitch = async () => {
        try {
            setLoading(true);
            // Start OAuth session with Twitch using environment variables
            account.createOAuth2Session(
                'twitch',
                process.env.NEXT_PUBLIC_SUCCESS_URL,
                process.env.NEXT_PUBLIC_FAILURE_URL
            );
        } catch (error) {
            console.error("Twitch login error:", error);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] p-5">
            <div className="max-w-md w-full bg-[#121212] p-8 rounded-lg border border-[#333] shadow-lg">
                {/* Logo and Name */}
                <div className="text-center mb-8">
                    <span className="text-[#ffe632] font-extrabold text-3xl tracking-tight">VICTOR<span className="text-white"> GAME SHOP</span></span>
                </div>

                {/* Streamer Card */}
                <div className="mb-8 relative rounded-lg overflow-hidden">
                    <Image
                        src="/streamer.jpg"
                        alt="Victor the Streamer"
                        width={400}
                        height={200}
                        className="w-full object-cover rounded-lg"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                        <p className="text-white font-bold">Victor's Game Venture</p>
                    </div>
                </div>

                {/* Info Message */}
                <div className="bg-[#1a1a1a] p-4 rounded-lg mb-6 border-l-4 border-[#ffe632]">
                    <h3 className="text-white font-bold">Exclusive Benefits for Twitch Community!</h3>
                    <ul className="text-gray-300 mt-2 ml-5 list-disc">
                        <li>Follower discount: 5% off all games</li>
                        <li>Subscriber benefits: 15% off + monthly free keys</li>
                        <li>Access to streamer-only flash sales</li>
                        <li>Priority support in Discord</li>
                    </ul>
                </div>

                {/* Login Button */}
                <button
                    onClick={loginWithTwitch}
                    disabled={loading}
                    className="w-full bg-[#9146FF] hover:bg-[#7d31ff] text-white py-3 px-4 rounded-lg font-bold flex items-center justify-center space-x-2 transition duration-200"
                >
                    {loading ? (
                        <span>Connecting...</span>
                    ) : (
                        <>
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="#FFFFFF">
                                <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
                            </svg>
                            <span>Login with Twitch</span>
                        </>
                    )}
                </button>

                {/* Disclaimer */}
                <p className="text-gray-500 text-xs mt-4 text-center">
                    By logging in, you agree to connect your Twitch account to Victor Game Shop.
                </p>
            </div>
        </div>
    );
}
