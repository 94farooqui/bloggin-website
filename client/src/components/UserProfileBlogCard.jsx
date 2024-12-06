import React from 'react'
import { Link } from 'react-router-dom';
import { FaBoxArchive } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";

import { deleteBlog } from '../services/blogs-api';

const UserProfileBlogCard = ({blog}) => {
  const handleDelete = async (blogId) => {
    console.log("Blog delete")
    const response = await deleteBlog(blogId);
    if (response) {
      alert("Blog has been deleted Successfully");
    } else {
      alert("Something went wrong, unable to delete");
    }
  };
  return (
    <div className="relative group bg-white border-slate-200 border rounded-lg shadow-md flex overflow-hidden">
      <div className="flex flex-col gap-2 justify-between p-4 flex-1">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold line-clamp-1">{blog.title}</h2>
          <p className="text-sm text-slate-500 line-clamp-2">
            {blog.summary || blog.description_summary}
          </p>
        </div>

        {/* <div className="w-full flex justify-between text-sm text-slate-400">
          <p className="flex gap-2 items-center ">
            <span className="inline">
              <FaRegCalendar />
            </span>
            <span>
              {blog.createdAt
                ? new Date(blog.createdAt).toDateString()
                : blog.date}
            </span>
          </p>
          <div className="flex gap-4">
            <p className="flex gap-1 items-center">
              <FaRegHeart />
              {blog.likes.length}
            </p>
            <p className="flex gap-1 items-center">
              <FaRegComments />
              {blog.comments?.length}
            </p>
          </div>
        </div> */}
        <div className="absolute hidden group-hover:flex bottom-0 left-0 bg-slate-100 bg-opacity-50 w-full items-center">
          <Link
            to={`${blog._id}/edit`}
            className="flex-1 m-1 text-center flex justify-center gap-2 text-sm text-slate-600 items-center"
          >
            <FaRegEdit />
            Edit
          </Link>
          <button
            className="flex-1 m-1 text-center flex justify-center gap-2 text-sm text-slate-600 items-center"
            onClick={() => handleDelete(blog._id)}
          >
            <FaBoxArchive />
            Delete
          </button>
        </div>
      </div>
      <div className="w-[35%] h-[150px] bg-gradient-to-r from-slate-700 to-slate-600"></div>
    </div>
  );
}

export default UserProfileBlogCard