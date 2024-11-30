import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { addComment, fetchBlogDetails } from "../services/blogs-api";
import { FaHeart } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import CommentForm from "../components/CommentForm";
import { AuthContext } from "../context/AuthContext";
import { FaCaretDown } from "react-icons/fa";
import Comment from "../components/Comment";

const BlogDetails = () => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const blogId = location.state?.blogId;
  const [blog, setBlog] = useState();

  useEffect(() => {
    const fetchBlog = async (blogId) => {
      //console.log(userDetails);
      const data = await fetchBlogDetails(blogId);
      if (data) {
        //console.log(data);
        setBlog(data);
        setLoading(false);
      }
    };
    fetchBlog(blogId);
  }, []);

  const handleCommentSubmit = async () => {
    console.log(newComment);
    const added = await addComment(blogId, {
      user: user.id,
      message: newComment,
    });
    if (added) {
      setBlog({ ...blog, comments: [...blog.comments, added] });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (blog) {
    return (
      <div className="w-[1200px]  py-4 mx-auto">
        <div className="bg-white w-full flex flex-col gap-8 py-12 px-12 rounded-lg drop-shadow">
          <h2 className="text-3xl font-bold text-zinc-600">{blog.title}</h2>
          <div className="flex justify-start gap-8 w-full text-sm text-slate-500 ">
            <p className="flex items-center gap-2">
              <FaHeart /> {blog.likes.length}
            </p>
            <p className="flex items-center gap-2">
              <FaComments /> {blog.comments?.length}
            </p>
            <p className="flex items-center gap-2">
              <FaCalendar />
              {blog.createdAt
                ? new Date(blog.createdAt).toDateString()
                : blog.date}
            </p>
            <p className="flex items-center gap-2">
              <FaBookOpen /> By {blog.author.fullname || blog.author}
            </p>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: blog.content }} // Render rich text content
            className=" w-full "
          />
          <div className="mt-8 flex items-center gap-8">
            <p>Tags:</p>
            <div className="flex gap-4 items-center">
              {blog.tags.map((tag) => (
                <Link to={`/blogs/tags/${tag.replace("/s", "-")}`} key={tag}>
                  <p className="text-sm text-zinc-500 bg-zinc-100 py-1 px-2 hover:bg-zinc-200 hover:text-zinc-600 rounded-md">
                    #{tag}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="mt-4 bg-white w-full flex flex-col gap-8 py-8 px-12 rounded-lg drop-shadow">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-zinc-800">Comments</h2>
              <button
                onClick={() => setShowComments(!showComments)}
                className={`w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center text-slate-100 ${
                  showComments ? "rotate-180" : "rotate-0"
                } transition-transform ease-in-out duration-200`}
              >
                <FaCaretDown />
              </button>
            </div>
            {showComments && (
              <div className="flex flex-col gap-4">
                <CommentForm
                  handleCommentSubmit={handleCommentSubmit}
                  newComment={newComment}
                  setNewComment={setNewComment}
                />
                {blog.comments?.map((comment) => (
                  <Comment key={comment._id} comment={comment} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default BlogDetails;
