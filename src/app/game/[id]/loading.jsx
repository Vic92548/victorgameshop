// app/game/[id]/loading.jsx
export default function GameLoading() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ffe632] mb-4"></div>
                <p className="text-white text-lg">Loading game details...</p>
            </div>
        </div>
    );
}
