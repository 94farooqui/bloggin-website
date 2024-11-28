export const createBlog = async (blogData) => {
    const {title, content, tags} = blogData
    try{
        await axios.post(
        'http://localhost:5000/api/blogs',
        { title, content, tags: tags.split(',').map((tag) => tag.trim()) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
    catch(error){

    }
}