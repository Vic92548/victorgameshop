// components/OpenSourceSection.jsx
import Button from "@/components/Button";

export default function OpenSourceSection() {
    return (
        <>
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
                    <Button href="https://github.com/Vic92548/victorgameshop" variant="secondary">
                        GitHub Repo 👨‍💻
                    </Button>
                    <Button href="https://discord.gg/fuGSrbb3wP" variant="primary">
                        Join Discord 🎮
                    </Button>
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
                    <p className="mb-2"><span className="text-[#ffe632]">$</span> git clone https://github.com/Vic92548/victorgameshop</p>
                    <p><span className="text-[#ffe632]">$</span> npm install</p>
                    <p><span className="text-[#ffe632]">$</span> npm run dev <span className="animate-pulse">_</span></p>
                </div>
            </div>
        </>
    )
}
