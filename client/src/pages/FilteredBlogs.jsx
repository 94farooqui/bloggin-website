import React, { useEffect, useState } from "react";
import { fetchFilteredBlogs } from "../services/blogs-api";
import { Link, useParams } from "react-router-dom";
import FilteredBlogCard from "../components/FilteredBlogCard";

const FilteredBlogs = () => {
  const { filter } = useParams();
  const [blogs, setBlogs] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async (filter) => {
      const data = await fetchFilteredBlogs(filter);
      if (data) {
        //console.log(data);
        setBlogs(data);
        setLoading(false);
      }
    };
    fetchBlogs(filter);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="w-[1200px] mx-auto py-8">
      <h2 className="text-2xl font-semibold text-zinc-500 mb-4">
        Results for '{filter}'
      </h2>
      <div className="flex flex-col gap-4">
        {blogs.map((blog) => (
          <Link
            key={blog.title}
            to={`/blogs/${blog.title
              .replace(/[\s:]+/g, "-")
              .toLocaleLowerCase()}`}
            state={{ blogId: blog._id }}
          >
            <FilteredBlogCard blog={blog} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FilteredBlogs;
