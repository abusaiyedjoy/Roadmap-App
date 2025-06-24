/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaHeart, FaCommentDots } from "react-icons/fa";
import CommentItem from "./CommentItem";

const MaxCheracters = 300;

const RoadmapCard = ({ feature }) => {
  const { _id: featureId, status, title, description, votes } = feature;

  const [showComments, setShowComments] = useState(false);
  const [inputComment, setInputComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [voteCount, setVoteCount] = useState(votes);

  const statusColors = {
    Planning: "bg-red-100 text-red-600",
    Progress: "bg-yellow-100 text-yellow-600",
    Completed: "bg-green-100 text-green-600",
  };

  useEffect(() => {
    fetch(`https://abusaiyedjoyserver.vercel.app/comments/${featureId}`)
      .then((res) => res.json())
      .then((data) => setCommentList(nestedComments(data)))
      .catch(() => toast.error("Failed to load comments."));
  }, [featureId]);

  const nestedComments = (comments) => {
    const map = {};
    const roots = [];

    comments.forEach((comment) => {
      comment.replies = [];
      map[comment._id] = comment;
    });

    comments.forEach((comment) => {
      if (comment.parentId) {
        const parent = map[comment.parentId];
        if (parent) parent.replies.push(comment);
      } else {
        roots.push(comment);
      }
    });

    return roots;
  };

  const handleComment = async () => {
    if (inputComment.length > MaxCheracters)
      return toast.error(`Max ${MaxCheracters} characters allowed.`);

    try {
      const res = await fetch("https://abusaiyedjoyserver.vercel.app/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          featureId,
          text: inputComment,
          parentId: null,
          depth: 0,
        }),
      });

      const result = await res.json();

      setCommentList((prev) => [
        ...prev,
        {
          ...result,
          text: inputComment,
          parentId: null,
          depth: 0,
          createdAt: new Date().toISOString(),
          replies: [],
        },
      ]);
      setInputComment("");
      toast.success("Comment added!");
    } catch {
      toast.error("Failed to add comment");
    }
  };

  const addReply = (list, parentId, reply) => {
    return list.map((comment) => {
      if (comment._id === parentId) {
        return { ...comment, replies: [...comment.replies, reply] };
      } else if (comment.replies.length) {
        return {
          ...comment,
          replies: addReply(comment.replies, parentId, reply),
        };
      }
      return comment;
    });
  };

  const handleReply = async (parentId, text, depth) => {
    if (text.length > MaxCheracters)
      return toast.error(`Max ${MaxCheracters} characters allowed.`);

    try {
      const res = await fetch("https://abusaiyedjoyserver.vercel.app/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          featureId,
          text,
          parentId,
          depth: depth + 1,
        }),
      });

      const result = await res.json();

      const replyObj = {
        ...result,
        text,
        parentId,
        depth: depth + 1,
        createdAt: new Date().toISOString(),
        replies: [],
      };

      setCommentList((prev) => addReply(prev, parentId, replyObj));
      toast.success("Reply added!");
    } catch {
      toast.error("Failed to add reply");
    }
  };

  const editComment = (list, id, newText) =>
    list.map((comment) => {
      if (comment._id === id) return { ...comment, text: newText };
      if (comment.replies.length)
        return {
          ...comment,
          replies: editComment(comment.replies, id, newText),
        };
      return comment;
    });

  const handleEdit = async (id, newText) => {
    if (newText.length > MaxCheracters)
      return toast.error(`Max ${MaxCheracters} characters allowed.`);

    try {
      const res = await fetch(`https://abusaiyedjoyserver.vercel.app/comments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newText }),
      });

      if (!res.ok) throw new Error("Failed to update comment");

      setCommentList((prev) => editComment(prev, id, newText));
      toast.success("Comment updated!");
    } catch {
      toast.error("Failed to update comment");
    }
  };

  const deleteComment = (list, id) =>
    list
      .filter((comment) => comment._id !== id)
      .map((comment) => ({
        ...comment,
        replies: comment.replies ? deleteComment(comment.replies, id) : [],
      }));

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://abusaiyedjoyserver.vercel.app/comments/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete comment");

      setCommentList((prev) => deleteComment(prev, id));
      toast.success("Comment deleted!");
    } catch {
      toast.error("Failed to delete comment");
    }
  };

  const handleUpvote = () => {
    setHasUpvoted(!hasUpvoted);
    setVoteCount((prev) => (hasUpvoted ? prev - 1 : prev + 1));
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md w-full transition-all duration-300">
      <div
        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 ${statusColors[status]}`}
      >
        {status.toUpperCase()}
      </div>

      <h3 className="font-bold text-lg text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-6">{description}</p>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <button
          onClick={handleUpvote}
          className={`flex items-center cursor-pointer hover:scale-105 gap-1 ${hasUpvoted ? "text-blue-500" : ""}`}
        >
          <FaHeart /> <span>{voteCount}</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center border rounded-2xl px-3 cursor-pointer py-1 hover:bg-blue-600 transition-transform duration-200 ease-in-out hover:text-white gap-1"
        >
          <FaCommentDots /> Comments
        </button>
      </div>

      {showComments && (
        <div className="mt-6 border-t border-gray-200 pt-4">
          <h4 className="text-sm font-semibold mb-2 text-gray-700">Discussion</h4>

          {commentList.length === 0 ? (
            <p className="text-gray-500 text-sm mb-4">
              No comments yet.
            </p>
          ) : (
            <ul className="text-sm text-gray-700 space-y-4 mb-4">
              {commentList.map((comment) => (
                <li key={comment._id}>
                  <CommentItem
                    comment={comment}
                    depth={0}
                    onReply={(txt) => handleReply(comment._id, txt, 0)}
                    onDelete={() => handleDelete(comment._id)}
                    onEdit={(txt) => handleEdit(comment._id, txt)}
                  />
                </li>
              ))}
            </ul>
          )}

          <textarea
            rows="3"
            value={inputComment}
            onChange={(e) => setInputComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full p-2 border border-gray-300 rounded-md text-sm mb-2"
            maxLength={MaxCheracters}
          />
          <button
            onClick={handleComment}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
          >
            Post Comment
          </button>
        </div>
      )}
    </div>
  );
};

export default RoadmapCard;
