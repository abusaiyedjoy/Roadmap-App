/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import RoadmapCard from "./RoadmapCard"

const cardsData = [
  {
    status: 'Planning',
    title: 'Advanced Search Functionality',
    description: 'Implement advanced filtering and search capabilities...',
    votes: 15,
    comments: 1,
  },
  {
    status: 'Progress',
    title: 'Mobile App Development',
    description: 'Create native mobile apps for iOS and Android...',
    votes: 28,
    comments: 0,
  },
  {
    status: 'Completed',
    title: 'Performance Optimization',
    description: 'Improve loading times and overall app performance...',
    votes: 42,
    comments: 0,
  },
  {
    status: 'Planning',
    title: 'Dark Mode Support',
    description: 'Add dark theme option with automatic switching...',
    votes: 33,
    comments: 0,
  },
  {
    status: 'Planning',
    title: 'Multi-language Support',
    description: 'Enable app translation to support global users...',
    votes: 21,
    comments: 3,
  },
  {
    status: 'Progress',
    title: 'Collaboration Tools',
    description: 'Add @mentions, shared threads, and real-time editing...',
    votes: 19,
    comments: 2,
  },
  {
    status: 'Completed',
    title: 'Bug Reporting Flow',
    description: 'Provide users an easy way to report bugs directly...',
    votes: 50,
    comments: 6,
  },
];

const Home = () => {
    const [category, setCategory] = useState("All");
    const [status, setStatus] = useState("All");
    const [sortBy, setSortBy] = useState("Most Popular");
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-2">Product Roadmap</h1>
                <p className="text-gray-600 mb-6">
                    Vote on features, share feedback, and help shape our product's future
                </p>

                {/* Filter, Sort & Search Section */}
                <div className="flex flex-col gap-4 md:flex-row md:flex-wrap justify-between items-start bg-white border border-gray-200 p-4 md:p-6 rounded-md mb-8">

                    <div className="flex flex-col items-start gap-2 w-full md:w-auto">
                        <label className="text-sm font-medium whitespace-nowrap">Category:</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="border rounded-md px-3 py-2 text-sm w-full md:w-50"
                        >
                            <option>All Categories</option>
                            <option>Feature</option>
                            <option>Improvement</option>
                            <option>Bug</option>
                        </select>
                    </div>

                    <div className="flex flex-col items-start gap-2 w-full md:w-auto">
                        <label className="text-sm font-medium whitespace-nowrap">Status:</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border rounded-md px-3 py-2 text-sm w-full md:w-50"
                        >
                            <option>All Status</option>
                            <option>Planned</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                        </select>
                    </div>

                    <div className="flex flex-col items-start gap-2 w-full md:w-auto">
                        <label className="text-sm font-medium whitespace-nowrap">Sort by:</label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="border rounded-md px-3 py-2 text-sm w-full md:w-50"
                        >
                            <option>Most Popular</option>
                            <option>Newest</option>
                            <option>Oldest</option>
                        </select>
                    </div>

                    <div className="flex flex-col items-start gap-2 w-full md:w-auto">
                        <label className="text-sm font-medium whitespace-nowrap">Search:</label>
                        <input
                            type="text"
                            placeholder="🔍 Search roadmap items"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border rounded-md px-3 py-2 text-sm w-full md:w-60"
                        />
                    </div>
                </div>

                <div className="px-4 py-10 bg-gradient-to-br from-indigo-200 to-purple-300 min-h-screen">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cardsData.map((item, index) => (
          <RoadmapCard key={index} {...item} />
        ))}
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