import React, { useEffect, useState } from 'react'
import SampleBlogs from "./../data/SampleBlogs.json";
import LatestBlogCard from './LatestBlogCard';

import { getLatestBlogs } from "../services/blogs-api";
import { Link } from 'react-router-dom';
const LatestBlogs = () => {
    const [blogs, setBlogs] = useState(null);
    const [error, setError] = useState("");
    const [message, setMessage] = useState();

      useEffect(() => {
        const fetchBlogs = async () => {
          const result = await getLatestBlogs();
          if (result) {
            //console.log(result);
            if (result?.message) {
              setMessage(result.message);
            } else {
              //console.log(result);
              setBlogs(result);
            }
          }
        };
        fetchBlogs();
      }, []);

  return (
    <div className="w-full  border-r">
      <h2 className="text-2xl font-bold text-slate-600 mb-4">Latest Blogs</h2>
      <div className=" flex flex-col gap-4 pr-8">
        {blogs ? (
          blogs.map((blog) => (
            <Link
            key={blog.title}
            to={`/blogs/${blog.title
              .replace(/[\s:]+/g, "-")
              .toLocaleLowerCase()}`}
            state={{ blogId: blog._id }}
          >
              <LatestBlogCard key={blog.title} blog={blog} />
            </Link>
          ))
        ) : (
          <p>No Blogs found</p>
        )}
        {/* {SampleBlogs.map((blog) => (
          <LatestBlogCard key={blog.title} blog={blog} />
        ))} */}
      </div>
    </div>
  );
}

export default LatestBlogs