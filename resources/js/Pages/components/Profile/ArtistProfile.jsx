import React, { useContext, useState, useEffect } from "react";
import Navbar from "../Share/NavBar";
import { useSession } from "../../../hooks/useSession";
import { Link, usePage } from "@inertiajs/react";
import { useNavigate } from "react-router-dom";

export default function ArtistProfile({ user }) {

  useEffect(() => {
    console.log(user);
  }, [])

  const divStyles = "w-full h-9 px-1 py-2 text-sm bg-gray-800 border-left border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
  const styles = {
    div: {
      transition: " transform transition-colors duration-500 ",
      grid: " w-full h-9 px-2 py-2 rounded-md ",
      color: " text-sm bg-gray-800 border-l-2 border-gray-700 hover:border-purple-600 text-gray-300 "
    },
    buttun: {
      normal: {
        grid: " w-full btn h-9 px-2 py-2 my-4 rounded-md  ",
        color: " text-sm font-medium text-white bg-purple-700 "
      },
      submitting: {
        grid: " w-full btn h-9 px-2 py-2 my-4 rounded-md  ",
        color: " text-sm font-medium text-white bg-purple-400 cursor-not-allowed "

      }
    }
  }

  return (
    <div>
      <Navbar username={user.username} role={user.role} />
      <div className="container min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 flex items-center justify-center">
        <div className="grid grid-cols-12">
          {/* Information Box */}
          <div className="col-start-2 col-end-8 container bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-8 mt-10">
            {/* Page Heading */}
            <div className="grid grid-cols-6 gap-4">
              {/* <div className='col-span-2'> */}
              <div className="col-span-5">
                <p className="text-4xl font-bold text-left text-gray-100 ">
                  Information of account
                </p>
                <h2 className="text-xl font-medium text-left mb-12 text-purple-400">
                  Account of User
                </h2>
              </div>

              <div className="col-span-3 ">
                <label
                  className="block mb-2 text-sm font-medium text-gray-400"
                >
                  FirstName
                </label>
                <div className={JSON.stringify(styles.div)}>
                  {user.first_name}
                </div>
              </div>

              {/* Account Info Display */}
              <div className="col-start-4 col-end-7">
                <label
                  className="block mb-2 text-sm font-medium text-gray-400"
                >
                  LastName
                </label>
                <div className={JSON.stringify(styles.div)}>
                  {user.last_name}
                </div>
              </div>
              <div className="col-span-full ">
                <label
                  className="block mb-2 text-sm font-medium text-gray-400"
                >
                  Address
                </label>
                <div className={JSON.stringify(styles.div)}>
                  {user.address}
                </div>
              </div>
              <div className="col-span-full ">
                <label
                  className="block mb-2 text-sm font-medium text-gray-400"
                >
                  Email
                </label>
                <div className={JSON.stringify(styles.div)}>
                  {user.email}
                </div>
              </div>
              <div className="col-span-3 ">
                <label
                  className="block mb-2 text-sm font-medium text-gray-400"
                >
                  Username
                </label>
                <div className={JSON.stringify(styles.div)}>
                  {user.username}
                </div>
              </div>

              <div className="col-span-3">
                <label
                  className="block mb-2 text-sm font-medium text-gray-400"
                >
                  Wallet Ballance
                </label>
                <div className={JSON.stringify(styles.div)}>
                  {user.wallet_balance}
                </div>
              </div>
            </div>
          </div>
          {/* Pay */}
          <div className="col-span-3 container mx-5 mt-10 bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-8">
            {/* Page Heading */}
            <p className="text-xl text-left font-bold mb-1 text-gray-100 ">
              Profile image
            </p>
            <img
              className="hover:opacity-30 rounded-lg my-2"
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              alt="avatar"
            />

            {/* Edit Profile Button */}
            <Link href={'/' + user.username + '/profile/update'}
              className={JSON.stringify(styles.buttun.normal)}>
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
