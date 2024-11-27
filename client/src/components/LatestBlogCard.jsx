import React from 'react'
import { MdDateRange } from 'react-icons/md';
import { FaRegHeart } from "react-icons/fa";
import { FaRegComments } from "react-icons/fa";
import { FaRegCalendar } from "react-icons/fa";

const LatestBlogCard = ({blog}) => {
  return (
    <div className="bg-white border-slate-200 border rounded-lg shadow-md flex overflow-hidden">
      <div className="flex flex-col gap-2 justify-between p-4 flex-1">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold">{blog.title}</h2>
          <p className="text-sm text-slate-500">{blog.description_summary}</p>
        </div>

        <div className="w-full flex justify-between text-sm text-slate-400">
          <p className="flex gap-2 items-center ">
            <span className="inline">
              <FaRegCalendar />
            </span>
            <span>{blog.date}</span>
          </p>
          <div className="flex gap-4">
            <p className="flex gap-1 items-center">
              <FaRegHeart />
              {blog.likes}
            </p>
            <p className="flex gap-1 items-center">
              <FaRegComments />
              {blog.comments.length}
            </p>
          </div>
        </div>
      </div>
      <div className="w-[35%] h-[150px] bg-gradient-to-r from-slate-700 to-slate-600"></div>
    </div>
  );
}

export default LatestBlogCard