// components/GameCard.jsx
"use client"
import Image from "next/image";
import Link from "next/link";

export default function GameCard({ game }) {
    return (
        <Link href={`/game/${game.id}`}>
            <div className="bg-[#121212] rounded-lg overflow-hidden hover:shadow-[0_0_15px_rgba(255,230,50,0.3)] transition-shadow group cursor-pointer">
                <div className="relative h-80 w-auto overflow-hidden">
                    <Image
                        src={game.image || '/placeholder-game.jpg'} // Fallback image
                        alt={game.title}
                        fill
                        style={{ objectFit: "cover" }}
                        className="group-hover:scale-110 transition-transform duration-300 h-100"
                    />
                    <div className="absolute top-2 right-2 bg-[#ffe632] text-black font-bold text-xs px-2 py-1 rounded">
                        {game.discount}
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="text-white font-bold">{game.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-[#ffe632] font-bold">{game.price}</span>
                        <button
                            className="bg-[#333] hover:bg-[#444] text-white text-sm px-3 py-1 rounded transition-colors"
                            onClick={(e) => {
                                e.preventDefault(); // Prevent link navigation
                                // Add your cart logic here
                            }}
                        >
                            Add to cart 🛒
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
