import React, { useEffect } from 'react'

export default function InactiveUsers({ users }) {

  return (
    <div className="grid grid-cols-12 gap-6">
      {users.map((user) => (
        <div
          key={user.username}
          className="col-span-full bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:mx-2 transition-all duration-300"
        >
          {/* <img
                src={
                    "https://img.cdn-pictorem.com/uploads/collection/D/DN4DFF8JRC/900_Nature-Art_10.jpg"
                }
                alt={art.name}
                className="w-full h-48 object-cover"
            /> */}
          <div className="p-6">
            <p className="font-semibold text-2xl">{user.username}</p>
            {/* <p className="text-purple-400 ">
              username : {user.username}
            </p> */}
            {/* <p className="text-sm text-gray-500 my-2">
                    Quantity : {art.number}
                </p>
                <p className="text-xs text-gray-600 my-2">
                    {art.reviews.length} reviews
                </p>
                <p className="text-sm text-gray-400 my-2">
                    Price : ${art.price}
                </p> */}
            {/* <label
                    className="btn bg-purple-700 text-white rounded-md"
                    htmlFor={art.name}
                    onClick={() => {
                        navigate('/home/arts/' + art._id.$oid);
                    }}
                >
                    View Details
                </label> */}
          </div>
        </div>
      ))}
      {/* {selectArt && <ArtworkDrawer selectArt={selectArt} />} */}
    </div>)
}
