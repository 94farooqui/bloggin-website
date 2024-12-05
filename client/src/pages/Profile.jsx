import React, { useEffect, useState } from "react";
import { getUserProfile } from "../services/user-api";
import UserProfileSection from "../components/UserProfileSection";
import UserProfileBlogs from "../components/UserProfileBlogs";

const Profile = () => {
  const [user,setUser] = useState()
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    const fetchUserDetails = async () => {
      const data = await getUserProfile()
      if(data){
        //console.log("data",data)
        setLoading(false)
        setUser(data)
      }
    }
    fetchUserDetails()
  },[])

  if(loading){
    return <p>Loading...</p>
  }
  return (
    <div className="w-[1200px] mx-auto">
      <div className="flex flex-col gap-8 py-8">
        <UserProfileSection userData={{ ...user, blogs:undefined}}/>
        <UserProfileBlogs blogs={user.blogs}/>
      </div>
    </div>
  );
};

export default Profile;
