import React from 'react'

export default function ArtistPage() {
    
  return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-8">
                {/* Page Heading */}
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-100 font-serif">
                    Art Marketplace
                </h1>
                <h2 className="text-xl font-medium text-center mb-8 text-purple-400">
                    Account Information
                </h2>
    
                {/* Account Info Display */}
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-400">
                        Username
                    </label>
                    <p className="block mb-2 text-sm text-gray-200">
                        username
                    </p>
                </div>
    
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-400">
                        Email
                    </label>
                    <p className="block mb-2 text-sm text-gray-200">
                        email
                    </p>
                </div>
    
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-400">
                        Full Name
                    </label>
                    <p className="block mb-2 text-sm text-gray-200">
                        fullName
                    </p>
                </div>
    
                {/* Edit Profile Button */}
                <button
                    // onClick={() => navigate('/edit-profile')}
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-700 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-md"
                >
                    Edit Profile
                </button>
    
                {/* Logout Button */}
                <button
                    // onClick={handleLogout}
                    className="w-full mt-4 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-md"
                >
                    Logout
                </button>
    
                {/* Redirect to Home */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-400">
                        Want to go back to the home page?
                    </p>
                    <p
                        // onClick={() => navigate('/home')}
                        className="mt-2 text-sm font-medium text-purple-400 hover:underline cursor-pointer"
                    >
                        Go to Home
                    </p>
                </div>
            </div>
        </div>
    )
}
