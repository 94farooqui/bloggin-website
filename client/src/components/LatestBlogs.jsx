import React from 'react'
import SampleBlogs from "./../data/SampleBlogs.json";
import LatestBlogCard from './LatestBlogCard';

const LatestBlogs = () => {
  return (
    <div className="w-full  border-r">
      <h2 className="text-2xl font-bold text-slate-600 mb-4">Latest Blogs</h2>
      <div className=" flex flex-col gap-4 pr-8">
        {SampleBlogs.map((blog) => (
          <LatestBlogCard blog={blog} />
        ))}
      </div>
      <div className="bg-red-100">
        {SampleBlogs.map((blog) => (
          <LatestBlogCard blog={blog} />
        ))}
      </div>
    </div>
  );
}

export default LatestBlogs