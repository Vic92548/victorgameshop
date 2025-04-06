// app/game/[id]/not-found.jsx
import Link from 'next/link';

export default function GameNotFound() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4">
            <h1 className="text-white text-4xl font-bold mb-4">Game Not Found</h1>
            <p className="text-gray-400 text-lg mb-8">
                The game you're looking for doesn't exist or has been removed.
            </p>
            <Link
                href="/"
                className="px-6 py-3 bg-[#ffe632] text-black font-bold rounded-lg hover:bg-opacity-90"
            >
                Back to Home
            </Link>
        </div>
    );
}
