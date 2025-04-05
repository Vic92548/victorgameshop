// components/Footer.jsx
import Link from 'next/link';

export default function Footer() {
    // Define all footer links in a structured way
    const footerLinks = [
        {
            title: "Shop",
            links: [
                { label: "Game Keys", href: "/shop/game-keys" },
                { label: "Special Offers", href: "/shop/offers" },
                { label: "Gift Cards", href: "/shop/gift-cards" },
                { label: "New Releases", href: "/shop/new-releases" },
                { label: "Pre-orders", href: "/shop/pre-orders" }
            ]
        },
        {
            title: "Support",
            links: [
                { label: "FAQ", href: "/support/faq" },
                { label: "Contact Us", href: "/support/contact" },
                { label: "How to Redeem", href: "/support/how-to-redeem" },
                { label: "Refund Policy", href: "/support/refund-policy" },
                { label: "Account Issues", href: "/support/account-issues" }
            ]
        },
        {
            title: "Legal",
            links: [
                { label: "Terms of Service", href: "/legal/terms" },
                { label: "Privacy Policy", href: "/legal/privacy" },
                { label: "Cookie Policy", href: "/legal/cookies" },
                { label: "EULA", href: "/legal/eula" }
            ]
        }
    ];

    const socialLinks = [
        { platform: "Twitter", icon: "𝕏", href: "https://twitter.com/victorgameshop" },
        { platform: "Discord", icon: "🎮", href: "https://discord.gg/fuGSrbb3wP" },
        { platform: "GitHub", icon: "🐙", href: "https://github.com/Vic92548/victorgameshop" },
        { platform: "YouTube", icon: "📺", href: "https://youtube.com/victorgameshop" }
    ];

    return (
        <footer className="bg-[#0a0a0a] border-t border-[#222] pt-16 pb-8">
            <div className="container mx-auto px-6">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <div className="mb-6">
                            <span className="text-[#ffe632] font-extrabold text-2xl tracking-tight">VICTOR<span className="text-white"> GAME SHOP</span></span>
                        </div>
                        <p className="text-gray-400 mb-6 text-sm">
                            Your one-stop destination for game keys at unbeatable prices.
                            We believe gaming should be accessible to everyone!
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.platform}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-[#ffe632] text-xl transition-colors"
                                    aria-label={social.platform}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {footerLinks.map((category) => (
                        <div key={category.title}>
                            <h3 className="text-white font-bold mb-4">{category.title}</h3>
                            <ul className="space-y-2">
                                {category.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-400 hover:text-[#ffe632] text-sm transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-[#222] mt-10 pt-6 text-center text-gray-500">
                    <p>© 2025 Victor Game Shop. Created with ❤️ by <a target={"_blank"} className="text-[#ffe632] hover:underline" href={"https://twitch.tv/victorgamestudio"}>Victor Game Studio</a></p>
                    <p className="mt-2 text-xs">This is an open source project. <a href="https://github.com/Victor-Game-Studio/victorgameshop/blob/main/LICENSE" target={"_blank"} className="text-[#ffe632] hover:underline">View license</a>.</p>
                </div>
            </div>
        </footer>
    );
}
