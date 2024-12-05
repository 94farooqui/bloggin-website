import axios from "axios";

export const getUserProfile = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get("http://localhost:5000/api/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if(response.status == 200){
    console.log(response.data)
    return response.data
  }
  else {
if (response.status === 401) {
  localStorage.removeItem("token");
}
if (response.status === 204 || response.status === 500) {
  console.log(response.data);
  return { message: response.data.message };
}
  }
  // else if(response.status === 500){
  //   return false
  // }
 
};

export const getUserDetails = async () => {
  try{
    const token = localStorage.getItem("token");

    const response = await axios.get(`http://localhost:5000/api/user/${token}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 401) {
      console.log("unauthorized")
      localStorage.removeItem("token")
    }
    if (response.status === (204 || 500)) {
      return { message: response.data.message };
    }
    // else if(response.status === 500){
    //   return false
    // }
    else return response.data.posts;
  }
  catch(error){
    if (error.status === 401) {
        console.log("unauthorized")
        localStorage.removeItem("token")
      }
  }
};

export const getUserBlogs = async () => {
  const token = localStorage.getItem("token");
}