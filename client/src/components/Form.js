import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const Form = ({ handleForm, isSignUp }) => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [passwordShown, setPasswordShown] = useState(false);
  const submitForm = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    handleForm(username, password);
  };
  return (
    <div className="font-sans">
      <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
        <div className="relative sm:max-w-sm w-full">
          <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6" />
          <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6" />
          <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
            <label className="block mt-3 text-xl text-gray-700 text-center font-semibold">
              Welcome
            </label>
            <form onSubmit={submitForm} className="mt-10">
              <div>
                <input
                  ref={usernameRef}
                  type="text"
                  required
                  pattern="[A-Za-z0-9]+"
                  title="letters and numbers only, no  punctuation or special characters"
                  placeholder="username"
                  className="mt-1 block w-full  border bg-gray-100 h-11 rounded-xl shadow-lg  hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 p-3"
                />
              </div>
              <div className="mt-7 relative">
                <input
                  ref={passwordRef}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Passowrd Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                  type={passwordShown ? "text" : "password"}
                  placeholder="********"
                  required
                  className="mt-1 block w-full  border bg-gray-100 h-11 rounded-xl shadow-lg  hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 p-3"
                />
                <div
                  onClick={() => setPasswordShown(!passwordShown)}
                  className="absolute top-1/3 right-4 cursor-pointer  transform transition duration-500 hover:scale-125"
                >
                  {passwordShown ? (
                    <AiOutlineEye size={16} />
                  ) : (
                    <AiOutlineEyeInvisible size={16} />
                  )}
                </div>
              </div>

              <div className="mt-14">
                <button
                  type="submit"
                  className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                >
                  {isSignUp ? "Sigin up" : "Sign in"}
                </button>
              </div>

              <div className="flex mt-7 items-center text-center">
                <hr className="border-gray-300 border-1 w-full rounded-md" />
                <label className="block font-medium text-sm text-gray-600 w-full">
                  {isSignUp ? "Already have account" : "Need an account"}
                </label>
                <hr className="border-gray-300 border-1 w-full rounded-md" />
              </div>
              <div className="my-7">
                <Link to={isSignUp ? "/" : "./signup"}>
                  <button className="bg-red-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                    {isSignUp ? "Sign in" : "Sigin up"}
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Form;
