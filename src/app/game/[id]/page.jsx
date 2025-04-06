// app/game/[id]/page.jsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Client, Databases, Query } from 'node-appwrite';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Initialize Appwrite
const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY); // Server API key

const databases = new Databases(client);

// Configuration
const DATABASE_ID = 'game_shop_db';
const GAMES_COLLECTION_ID = 'games';
const KEYS_COLLECTION_ID = 'game_keys';

// This component is a Server Component by default
export default async function GamePage({ params }) {
    const {id} = await params;

    try {
        // Fetch game data from Appwrite directly
        const game = await databases.getDocument(
            DATABASE_ID,
            GAMES_COLLECTION_ID,
            id
        );

        // Fetch available keys for this game
        const keysResponse = await databases.listDocuments(
            DATABASE_ID,
            KEYS_COLLECTION_ID,
            [
                Query.equal('gameId', id),
                Query.equal('isSold', false)
            ]
        );

        const availableKeys = keysResponse.documents;

        // Calculate pricing information
        let minPrice = null;
        let maxPrice = null;
        let avgPrice = 0;

        if (availableKeys.length > 0) {
            const prices = availableKeys.map(key => {
                // Apply discount if available
                return key.price * (1 - (key.discountPercentage || 0) / 100);
            });

            minPrice = Math.min(...prices);
            maxPrice = Math.max(...prices);
            avgPrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
        }

        // Get available platforms
        const platforms = [...new Set(availableKeys.map(key => key.platform))];

        // Format the date for display
        const formattedDate = new Date(game.releaseDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        return (
            <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
                <Navbar />

                <main className="flex-grow container mx-auto px-4 py-8">
                    {/* Game Header */}
                    <div className="flex flex-col lg:flex-row gap-8 mb-10">
                        {/* Game Image */}
                        <div className="lg:w-1/2 relative">
                            <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
                                {game.youtubeReviewLink ? (
                                    <iframe
                                        src={`${game.youtubeReviewLink.replace('watch?v=', 'embed/')}`}
                                        title={`${game.title} review video`}
                                        className="w-full h-full"
                                        allowFullScreen
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    ></iframe>
                                ) : (
                                    <Image
                                        src={game.image || "/placeholder-game.jpg"}
                                        alt={game.title}
                                        fill
                                        style={{ objectFit: "cover" }}
                                        priority
                                    />
                                )}
                            </div>
                        </div>

                        {/* Game Info */}
                        <div className="lg:w-1/2 flex flex-col">
                            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">{game.title}</h1>

                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-2 py-1 bg-[#222] rounded-md text-sm">{game.genre}</span>
                                <span className="text-gray-400">Released: {formattedDate}</span>
                            </div>

                            {game.reviewScore && (
                                <div className="mb-4 flex items-center">
                                    <div className={`text-lg font-bold px-3 py-1 rounded-md ${
                                        game.reviewScore >= 8 ? 'bg-green-700 text-white' :
                                            game.reviewScore >= 6 ? 'bg-yellow-600 text-white' :
                                                'bg-red-700 text-white'
                                    }`}>
                                        {game.reviewScore}/10
                                    </div>
                                </div>
                            )}

                            <div className="prose prose-invert mb-6 max-w-none">
                                <p className="text-gray-300">{game.description}</p>
                            </div>

                            {/* Pricing Section */}
                            <div className="mt-auto">
                                <div className="bg-[#111] p-4 rounded-lg border border-[#333]">
                                    <h3 className="text-xl font-bold text-white mb-2">Available Keys</h3>

                                    {availableKeys.length > 0 ? (
                                        <>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {platforms.map(platform => (
                                                    <span key={platform} className="px-3 py-1 bg-[#222] rounded-md text-sm">
                            {platform}
                          </span>
                                                ))}
                                            </div>

                                            <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-2xl font-bold text-[#ffe632]">
                          ${minPrice?.toFixed(2)}
                        </span>
                                                {minPrice !== maxPrice && (
                                                    <span className="text-gray-400">
                            - ${maxPrice?.toFixed(2)}
                          </span>
                                                )}
                                            </div>

                                            <button className="w-full py-3 bg-[#ffe632] hover:bg-[#f0d800] text-black font-bold rounded-md transition-colors">
                                                View Available Keys ({availableKeys.length})
                                            </button>
                                        </>
                                    ) : (
                                        <p className="text-gray-400 mb-2">No keys currently available</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        );
    } catch (error) {
        console.error('Error fetching game:', error);
        notFound();
    }
}

// Generate metadata for the page
export async function generateMetadata({ params }) {
    const {id} = await params;

    try {
        const game = await databases.getDocument(
            DATABASE_ID,
            GAMES_COLLECTION_ID,
            id
        );

        return {
            title: `${game.title} - Victor Game Shop`,
            description: game.description?.substring(0, 160) || 'Get the best deal on this game at Victor Game Shop',
            openGraph: {
                title: `${game.title} - Victor Game Shop`,
                description: game.description?.substring(0, 160) || 'Get the best deal on this game',
                images: [game.image || '/placeholder-game.jpg']
            }
        };
    } catch (error) {
        return {
            title: 'Game - Victor Game Shop',
            description: 'Get the latest game keys at unbeatable prices'
        };
    }
}
