import React, { useState , useRef } from "react";

export default function Register (props)  {

  // const [csrfToken, setCsrfToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    formRef.current.submit(); // Programmatically submit the form
  };

  return(
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 flex items-center justify-center p-6">
    <div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-8">
      {/* Page Heading */}
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-100 font-serif">
        Art Marketplace
      </h1>

      {/* Signup Form */}
      <form ref={formRef} method="post" action="register" onSubmit={handleSubmit}>
        {/* Username Field */}
        <div className="mb-6">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-400"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 text-sm bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Enter your username"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-400"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 text-sm bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Role Selection */}
        <div className="mb-6">
          <label
            htmlFor="role"
            className="block mb-2 text-sm font-medium text-gray-400"
          >
            Role
          </label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 text-sm bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            required
          >
            <option value="" disabled>
              Select your role
            </option>
            <option value="Seller">Seller</option>
            <option value="User">Normal User</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Sign Up
        </button>
      </form>

      <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?
          </p>
          <a
            href="/" // Navigate to /register
            className="mt-2 text-sm font-medium text-purple-400 hover:underline"
          >
            Login Here
          </a>
        </div>
    </div>
  </div>
  );

  // return (
  //   <div className="flex items-center justify-center min-h-screen bg-gray-100">
  //     <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
  //       <h2 className="mb-6 text-2xl font-bold text-center text-gray-700">Signup</h2>
  //       <form ref={formRef} method="post" action="register">
  //         <div className="mb-4">
  //           <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-600">
  //             Username
  //           </label>
  //           <input
  //             type="text"
  //             name="username"
  //             id="username"
  //             value={username}
  //             onChange={(e) => setUsername(e.target.value)}
  //             className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //             placeholder="Enter your username"
  //             required
  //           />
  //         </div>
  //         <div className="mb-6">
  //           <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">
  //             Password
  //           </label>
  //           <input
  //             type="password"
  //             name="password"
  //             id="password"
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //             className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //             placeholder="Enter your password"
  //             required
  //           />
  //         </div>
  //         <button
  //           type="submit"
  //           onClick={handleSubmit}
  //           className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  //         >
  //           Sign Up
  //         </button>
  //       </form>
  //     </div>
  //   </div>
  // );
};