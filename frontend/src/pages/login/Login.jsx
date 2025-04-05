import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {

  const {loading , login} = useLogin()
  const [username , setusername] = useState("")
  const [password , setpassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username , password)
  }

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-0">
        <h1 className="text-3xl pb-2 font-semibold text-center text-gray-300">
          Login
          <span className="text-blue-500"> PingMe</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="pb-2">
            <label className="label">
              <span className="text-base label-text pb-2">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10 bg-gray-900 rounded-lg"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
          </div>

          <div  className="pb-2">
            <label className="label">
              <span className="text-base label-text pb-2">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10  bg-gray-900 rounded-lg"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <Link
            to="/signup"
            className="text-sm text-blue-400 hover:underline mt-2 inline-block"
          >
            Don't have an account?
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-2  bg-gray-900 rounded-lg" disabled = {loading}>
              {loading ? <span className="loading loading-spinner"></span> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

{
  /*
import React from 'react'

const Login = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-0'>
            <h1 className='text-3xl font-semibold text-center text-gray-300'>
                LOGIN     
                <span className='text-blue-500'>ChatApp</span>                                              
            </h1>
            <form>
            <div>
                <label className='label'>
                  <span className='text-base label-text'>Username</span>
                </label>
                <input type="text" placeholder='Enter username' className='w-full input input-bordered h-10  bg-gray-900 rounded-lg' />
              </div>

              <div>
                <label className='label'>
                  <span className='text-base label-text'>Password</span>
                </label>
                <input type="text" placeholder='Enter Password' className='w-full input input-bordered h-10  bg-gray-900 rounded-lg' />
              </div>
              <a href="#"  className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>{"Don't"} have an account ?</a>

              <div>
                <button className='btn btn-block btn-sm mt-2  bg-gray-900 rounded-lg'>Login</button>
              </div>
            </form>
        </div>

    </div>
  )
}

export default Login


*/
}
