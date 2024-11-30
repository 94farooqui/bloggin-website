import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { getUserDetails } from "../services/user-api";

const CommentForm = ({handleCommentSubmit,newComment,setNewComment}) => {

    const {user} = useContext(AuthContext)
    //console.log(newComment)

    useEffect(()=>{
        const fetchUserDetails = async () => {
            const data = await getUserDetails()
            if(data){
                
            }
        }
        console.log(user)
    },[])
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Hello")
        setNewComment("")
        handleCommentSubmit()
       
    }

  return <div className="w-full bg-white rounded-lg p-4 border">
    <form onSubmit={handleSubmit}>
        <input value={newComment} onChange={(e)=>setNewComment(e.target.value)} name="comment" placeholder="write here... and pres Enter" className=" w-full focus:outline-none" />
    </form>
  </div>;
};

export default CommentForm;
