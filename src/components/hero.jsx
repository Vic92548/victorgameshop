import StarGitHubButton from "@/components/GitHub/StarGitHubButton";

export default function(){return <div className="relative overflow-hidden" style={{
    backgroundImage: `url('/bg_hero.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100%'
}}>
    <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center">
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
                    <StarGitHubButton repo="Vic92548/victorgameshop" />
                </div>
            </div>
        </div>
    </div>
</div>};