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
  const navigate = useNavigate();

    const container = document.getElementById('editor-container')
    const quill = new Quill(container)


  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to be logged in to create a blog!');
      navigate('/login');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/blogs',
        { title, content, tags: tags.split(',').map((tag) => tag.trim()) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Blog created successfully!');
      navigate('/');
    } catch (err) {
      console.error(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-full  flex flex-col gap-2'>
        <div>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter blog title"
            className='w-full text-3xl p-2 border rounded-lg'
          />
        </div>
        <div id="editor-container">
            <Editor/>
          {/* <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="Write here"
            className='w-full text-xl p-2 border rounded-lg resize-none' rows={6}
          /> */}
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="tags">Tags</label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g., tech, programming, react"
            className='w-full text-lg p-2 border rounded-lg'
          />
        </div>
        <button type="submit" className='bg-slate-900 px-4 py-2 self-start text-slate-100 rounded-md'>Publish</button>
      </form>
  )
}

export default BlogEditor