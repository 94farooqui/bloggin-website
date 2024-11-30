import axios from "axios";

export const getUserProfile = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get("http://localhost:5000/api/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 204 || 500) {
    return { message: response.data.message };
  }
  // else if(response.status === 500){
  //   return false
  // }
  else return response.data.posts;
};
