import React from 'react'
import SampleBlogs from './../data/SampleBlogs.json'
import FeaturedBlogCard from "./FeaturedBlogCard";

const FeaturedBlogs = () => {
  return (
    <div className="w-full pl-4">
      <h2 className="text-lg font-bold text-slate-600 mb-4">Featured Blogs</h2>
      <div className=" flex flex-col gap-4 ">
        {SampleBlogs.map((blog) => (
          <FeaturedBlogCard blog={blog} />
        ))}
      </div>
    </div>
  );
}

export default FeaturedBlogs