import React, { useEffect } from 'react'
import { TbMessageStar } from "react-icons/tb";
import { PiWarningCircle } from "react-icons/pi";
export default function ShowComments({ comments, user }) {

    useEffect(() => {
        console.log("comm", comments);
    }, [])
    return (
        comments.length === 0 ? <div className=' col-start-2 col-end-12 mt-8'>

            <span className='text-gray-400 text-xl flex items-center ml-7'>
                <PiWarningCircle className='text-gray-400 text-3xl mr-1' />
                No comments have been registered yet</span>
            <svg class="animate-bounce w-6 h-6 ...">
                {/* <!-- ... --> */}
            </svg>

        </div> :
            (comments.map((comment, index) => (
                <div key={comment._id.$oid}
                    className="relative image-container col-start-2 col-end-12 mr-5 mt-10 bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-8">
                    <div className='text-white text-2xl border-l-2 w-1/3 border-purple-600 rounded-sm pl-2 '>user :{comment.username}</div>
                    <span className='flex absolute  right-3 bottom-3'>
                        <TbMessageStar className='text-xl flex mr-2 text-gray-100' />
                        {comment.rate}</span>
                    <div className='text-white text-sm'>{comment.comment}</div>
                </div >
            ))
            )
        // <div className='text-white text-7xl col-start-2 col-end-12'>akslflkafkslj</div>
    )
}
