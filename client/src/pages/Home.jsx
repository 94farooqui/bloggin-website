import React from 'react'
import Banner from '../components/Banner'
import FeaturedBlogs from '../components/FeaturedBlogs'
import LatestBlogs from '../components/LatestBlogs';

const Home = () => {
  return (
    <div className="w-screen mx-auto">
      <Banner />
      <div className="w-[1200px] mx-auto py-8 grid grid-cols-[auto_400px] ">
        <LatestBlogs/>
        <FeaturedBlogs />
      </div>
    </div>
  );
}

export default Home