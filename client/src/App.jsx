import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateBlog from './pages/CreateBlog';
import BlogDetails from './pages/BlogDetails';
import ProtectedRoute from './components/ProtectedRoute';
import RootLayout from './components/RootLayout';
import About from './pages/About';
import FilteredBlogs from './pages/FilteredBlogs';
import Profile from './pages/Profile';

const App = () => {
  return (
    <div className="app font-Poppins">
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/blogs/tags/:filter" element={<FilteredBlogs />} />

          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateBlog />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
