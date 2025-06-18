/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";

const Home = () => {
    const [category, setCategory] = useState("All");
    const [status, setStatus] = useState("All");
    const [sortBy, setSortBy] = useState("Most Popular");

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-2">Product Roadmap</h1>
                <p className="text-gray-600 mb-6">
                    Vote on features, share feedback, and help shape our product's future
                </p>

                {/* Filter & Sort Section */}
                <div className="flex flex-col md:flex-row justify-start items-center gap-4 bg-white border border-gray-200 p-8 rounded-md mb-8">
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium">Category:</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="border rounded-md px-3 py-2 text-sm"
                        >
                            <option>All Categories</option>
                            <option>Feature</option>
                            <option>Improvement</option>
                            <option>Bug</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium">Status:</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border rounded-md px-3 py-2 text-sm"
                        >
                            <option>All Status</option>
                            <option>Planned</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium">Sort by:</label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="border rounded-md px-3 py-2 text-sm"
                        >
                            <option>Most Popular</option>
                            <option>Newest</option>
                            <option>Oldest</option>
                        </select>
                    </div>
                </div>

                {/* No Roadmap Items Message */}
                <div className="bg-white border border-gray-200 rounded-md py-10 text-center text-gray-500 shadow-sm">
                    No roadmap items found matching your criteria.
                </div>
            </div>
        </div>
    );
};

export default Home;