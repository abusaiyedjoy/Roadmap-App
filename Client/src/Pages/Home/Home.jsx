/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import RoadmapCard from "./RoadmapCard";
import toast from "react-hot-toast";


const Home = () => {
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All Status");
  const [sortBy, setSortBy] = useState("Most Popular");
  const [search, setSearch] = useState("");
  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://abusaiyedjoyserver.vercel.app/features');
        const data = await res.json();
        setRoadmap(data);
      } catch (error) {
        console.error("Error fetching features:", error);
        toast.error('Failed to fetch roadmap items');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="flex justify-center items-center min-h-screen text-3xl animate-spin">⭐</p>;

  const filteredData = roadmap
    .filter((item) => {
      const Search = item.title.toLowerCase().includes(search.toLowerCase());
      const Category = category === "All Categories" || item.title.toLowerCase().includes(category.toLowerCase());
      const Status = status === "All Status" || item.status.toLowerCase() === status.toLowerCase();
      return Search && Category && Status;
    })
    .sort((a, b) => {
      if (sortBy === "Most Popular") {
        return b.votes - a.votes;
      } else if (sortBy === "Newest") {
        return b.comments - a.comments;
      } else if (sortBy === "Oldest") {
        return a.comments - b.comments;
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">
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
              <option>Planning</option>
              <option>Progress</option>
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm w-full md:w-60"
            />
          </div>
        </div>

        {filteredData?.length > 0 ? (
          <div className="px-4 py-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6">
              {filteredData.map((item, index) => (
                <RoadmapCard key={index} feature={item} />
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-md py-10 text-center text-gray-500 shadow-sm">
            No roadmap items found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
