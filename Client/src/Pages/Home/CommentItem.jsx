/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { FaUserCircle, FaEdit, FaTrash } from "react-icons/fa";
import { AuthContext } from "./../../Provider/AuthProvider";

const CommentItem = ({ comment, depth, onReply, onDelete, onEdit }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [editText, setEditText] = useState(comment.text);
  const { user } = useContext(AuthContext);

  return (
    <div className={`ml-${depth * 4} mt-2`}>
      <div className="bg-gray-100 p-2 rounded-md text-sm text-gray-700">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <FaUserCircle className="text-gray-400" />
            <span className="font-semibold text-xs">
              {user?.displayName || "Anonymous"}
            </span>
          </div>
          <div className="flex gap-2 text-xs">
            <button onClick={() => setIsEditing(!isEditing)}>
              <FaEdit />
            </button>
            <button onClick={onDelete}>
              <FaTrash />
            </button>
          </div>
        </div>
        {!isEditing ? (
          <p className="mt-2">{comment.text}</p>
        ) : (
          <div className="mt-2">
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full p-1 border rounded-md text-sm mb-1"
            />
            <button
              className="bg-blue-500 text-white px-2 py-1 text-xs rounded hover:bg-blue-600"
              onClick={() => {
                onEdit(editText);
                setIsEditing(false);
              }}
            >
              Save
            </button>
          </div>
        )}
      </div>

      {depth < 2 && !isEditing && (
        <button
          onClick={() => setIsReplying(!isReplying)}
          className="text-xs text-blue-500 ml-4 mt-1"
        >
           Reply
        </button>
      )}

      {isReplying && (
        <div className="mt-1 ml-4">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="w-full p-2 border rounded-md text-sm mb-1"
            placeholder="Write a reply..."
          />
          <button
            onClick={() => {
              onReply(replyText);
              setReplyText("");
              setIsReplying(false);
            }}
            className="bg-blue-500 text-white px-3 py-1 text-xs rounded-md"
          >
            Post Reply
          </button>
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        comment.replies.map((reply) => (
          <CommentItem
            key={reply._id}
            comment={reply}
            depth={depth + 1}
            onReply={(txt) => onReply(txt)}
            onDelete={() => onDelete(reply._id)}
            onEdit={(newText) => onEdit(newText)}
          />
        ))
      )}
    </div>
  );
};

export default CommentItem;
