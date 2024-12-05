import React from 'react'
import UserProfileBlogCard from './UserProfileBlogCard';
import { Link } from 'react-router-dom';

const UserProfileBlogs = ({blogs}) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Link to={blog._id}><UserProfileBlogCard blog={blog} /></Link>
      ))}
    </div>
  );
}

export default UserProfileBlogs