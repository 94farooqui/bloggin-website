import React, { useEffect, useState } from "react";
import { getUserProfile } from "../services/user-api";

const Profile = () => {
  const [user,setUser] = useState()
  const [loading,setLoading] = useState()

  useEffect(()=>{
    const fetchUserDetails = async () => {
      const data = await getUserProfile()
      if(data){
        setUser(data)
      }
    }
    fetchUserDetails()
  },[])
  return (
    <div className="w-[1200px] mx-auto">
      <div className="py-8 grid grid-cols-[300px_auto] gap-4">
        <div className="border rounded-lg">Profile section</div>
        <div className="border rounded-lg">Blogs</div>
      </div>
    </div>
  );
};

export default Profile;
