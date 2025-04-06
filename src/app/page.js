// app/page.js
import { Suspense } from 'react';
import Image from 'next/image';
import Hero from "@/components/hero";
import GameCard from "@/components/GameCard";
import Navbar from "@/components/Navbar";
import SectionHeading from "@/components/SectionHeading";
import Section from "@/components/Section";
import StreamerCard from "@/components/StreamerCard";
import OpenSourceSection from "@/components/Sections/OpenSourceSection";
import FeaturesSection from "@/components/Sections/FeaturesSection";
import Footer from "@/components/Footer";

// Server-side data fetching function
async function getFeaturedGames() {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/games?limit=4&featured=true`,
            {
                next: { revalidate: 30 } // Revalidate every 30 seconds
            }
        );

        if (!response.ok) throw new Error('Failed to fetch games');

        const data = await response.json();
        return data.games || [];
    } catch (error) {
        console.error('Error fetching games:', error);
        // Return fallback data
        return [
            // Your fallback data with keysInfo structure
            {
                id: 1,
                title: "Cyber Explorer 2077",
                image: "/game1.jpg",
                keysInfo: {
                    availableCount: 5,
                    minPrice: 39.99,
                    maxPrice: 49.99,
                    platforms: ["PC", "Xbox"]
                }
            }
        ];
    }
}

export default async function Home() {
    // Fetch data on the server
    const gamesData = await getFeaturedGames();

    const featuredGames = gamesData.map(game => ({
        id: game.id,
        title: game.title,
        price: game.keysInfo?.minPrice ? `$${game.keysInfo.minPrice.toFixed(2)}` : "$49.99",
        discount:  game.keysInfo?.discount + "% OFF",
        image: game.image || "/placeholder-game.jpg"
    }));

    console.log(featuredGames);

    return (
        <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
            {/* Navigation */}
            <Navbar />

            {/* Hero Section */}
            <Hero />

            {/* Featured Games Section */}
            <Section>
                <SectionHeading
                    title="Hot"
                    highlightText="Deals"
                    emoji="🔥"
                    viewAllLink="#"
                />

                <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading games...</div>}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredGames.map(game => (
                            <GameCard key={game.id} game={game} />
                        ))}
                    </div>
                </Suspense>
            </Section>

            {/* Why Choose Us Section */}
            <FeaturesSection />

            {/* Streamer Connection */}
            <Section className="relative overflow-hidden">
                <div className="relative z-10">
                    <StreamerCard />
                </div>
            </Section>

            {/* Open Source Section */}
            <Section bgColor="#080808">
                <OpenSourceSection />
            </Section>

            {/* Footer */}
            <Footer />
        </div>
    );
}
