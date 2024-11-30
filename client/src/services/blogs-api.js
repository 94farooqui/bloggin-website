import axios from 'axios'
export const createBlog = async (blogData) => {
  const token = localStorage.getItem("token");
    const {title,content,summary,author,createdAt,tags,likes,comments} = blogData
    console.log({
      title,
      content,
      summary,
      author,
      createdAt,
      tags,
      likes,
      comments,
    });
    try{
      console.log("Sending to backend")
        const response = await axios.post(
          "http://localhost:5000/api/blogs/posts",
          {
            title,
            content,
            summary,
            tags
            //tags: tags.split(",").map((tag) => tag.trim()),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if(response.status === 201){
          return true
        }
        else return false
    }
    catch(error){
      console.log(error)
      return false
    }
}

export const getAllBlogs = async () => {
  const response = await axios.get("http://localhost:5000/api/blogs/posts");
  if(response.status === 204 || 500){
    return {message : response.data.message } 
  }
  // else if(response.status === 500){
  //   return false
  // }
  else return response.data.posts
}

export const getFeaturedBlogs = async () => {
  //console.log("Getting featured blogs")
  const response = await axios.get("http://localhost:5000/api/blogs/posts/featured");
if(response){
  //console.log(response)
    if (response.status === 204) {
      return response.data.message;
    } else if (response.status === 500) {
      return false;
    } else return response.data;
}
};

export const getLatestBlogs = async () => {
  //console.log("Getting featured blogs");
  const response = await axios.get(
    "http://localhost:5000/api/blogs/posts/latest"
  );
  if (response) {
    //console.log(response);
    if (response.status === 204) {
      return response.data.message;
    } else if (response.status === 500) {
      return false;
    } else return response.data;
  }
};

export const fetchBlogDetails = async (blogId) => {
  const response = await axios.get(`http://localhost:5000/api/blogs/posts/${blogId}`)
  if(response){
    //console.log(response)
       if (response.status === 204) {
         return response.data.message;
       } else if (response.status === 500) {
         return false;
       } else return response.data;
  }
}

export const fetchFilteredBlogs = async (keyword) => {
  const response = await axios.get(
    `http://localhost:5000/api/blogs/posts/filter/${keyword}`
  );
  if (response) {
    //console.log(response);
    if (response.status === 204) {
      return response.data.message;
    } else if (response.status === 500) {
      return false;
    } else return response.data;
  }
};

export const addComment = async (blogId, comment) => {
  const response = await axios.post(
    `http://localhost:5000/api/blogs/posts/${blogId}/comment`, comment
  );
  if(response.status == 200){
    console.log(response)
    return response.data
  }
}
