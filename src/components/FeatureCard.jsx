export default function ({emoji, title, text}) {
    return (
        <div className="bg-gradient-to-br from-[#111] to-[#1a1a1a] p-8 rounded-lg text-center transform hover:-translate-y-2 transition-transform">
            <div className="text-4xl mb-4">{emoji}</div>
            <h3 className="text-[#ffe632] text-xl font-bold mb-4">{title}</h3>
            <p className="text-gray-300">{text}</p>
        </div>
    );
}