// components/Section.jsx
export default function Section({
                                    children,
                                    bgColor = "#0a0a0a",
                                    className = ""
                                }) {
    return (
        <div className={`py-16 ${className}`} style={{ backgroundColor: bgColor }}>
            <div className="container mx-auto px-6">
                {children}
            </div>
        </div>
    )
}
