import React, { useState , useRef } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
        <h2 className="text-xl font-medium text-center mb-8 text-purple-400">
          Login to Your Account
        </h2>

        {/* Login Form */}
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
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 text-sm bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>

        {/* Redirect to Signup */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?
          </p>
          <a
            href="/register" // Navigate to /register
            className="mt-2 text-sm font-medium text-purple-400 hover:underline"
          >
            Sign Up Here
          </a>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="flex items-center justify-center min-h-screen bg-gray-100">
  //     <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
  //       <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
  //       <form method="post" action="" className="mt-6">
  //         <div className="mb-4">
  //           <label htmlFor="username" className="block text-sm font-medium text-gray-700">
  //             Username
  //           </label>
  //           <input
  //             type="text"
  //             id="username"
  //             value={username}
  //             onChange={(e) => setUsername(e.target.value)}
  //             required
  //             className="w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  //             placeholder="Enter your username"
  //           />
  //         </div>
  //         <div className="mb-6">
  //           <label htmlFor="password" className="block text-sm font-medium text-gray-700">
  //             Password
  //           </label>
  //           <input
  //             type="password"
  //             id="password"
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //             required
  //             className="w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  //             placeholder="Enter your password"
  //           />
  //         </div>
  //         <button
  //           type="submit"
  //           className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  //         >
  //           Login
  //         </button>
  //       </form>
  //       <p className="mt-4 text-sm text-center text-gray-600">
  //         Don't have an account?{" "}
  //         <a href="/register" className="text-blue-600 hover:underline">
  //           Sign Up
  //         </a>
  //       </p>
  //     </div>
  //   </div>
  // );
};

export default Login;
