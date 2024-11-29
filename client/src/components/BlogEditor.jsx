import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ReactQuill, { Quill,editor } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import katex from "katex";
import "katex/dist/katex.min.css";
import Editor from './Editor';
import { createBlog } from '../services/blogs-api';

const initalBlog = {
  title: "",
  content: "",
  summary: "",
  author: null,
  createdAt: new Date().now,
  tags: [],
  likes: [],
  comments: [],
};

const BlogEditor = () => {
  const navigate = useNavigate()
  const [blogData,setBlogData] = useState(initalBlog)

  const handleChange = (e) => {
    setBlogData({...blogData, [e.target.name]:e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to be logged in to create a blog!');
      navigate('/login');
      return;
    }

    try {
      // 
      //console.log("Content", blogData);
      const result = await createBlog(blogData)
      if(result === true){
        alert('Blog created successfully!');
        navigate('/');
      }
 
    } catch (err) {
      console.error(err.response?.data?.error || 'Something went wrong');
      alert("Failed to create blog!");
    }
  };

  return (
    <div>
      <div className="flex w-full justify-between items-center">
        <h2 className="text-2xl font-semibold text-slate-600 mb-4">
          Create a Blog
        </h2>
        <button
          onClick={handleSubmit}
          className="bg-slate-900 px-4 py-2 self-start text-slate-100 rounded-md"
        >
          Publish
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full  flex flex-col gap-2 text-slate-700"
      >
        <div>
          <input
            id="title"
            type="text"
            value={blogData.title}
            name="title"
            onChange={(e) => handleChange(e)}
            required
            placeholder="Enter blog title"
            className="w-full text-xl p-2 border rounded-lg"
          />
        </div>
        {/* description_summary */}
        <Editor blogData={blogData} setBlogData={setBlogData} />
        <div className="flex flex-col gap-1 mt-4">
          <label htmlFor="tags">Summary</label>
          <textarea
            rows={2}
            id="summary"
            required
            name="summary"
            value={blogData.summary}
            onChange={(e) => handleChange(e)}
            placeholder="short summary about the blog"
            className="w-full text-lg p-2 border rounded-lg resize-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="tags">Tags</label>
          <input
            id="tags"
            type="text"
            name="tags"
            required
            value={blogData.tags}
            onChange={(e) => handleChange(e)}
            placeholder="e.g., tech, programming, react"
            className="w-full text-lg p-2 border rounded-lg"
          />
        </div>
        <div dangerouslySetInnerHTML={{ __html: blogData.content }} />
      </form>
    </div>
  );
}

export default BlogEditor