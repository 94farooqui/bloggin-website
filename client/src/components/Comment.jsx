import React from 'react'

const Comment = ({comment}) => {
    //console.log(comment)
  return (
    <div className='border-b py-4'>
        <div className='flex items-center gap-4'>
            <div className='w-12 h-12 rounded-full bg-slate-400 flex items-center justify-center'>
            <p className='text-xl font-semibold'>{comment.user.fullname[0].toUpperCase()}</p>
            </div>
            <div className='flex flex-col gap-2'>
            <p className='text-sm font-bold text-slate-600'>{comment.user.fullname}</p>
            <p>{comment.message}</p>
            </div>
        </div>
    </div>
  )
}

export default Comment