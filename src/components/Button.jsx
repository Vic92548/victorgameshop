// components/Button.jsx
export default function Button({
                                   children,
                                   href = null,
                                   variant = "primary",
                                   size = "md",
                                   className = ""
                               }) {
    const baseClasses = "font-bold rounded transition-colors flex items-center gap-2"

    const variantClasses = {
        primary: "bg-[#ffe632] text-black hover:bg-[#f0d800]",
        secondary: "bg-[#333] text-white hover:bg-[#444]",
        twitch: "bg-[#9146FF] text-white hover:bg-[#7d3bdd]"
    }

    const sizeClasses = {
        sm: "px-3 py-1 text-sm",
        md: "px-6 py-3",
        lg: "px-8 py-3 text-lg"
    }

    const buttonClasses = `${baseClasses} pointer ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

    if (href) {
        return (
            <a href={href} className={buttonClasses}>
                {children}
            </a>
        )
    }

    return (
        <button className={buttonClasses}>
            {children}
        </button>
    )
}
