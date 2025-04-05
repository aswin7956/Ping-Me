import React, { useState } from "react";
import GenderCheckBox from "./GenderCheckBox.jsx";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup.js";

const SignUp = () => {

  const [inputs , setinputs] = useState({
    fullname : '',
    username : '',
    password : '',
    confirmPassword : '',
    gender : '',
    })

    const{loading , signup} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(inputs)
  } 

  const handleCheckboxChange = (gender) => {
    setinputs({...inputs , gender})
  }

  
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray- bg-clip-padding backdrop-blur-xl bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          SignUp<span className="text-blue-500"> PingMe</span>
        </h1>
        <form onSubmit={handleSubmit}>  
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter fullname"
              className="w-full input input-bordered h-10  bg-gray-900 rounded-lg"
              value={inputs.fullname}
              onChange={(e) => setinputs({...inputs , fullname : e.target.value})}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10  bg-gray-900 rounded-lg"
              value={inputs.username}
              onChange={(e) => setinputs({...inputs , username : e.target.value})}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10  bg-gray-900 rounded-lg"
              value={inputs.password}
              onChange={(e) => setinputs({...inputs , password : e.target.value})}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full input input-bordered h-10  bg-gray-900 rounded-lg"
              value={inputs.confirmPassword}
              onChange={(e) => setinputs({...inputs , confirmPassword : e.target.value})}
            />
          </div>

          <GenderCheckBox onCheckboxChange ={handleCheckboxChange} selectedGender = {inputs.gender}/>

          <Link
            to="/login"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Already have an account ?
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-2  bg-gray-900 rounded-lg" disabled = {loading}>
              {loading ? <span className="loading loading-spinner"></span> : "SignUp"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;


{/* starter code

import React from "react";
import GenderCheckBox from "./GenderCheckBox";

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray- bg-clip-padding backdrop-blur-xl bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          SignUp<span className="text-blue-500"> ChatApp</span>
        </h1>
        <form>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter fullname"
              className="w-full input input-bordered h-10  bg-gray-900 rounded-lg"
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10  bg-gray-900 rounded-lg"
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="text"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10  bg-gray-900 rounded-lg"
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm password</span>
            </label>
            <input
              type="text"
              placeholder="Confirm password"
              className="w-full input input-bordered h-10  bg-gray-900 rounded-lg"
            />
          </div>

          <GenderCheckBox/>

          <a
            href="#"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Already have an account ?
          </a>

          <div>
            <button className="btn btn-block btn-sm mt-2  bg-gray-900 rounded-lg">
              SignUp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

*/}