import React from 'react'
import { MdDateRange } from "react-icons/md";

const FeaturedBlogCard = ({blog}) => {
  //console.log(blog)
  return (
    <div className="bg-white p-4 border-slate-200 border-b flex flex-col gap-1 ">
      <p className="text-xs text-slate-400">
        By {blog.author.fullname || blog.author}
      </p>

      <h2 className="text-slate-600 font-semibold">{blog.title}</h2>
      <div className="">
        <p className="flex items-center gap-2 text-xs mt-2 text-slate-400">
          <span>
            <MdDateRange />
          </span>
          {blog.createdAt ? new Date(blog.createdAt).toDateString() : blog.date}
        </p>
      </div>
    </div>
  );
}

export default FeaturedBlogCard