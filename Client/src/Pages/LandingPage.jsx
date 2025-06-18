/* eslint-disable react/no-unescaped-entities */
import FeatureCard from "../Components/FeatureCard";
import { FaFacebookMessenger, FaUserCircle, FaVoteYea } from 'react-icons/fa';

const LandingPage = () => {
    return (
        <div>
            <section className="text-center py-16 px-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    Shape the Future of Our Product
                </h1>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Vote on features, share feedback, and help shape our product's roadmap.
                    Join the conversation and make your voice heard.
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md">
                    Get Started
                </button>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-20 max-w-6xl mx-auto">
                <FeatureCard
                    title="Vote on Features"
                    description="Upvote the features you want to see most. Your votes help us prioritize development."
                    icon={<FaVoteYea/>}
                />
                <FeatureCard
                    title="Share Feedback"
                    description="Comment on roadmap items to share your thoughts, ask questions, and discuss ideas."
                    icon={<FaFacebookMessenger/>}
                />
                <FeatureCard
                    title="Community Driven"
                    description="Join a community of users helping to shape the future of our product together."
                    icon={<FaUserCircle/>}
                />
            </section>
        </div>
    );
};

export default LandingPage;