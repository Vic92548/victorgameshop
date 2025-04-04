// app/page.js
"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import Hero from "@/components/hero";
import GameCard from "@/components/GameCard";
import FeatureCard from "@/components/FeatureCard";
import Navbar from "@/components/Navbar";
import SectionHeading from "@/components/SectionHeading";
import Section from "@/components/Section";
import StreamerCard from "@/components/StreamerCard";
import OpenSourceSection from "@/components/Sections/OpenSourceSection";
import Footer from "@/components/Footer";

export default function Home() {
    const [featuredGames, setFeaturedGames] = useState([
        { id: 1, title: "Cyber Explorer 2077", price: "$39.99", discount: "60% OFF", image: "/game1.jpg" },
        { id: 2, title: "Fantasy Quest XI", price: "$49.99", discount: "40% OFF", image: "/game2.jpg" },
        { id: 3, title: "Racing Masters 5", price: "$29.99", discount: "25% OFF", image: "/game3.jpg" },
        { id: 4, title: "Battle Legends", price: "$59.99", discount: "15% OFF", image: "/game4.jpg" }
    ]);

    useEffect(() => {
        // Fetch real game data
        fetch('/api/games?limit=4&featured=true')
            .then(response => response.json())
            .then(data => {
                if (data.games && data.games.length > 0) {
                    const formattedGames = data.games.map(game => ({
                        id: game.id,
                        title: game.title,
                        price: game.keysInfo?.minPrice ? `$${game.keysInfo.minPrice.toFixed(2)}` : "$49.99",
                        discount: game.keysInfo?.minPrice !== game.keysInfo?.maxPrice ? "ON SALE" : "",
                        image: game.image || "/placeholder-game.jpg"
                    }));
                    setFeaturedGames(formattedGames);
                }
            })
            .catch(error => {
                console.error('Error fetching games:', error);
                // On error, keep using the default hardcoded data
            });
    }, []);

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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {featuredGames.map(game => (
                      <GameCard key={game.id} game={game} />
                  ))}
              </div>
          </Section>

        {/* Why Choose Us Section */}
        <Section bgColor="#080808">
          <SectionHeading
              title="Why Victor "
              highlightText="Game Shop?"
              emoji="🤔"
              centered={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
                emoji="💰"
                title="Fair Prices"
                text="We believe gaming should be accessible to everyone. Enjoy competitive prices on all your favorite titles."
            />
            <FeatureCard
                emoji="⚡"
                title="Instant Delivery"
                text="Get your game keys instantly after purchase. No waiting - start playing right away!"
            />
            <FeatureCard
                emoji="👨‍💻"
                title="Open Source"
                text="Our platform is 100% open source. Join our community and help us make game shopping better for everyone!"
            />
          </div>
        </Section>

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
