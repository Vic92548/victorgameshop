import Image from "next/image";

export default function Home() {
  const featuredGames = [
    { id: 1, title: "Cyber Explorer 2077", price: "$39.99", discount: "60% OFF", image: "/game1.jpg" },
    { id: 2, title: "Fantasy Quest XI", price: "$49.99", discount: "40% OFF", image: "/game2.jpg" },
    { id: 3, title: "Racing Masters 5", price: "$29.99", discount: "25% OFF", image: "/game3.jpg" },
    { id: 4, title: "Battle Legends", price: "$59.99", discount: "15% OFF", image: "/game4.jpg" }
  ];

  return (
      <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
        {/* Navigation */}
        <nav className="bg-black border-b border-[#222] sticky top-0 z-50">
          <div className="container mx-auto flex justify-between items-center py-4 px-6">
            <div className="flex items-center gap-2">
              <span className="text-[#ffe632] font-extrabold text-2xl tracking-tight">VICTOR<span className="text-white"> GAME SHOP</span> 🎮</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-white hover:text-[#ffe632] transition-colors text-sm uppercase font-medium">Home</a>
              <a href="#" className="text-white hover:text-[#ffe632] transition-colors text-sm uppercase font-medium">Store</a>
              <a href="#" className="text-white hover:text-[#ffe632] transition-colors text-sm uppercase font-medium">Deals</a>
              <a href="#" className="text-white hover:text-[#ffe632] transition-colors text-sm uppercase font-medium">Support</a>
              <button className="bg-[#ffe632] text-black px-4 py-2 rounded hover:bg-[#f0d800] transition-colors text-sm uppercase font-bold">
                Sign In
              </button>
            </div>
            <button className="md:hidden text-white">
              ☰
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative bg-black overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-30">
            <div className="w-full h-full bg-gradient-to-r from-[#6c43ff] to-transparent"></div>
          </div>
          <div className="container mx-auto px-6 py-16 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block bg-[#ffe632] text-black px-3 py-1 rounded-full text-xs font-bold mb-4 flex items-center gap-2">
                  🚀 FAIR PRICES, HAPPY GAMERS!
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  <span className="text-[#ffe632]">Game Keys</span> with a <span className="text-[#ffe632]">Smile</span> 🤠
                </h1>
                <p className="text-gray-300 text-xl mb-8">
                  Best prices, instant delivery, and community-powered game keys that won't break the bank!
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#" className="bg-[#ffe632] text-black px-8 py-3 rounded-md font-bold text-lg hover:bg-[#f0d800] transition-colors">
                    Shop Now 🛒
                  </a>
                  <a target={"_blank"} href="https://github.com/Vic92548/victorgameshop" className="bg-[#333] text-white px-8 py-3 rounded-md font-bold text-lg hover:bg-[#444] transition-colors flex items-center gap-2">
                    <span>Star us on GitHub</span> ⭐
                  </a>
                </div>
              </div>
              <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden border-2 border-[#ffe632] transform rotate-2 hover:rotate-0 transition-transform">
                <Image
                    src="/hero-games.jpg"
                    alt="Featured Games"
                    fill
                    style={{objectFit: "cover"}}
                    className="hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Featured Games Section */}
        <div className="py-16 bg-[#0a0a0a]">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold text-white">
                <span className="text-[#ffe632]">Hot</span> Deals 🔥
              </h2>
              <a href="#" className="text-[#ffe632] font-medium hover:underline flex items-center gap-1">
                View all deals 👉
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredGames.map(game => (
                  <div key={game.id} className="bg-[#121212] rounded-lg overflow-hidden hover:shadow-[0_0_15px_rgba(255,230,50,0.3)] transition-shadow group">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                          src={game.image}
                          alt={game.title}
                          fill
                          style={{objectFit: "cover"}}
                          className="group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 bg-[#ffe632] text-black font-bold text-xs px-2 py-1 rounded">
                        {game.discount}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-bold">{game.title}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-[#ffe632] font-bold">{game.price}</span>
                        <button className="bg-[#333] hover:bg-[#444] text-white text-sm px-3 py-1 rounded transition-colors">
                          Add to cart 🛒
                        </button>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="py-16 bg-[#080808]">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-white text-center mb-16">
              Why Choose <span className="text-[#ffe632]">Victor </span>Game Shop? 🤔
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-[#111] to-[#1a1a1a] p-8 rounded-lg text-center transform hover:-translate-y-2 transition-transform">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-[#ffe632] text-xl font-bold mb-4">Fair Prices</h3>
                <p className="text-gray-300">We believe gaming should be accessible to everyone. Enjoy competitive prices on all your favorite titles.</p>
              </div>

              <div className="bg-gradient-to-br from-[#111] to-[#1a1a1a] p-8 rounded-lg text-center transform hover:-translate-y-2 transition-transform">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-[#ffe632] text-xl font-bold mb-4">Instant Delivery</h3>
                <p className="text-gray-300">Get your game keys instantly after purchase. No waiting - start playing right away!</p>
              </div>

              <div className="bg-gradient-to-br from-[#111] to-[#1a1a1a] p-8 rounded-lg text-center transform hover:-translate-y-2 transition-transform">
                <div className="text-4xl mb-4">👨‍💻</div>
                <h3 className="text-[#ffe632] text-xl font-bold mb-4">Open Source</h3>
                <p className="text-gray-300">Our platform is 100% open source. Join our community and help us make game shopping better for everyone!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Streamer Connection */}
        <div className="py-16 bg-[#0a0a0a] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
            <Image
                src="/stream-bg.jpg"
                alt="Streaming background"
                fill
                style={{objectFit: "cover"}}
            />
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="lg:order-2">
                <div className="inline-block bg-[#6c43ff] text-white px-3 py-1 rounded-full text-xs font-bold mb-4">
                  FROM YOUR FAVORITE STREAMER 🎬
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Games from Someone You <span className="text-[#ffe632]">Actually Trust</span>
                </h2>
                <p className="text-gray-300 mb-6">
                  VictorGames was founded by a gamer and streamer who was tired of overpriced keys and shady stores. Join our community for giveaways, gaming tips, and live discussions!
                </p>
                <a href="https://twitch.tv/victorstreamer" className="inline-flex items-center gap-2 bg-[#9146FF] text-white px-6 py-3 rounded-md font-bold hover:bg-[#7d3bdd] transition-colors">
                  Follow on Twitch 📺
                </a>
              </div>
              <div className="relative h-[300px] lg:h-[400px] rounded-lg overflow-hidden border-4 border-[#6c43ff] transform -rotate-2 hover:rotate-0 transition-transform">
                <Image
                    src="/streamer.jpg"
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
          </div>
        </div>

        {/* Open Source Section */}
        <div className="py-16 bg-[#080808]">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-block bg-[#333] text-white px-3 py-1 rounded-full text-xs font-bold mb-4">
                OPEN SOURCE 🌐
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Join Our <span className="text-[#ffe632]">Open Source</span> Journey
              </h2>
              <p className="text-gray-300 mb-8">
                We believe in transparency and community collaboration. Our platform is open source, and we welcome contributions from developers worldwide. Help us create the best game key marketplace for gamers everywhere!
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="https://github.com/victorgames/keyshop" className="bg-[#333] text-white px-6 py-3 rounded-md font-bold hover:bg-[#444] transition-colors flex items-center gap-2">
                  <span>GitHub Repo</span> 👨‍💻
                </a>
                <a href="#" className="bg-[#ffe632] text-black px-6 py-3 rounded-md font-bold hover:bg-[#f0d800] transition-colors flex items-center gap-2">
                  <span>Join Discord</span> 🎮
                </a>
              </div>
            </div>

            <div className="mt-12 p-6 bg-[#121212] rounded-lg border border-[#333]">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-gray-400 text-sm">terminal</span>
              </div>
              <div className="font-mono text-sm text-gray-300">
                <p className="mb-2"><span className="text-[#ffe632]">$</span> git clone https://github.com/victorgames/keyshop.git</p>
                <p className="mb-2"><span className="text-[#ffe632]">$</span> cd keyshop</p>
                <p><span className="text-[#ffe632]">$</span> npm install <span className="animate-pulse">_</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="py-12 bg-[#0a0a0a]">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Stay Updated with <span className="text-[#ffe632]">Game Deals</span> 📬
              </h3>
              <p className="text-gray-300 mb-8">
                Subscribe to our newsletter and never miss a sale. We'll also throw in some exclusive discount codes just for subscribers!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                    type="email"
                    placeholder="your.email@example.com"
                    className="bg-[#1a1a1a] text-white px-4 py-3 rounded-md border border-[#333] focus:border-[#ffe632] focus:outline-none flex-grow"
                />
                <button className="bg-[#ffe632] text-black px-6 py-3 rounded-md font-bold hover:bg-[#f0d800] transition-colors whitespace-nowrap">
                  Subscribe 🎮
                </button>
              </div>
              <p className="text-gray-500 text-sm mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-black pt-16 pb-6">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <span className="text-[#ffe632] font-extrabold text-2xl tracking-tight">VICTOR<span className="text-white">GAMES</span> 🎮</span>
                <p className="text-gray-400 mt-4">
                  Your trusted source for game keys, built by a gamer for gamers!
                </p>
                <div className="flex gap-4 mt-6">
                  <a href="https://twitch.tv/victorstreamer" className="text-white hover:text-[#9146FF]">📺</a>
                  <a href="https://github.com/victorgames" className="text-white hover:text-white">👨‍💻</a>
                  <a href="#" className="text-white hover:text-[#1DA1F2]">🐦</a>
                  <a href="#" className="text-white hover:text-[#1877F2]">📘</a>
                  <a href="#" className="text-white hover:text-[#E4405F]">📸</a>
                </div>
              </div>

              <div>
                <h3 className="text-white font-bold mb-4">Shop</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-[#ffe632]">All Games</a></li>
                  <li><a href="#" className="hover:text-[#ffe632]">New Releases</a></li>
                  <li><a href="#" className="hover:text-[#ffe632]">Special Offers</a></li>
                  <li><a href="#" className="hover:text-[#ffe632]">Pre-orders</a></li>
                  <li><a href="#" className="hover:text-[#ffe632]">Gift Cards</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-bold mb-4">Account</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-[#ffe632]">My Account</a></li>
                  <li><a href="#" className="hover:text-[#ffe632]">My Orders</a></li>
                  <li><a href="#" className="hover:text-[#ffe632]">Wishlist</a></li>
                  <li><a href="#" className="hover:text-[#ffe632]">Support Tickets</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-bold mb-4">Open Source</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-[#ffe632]">GitHub Repo</a></li>
                  <li><a href="#" className="hover:text-[#ffe632]">Documentation</a></li>
                  <li><a href="#" className="hover:text-[#ffe632]">Contributors</a></li>
                  <li><a href="#" className="hover:text-[#ffe632]">Report Issues</a></li>
                  <li><a href="#" className="hover:text-[#ffe632]">Feature Requests</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-[#222] mt-10 pt-6 text-center text-gray-500">
              <p>© 2025 Victor Game Shop. Created with ❤️ by Victor's Game Venture.</p>
              <p className="mt-2 text-xs">This is an open source project. <a href="#" className="text-[#ffe632] hover:underline">View license</a>.</p>
            </div>
          </div>
        </footer>
      </div>
  );
}
