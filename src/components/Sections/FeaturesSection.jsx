// components/Sections/FeaturesSection.jsx
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import FeatureCard from "@/components/FeatureCard";
import Section from "@/components/Section";

export default function OpenSourceSection() {
    return (
        <Section bgColor="#080808">
            <SectionHeading
                title="Why Victor "
                highlightText="Game Shop?"
                emoji="🤔"
                centered={true}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard
                    emoji="💰"
                    title="Fair Prices"
                    text="We believe gaming should be accessible to everyone. Enjoy competitive prices on all your favorite titles."
                />
                <FeatureCard
                    emoji="⚡"
                    title="Instant Delivery"
                    text="Get your game keys instantly after purchase. No waiting - start playing right away!"
                />
                <FeatureCard
                    emoji="👨‍💻"
                    title="Open Source"
                    text="Our platform is 100% open source. Join our community and help us make game shopping better for everyone!"
                />
            </div>
        </Section>
    )
}
