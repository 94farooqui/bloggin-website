import React from 'react'
import UserProfileBlogCard from './UserProfileBlogCard';

const UserProfileBlogs = ({blogs}) => {
  return (
    <div>
      {blogs.map((blog) => (
        <UserProfileBlogCard blog={blog} />
      ))}
    </div>
  );
}

export default UserProfileBlogs