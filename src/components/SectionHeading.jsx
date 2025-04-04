// components/SectionHeading.jsx
export default function SectionHeading({
                                           title,
                                           highlightText,
                                           emoji = null,
                                           viewAllLink = null,
                                           centered = false
                                       }) {
    if (centered) {
        return (
            <h2 className="text-3xl font-bold text-white text-center mb-16">
                {title} <span className="text-[#ffe632]">{highlightText} </span>{emoji}
            </h2>
        )
    }

    return (
        <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-white">
                <span className="text-[#ffe632]">{title}</span> {highlightText} {emoji}
            </h2>
            {viewAllLink && (
                <a href={viewAllLink} className="text-[#ffe632] font-medium hover:underline flex items-center gap-1">
                    View all deals 👉
                </a>
            )}
        </div>
    )
}
