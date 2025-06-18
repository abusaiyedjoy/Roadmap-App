/* eslint-disable react/prop-types */
import { useState } from 'react';

const RoadmapCard = ({ status, title, description, votes, comments }) => {
  const [showComments, setShowComments] = useState(false);
  const [inputComment, setInputComment] = useState('');
  const [commentList, setCommentList] = useState([]);

  const statusColors = {
    Planning: 'bg-red-100 text-red-600',
    Progress: 'bg-yellow-100 text-yellow-600',
    Completed: 'bg-green-100 text-green-600',
  };

  const handleAddComment = () => {
    if (inputComment.trim() === '') return;
    setCommentList([...commentList, inputComment]);
    setInputComment('');
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md w-full transition-all duration-300">
      {/* Status badge */}
      <div className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 ${statusColors[status]}`}>
        {status.toUpperCase()}
      </div>

      {/* Title & Description */}
      <h3 className="font-bold text-lg text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-6">{description}</p>

      {/* Votes and Comments */}
      <div className="flex justify-between items-center text-sm text-gray-500">
        <button className="flex items-center gap-1">
          ❤️ <span>{votes}</span>
        </button>
        <button onClick={() => setShowComments(!showComments)} className="flex items-center gap-1">
          💬 Discuss ({commentList.length || comments})
        </button>
      </div>

      {/* Comment Section */}
      {showComments && (
        <div className="mt-6 border-t pt-4">
          <h4 className="text-sm font-semibold mb-2 text-gray-700">Discussion</h4>

          {commentList.length === 0 ? (
            <p className="text-gray-500 text-sm mb-4">No comments yet. Start the conversation!</p>
          ) : (
            <ul className="text-sm text-gray-700 space-y-2 mb-4">
              {commentList.map((comment, idx) => (
                <li key={idx} className="bg-gray-100 p-2 rounded-md">{comment}</li>
              ))}
            </ul>
          )}

          <textarea
            rows="3"
            placeholder="Share your thoughts, ideas, or feedback..."
            value={inputComment}
            onChange={(e) => setInputComment(e.target.value)}
            className="w-full p-2 border rounded-md text-sm mb-2"
          />
          <button
            onClick={handleAddComment}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 transition"
          >
            Post Comment
          </button>
        </div>
      )}
    </div>
  );
};

export default RoadmapCard;
