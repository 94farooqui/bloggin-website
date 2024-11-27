import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

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
    <div className="create-blog">
      <h2>Create a Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter blog title"
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="Write your blog content here"
          />
        </div>
        <div>
          <label htmlFor="tags">Tags (comma-separated)</label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g., tech, programming, react"
          />
        </div>
        <button type="submit">Submit Blog</button>
      </form>
    </div>
  );
};

export default CreateBlog;
