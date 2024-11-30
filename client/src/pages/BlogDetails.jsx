import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchBlogDetails } from "../services/blogs-api";
import { FaHeart } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";

const BlogDetails = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const blogId = location.state?.blogId;
  const [blog, setBlog] = useState();

  useEffect(() => {
    const fetchBlog = async (blogId) => {
      const data = await fetchBlogDetails(blogId);
      if (data) {
        //console.log(data)
        setBlog(data);
        setLoading(false);
      }
    };
    fetchBlog(blogId);
  }, []);

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
              <FaComments /> {blog.comments.length}
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
          <h2 className="text-xl font-semibold text-zinc-800">Comments</h2>
              <div className="mt-4 bg-white w-full flex flex-col gap-8 py-12 px-12 rounded-lg drop-shadow">

              </div>
        </div>
      </div>
    );
  }
};

export default BlogDetails;
