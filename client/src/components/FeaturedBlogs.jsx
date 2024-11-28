import React from 'react'
import SampleBlogs from './../data/SampleBlogs.json'
import FeaturedBlogCard from "./FeaturedBlogCard";
import { Link } from 'react-router-dom';

const FeaturedBlogs = () => {
  return (
    <div className="w-full pl-4">
      <h2 className="text-lg font-bold text-slate-600 mb-4">Featured Blogs</h2>
      <div className=" flex flex-col gap-4 ">
        {SampleBlogs.map((blog) => (
          <Link to={`${blog.title.replace(/\s+/g,'-').toLocaleLowerCase()}`}>
            <FeaturedBlogCard blog={blog} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FeaturedBlogs