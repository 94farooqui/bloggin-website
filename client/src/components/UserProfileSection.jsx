import React, { useEffect } from 'react'

const UserProfileSection = ({ userData }) => {
  useEffect(()=>{
    console.log(userData);
  },[])
  return (
    <div className="w-full rounded-lg bg-zinc-900 text-zinc-100 text-sm flex gap-8 items-center p-8">
      <div className="w-[160px]">
        <div className="w-[160px] h-[160px] bg-zinc-100 rounded-full" />
      </div>
      <div className="p-4 flex-1 ">
        <table className="w-full table-fixed text-left  border-separate text-sm">
          <tr>
            <th className="w-40">Name</th>
            <td>{userData.fullname}</td>
          </tr>
          <tr>
            <th className="w-40">Email</th>
            <td>{userData.email}</td>
          </tr>
          <tr className="">
            <th className="w-40align-top">Interests</th>
            <td className="flex gap-2 flex-wrap ">
              <span className="bg-zinc-400 text-xs rounded-md p-1">
                Artificial Intelligence
              </span>
              <span className="bg-zinc-400 text-xs rounded-md p-1">
                Web Development
              </span>
              <span className="bg-zinc-400 text-xs rounded-md p-1">
                Front End
              </span>
              <span className="bg-zinc-400 text-xs rounded-md p-1">
                Mobile Development
              </span>
              <span className="bg-zinc-400 text-xs rounded-md p-1">UI/UX</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default UserProfileSection