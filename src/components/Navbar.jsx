// components/Navbar.jsx
import Button from "@/components/Button";

export default function Navbar() {
    return (
        <nav className="bg-black border-b border-[#222] sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                <div className="flex items-center gap-2">
                    <a href={"/"} className="text-[#ffe632] font-extrabold text-2xl tracking-tight">VICTOR<span className="text-white"> GAME SHOP</span></a>
                </div>
                <div className="hidden md:flex items-center gap-8">
                    <a href="#" className="text-white hover:text-[#ffe632] transition-colors text-sm uppercase font-medium">Home</a>
                    <a href="#" className="text-white hover:text-[#ffe632] transition-colors text-sm uppercase font-medium">Store</a>
                    <a href="#" className="text-white hover:text-[#ffe632] transition-colors text-sm uppercase font-medium">Deals</a>
                    <a href="#" className="text-white hover:text-[#ffe632] transition-colors text-sm uppercase font-medium">Support</a>
                    <Button href={"/dashboard"} className="bg-[#ffe632] text-black px-4 py-2 rounded hover:bg-[#f0d800] transition-colors text-sm uppercase font-bold">
                        My Games Library 📖
                    </Button>
                </div>
                <button className="md:hidden text-white">
                    ☰
                </button>
            </div>
        </nav>
    )
}
