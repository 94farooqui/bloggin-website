import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ReactQuill, { Quill,editor } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import katex from "katex";
import "katex/dist/katex.min.css";
import Editor from './Editor';

const BlogEditor = () => {

    const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const { user } = useContext(AuthContext);
  const [summary,setSummary] = useState()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    // if (!token) {
    //   alert('You need to be logged in to create a blog!');
    //   navigate('/login');
    //   return;
    // }

    try {
      // 
      console.log("Content", content);
      alert('Blog created successfully!');
      //navigate('/');
    } catch (err) {
      console.error(err.response?.data?.error || 'Something went wrong');
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter blog title"
            className="w-full text-xl p-2 border rounded-lg"
          />
        </div>
        {/* description_summary */}
        <Editor content={content} setContent={setContent} />
        {/* <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="Write here"
            className='w-full text-xl p-2 border rounded-lg resize-none' rows={6}
          /> */}
        <div className="flex flex-col gap-1 mt-4">
          <label htmlFor="tags">Summary</label>
          <textarea
          rows={2}
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="short summary about the blog"
            className="w-full text-lg p-2 border rounded-lg resize-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="tags">Tags</label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g., tech, programming, react"
            className="w-full text-lg p-2 border rounded-lg"
          />
        </div>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </form>
    </div>
  );
}

export default BlogEditor