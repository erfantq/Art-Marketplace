import React, { useState } from "react";

const CommentForm = ({ onSubmit }) => {
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (content.trim()) {
            onSubmit(content);
            setContent(""); // Clear input after submission
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                rows="3"
            >
            </textarea>
            <button type="submit" className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-500 transition duration-200">
                Submit
            </button>
        </form>
    )
};

const Comment = ({ comment }) => (
    <div className="image-container col-start-2 col-end-12 mr-5 mt-10 bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-8">{comment}
    </div>
    // <div className="border-b border-gray-700 py-2">
    //     <p className="text-gray-300">{comment}</p>
    // </div>
);

const CommentSection = ({ comments, onAddComment }) => (
    <div className="mt-4 col-span-full">
        <h2 className="text-xl font-semibold mb-2 text-gray-400">Add Comment</h2>
        {comments.length === 0 ? (
            <p className="text-gray-400">No comments yet. Be the first to comment!</p>
        ) : (
            comments.map((comment, index) => (
                <Comment key={index} comment={comment} />
            ))
        )}
        <CommentForm onSubmit={onAddComment} />
    </div>
);

export default CommentSection;
