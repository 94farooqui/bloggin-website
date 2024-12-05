import React from 'react'
import BlogUpdate from '../components/BlogUpdate'
import { useParams } from 'react-router-dom'

const EditBlog = () => {
    const {blogId} = useParams()
  return (
    <div className="w-[1200px] mx-auto py-4">
      
      <BlogUpdate blogId={blogId}/>
    </div>
  )
}

export default EditBlog