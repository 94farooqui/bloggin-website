import React, { useEffect, useState } from 'react'
import SampleBlogs from './../data/SampleBlogs.json'
import FeaturedBlogCard from "./FeaturedBlogCard";
import { Link } from 'react-router-dom';
import { getFeaturedBlogs } from '../services/blogs-api';


const FeaturedBlogs = () => {
  const [blogs,setBlogs] = useState(null)
  const [error,setError] = useState("")
  const [message,setMessage] = useState()

  useEffect(()=>{
    const fetchBlogs = async () => {
      const result = await getFeaturedBlogs()
      if(result){
        console.log(result)
        if (result?.message) {
          setMessage(result.message);
        } else {
          console.log(result);
          setBlogs(result);
        }
      }
      
    }
    fetchBlogs()
  },[])
  return (
    <div className="w-full pl-4">
      <h2 className="text-lg font-bold text-slate-600 mb-4">Featured Blogs</h2>
      <div className=" flex flex-col gap-4 ">
        {blogs ?  (
          blogs.map((blog) => (
            <Link
              key={blog.title}
              to={`${blog.title.replace(/\s+/g, "-").toLocaleLowerCase()}`}
            >
              <FeaturedBlogCard key={blog.title} blog={blog} />
            </Link>
          ))
        ) : <p>No Blogs found</p>}
        {/* {SampleBlogs.map((blog) => (
          <Link
            key={blog.title}
            to={`${blog.title.replace(/\s+/g, "-").toLocaleLowerCase()}`}
          >
            <FeaturedBlogCard key={blog.title} blog={blog} />
          </Link>
        ))} */}
      </div>
    </div>
  );
}

export default FeaturedBlogs