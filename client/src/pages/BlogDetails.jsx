import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { addComment, fetchBlogDetails } from "../services/blogs-api";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegComments } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import CommentForm from "../components/CommentForm";
import { AuthContext } from "../context/AuthContext";
import { FaCaretDown } from "react-icons/fa";
import Comment from "../components/Comment";

import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaRegShareSquare } from "react-icons/fa";
import { FaShareSquare } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";

const BlogDetails = () => {
  const params = useParams()
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const blogId = location.state?.blogId || params.blogId;
  const [blog, setBlog] = useState();

  useEffect(() => {
    const fetchBlog = async (blogId) => {
      //console.log(userDetails);
      const data = await fetchBlogDetails(blogId);
      if (data) {
        console.log(data);
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
        <div className="relative bg-white w-full flex flex-col gap-8 py-12 px-12 rounded-lg drop-shadow">
          {params.blogId && <Link to='edit' className="absolute top-2 right-2 flex items-center gap-2 bg-slate-200 text-slate-400 hover:bg-slate-600 hover:text-slate-100 px-2 py-1 rounded-md text-sm">Edit <FaRegEdit /></Link>}
          <h2 className="text-3xl font-bold text-zinc-600">{blog.title}</h2>
          <p className="text-sm text-zinc-500">{blog.summary}</p>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <div className="w-8 h-8 rounded-full bg-zinc-400"></div>
              <div className="flex flex-col text-sm text-zinc-500">
                <p className="flex items-center gap-2">
                  <FaCalendar />
                  {blog.createdAt
                    ? new Date(blog.createdAt).toDateString()
                    : blog.date}
                </p>
                <p className="flex items-center gap-2">
                  <FaBookOpen /> By{" "}
                  <span className="font-semibold">
                    {blog.author.fullname || blog.author}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex justify-between w-full  text-zinc-500 border-y py-4 ">
              <div className="flex items-center gap-8 ">
              <p className="flex items-center gap-2">
                {user ? (
                  blog.likes.includes(user.id) ? (
                    <FaHeart />
                  ) : (
                    <FaRegHeart />
                  )
                ) : (
                  <FaRegHeart />
                )}{" "}
                {blog.likes.length}
              </p>
              <p className="flex items-center gap-2">
                {user ? (
                  blog.comments.some(
                    (comment) => comment.user._id == user.id
                  ) ? (
                    <FaComments />
                  ) : (
                    <FaRegComments />
                  )
                ) : (
                  <FaRegComments />
                )}{" "}
                {blog.comments?.length}
              </p>
              </div>
              <div className="flex items-center gap-8">
              <FaRegBookmark/>
              <FaRegShareSquare/>
              </div>
              
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: blog.content }} // Render rich text content
            className=" w-full text-zinc-700 "
          />
          <div className="mt-8 flex items-start gap-8">
            <p className="bg-zinc-200 rounded-md px-4 py-1">Tags:</p>
            <div className="flex gap-4 items-center flex-wrap">
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
                className={`w-6 h-6 bg-zinc-600 rounded-full flex items-center justify-center text-zinc-100 ${
                  showComments ? "rotate-180" : "rotate-0"
                } transition-transform ease-in-out duration-200`}
              >
                <FaCaretDown />
              </button>
            </div>
            {showComments && (
              <div className="flex flex-col gap-4">
                {user?.id && (
                  <CommentForm
                    handleCommentSubmit={handleCommentSubmit}
                    newComment={newComment}
                    setNewComment={setNewComment}
                  />
                )}
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
