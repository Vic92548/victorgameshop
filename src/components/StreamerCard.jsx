// components/StreamerCard.jsx
import Image from "next/image";
import Button from "./Button";

export default function StreamerCard() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-2">
                <div className="inline-block bg-[#6c43ff] text-white px-3 py-1 rounded-full text-xs font-bold mb-4">
                    FROM YOUR FAVORITE STREAMER 🎬
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                    Games from Someone You <span className="text-[#ffe632]">Actually Trust</span>
                </h2>
                <p className="text-gray-300 mb-6">
                    Victor Game Shop was founded by a gamer and streamer who was tired of overpriced keys and shady stores. Join our community for giveaways, gaming tips, and live discussions!
                </p>
                <Button href="https://twitch.tv/victorgamestudio" variant="twitch">
                    Follow on Twitch 📺
                </Button>
            </div>
            <div className="relative h-[300px] lg:h-[400px] rounded-lg overflow-hidden border-4 border-[#6c43ff] transform -rotate-2 hover:rotate-0 transition-transform">
                <Image
                    src="/victor_on_stream.jpg"
                    alt="Victor the Streamer"
                    fill
                    style={{objectFit: "cover"}}
                    className="hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <p className="text-white font-bold">Victor's stream every day @ 3PM (CET)</p>
                </div>
            </div>
        </div>
    )
}
