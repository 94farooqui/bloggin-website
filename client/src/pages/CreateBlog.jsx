import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import BlogEditor from '../components/BlogEditor';

const CreateBlog = () => {
  

  return (
    <div className="w-[1200px] mx-auto py-4">
      
      <BlogEditor/>
    </div>
  );
};

export default CreateBlog;
