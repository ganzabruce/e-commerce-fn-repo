import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminContext } from "../../hooks/useAdminAuth";
import { useUserContext } from "../../hooks/useUserContext";
import AuthModal from "../auth/LoginModal";
import NavInput from "./navInput";

const Nav = () => {
  const [showAuth, setShowAuth] = useState(false);
  const { admin,dispatch:adminDispatch } = useAdminContext();
  const { user,dispatch:userDispatch } = useUserContext();


  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("admin")
    localStorage.removeItem("user")
    userDispatch({ type: "logout" });  
    adminDispatch({type: "logout"})
    alert("logged out")
    navigate("/")
  } 

  return (
    <div className="">
      {/* Top Info Bar */}
      {!admin && <div className="bg-amber-300 info flex justify-around">
        <div className="langs">
          <ul className="flex ">
            <li className="py-2 px-4 border-1 border-y-0 border-gray-100">
              english <i className="fa-solid fa-arrow-down"></i>
            </li>
            <li className="py-2 px-4 border-1 border-y-0 border-gray-100">
              us dollar <i className="fa-solid fa-arrow-down"></i>
            </li>
          </ul>
        </div>
        <div className="contacts">
          <ul className="flex ">
            <li className="py-2 px-4 border-1 border-y-0 border-gray-100">
              welcome to our store
            </li>
            <li className="py-2 px-4 border-1 border-y-0 border-gray-100">blog</li>
            <li className="py-2 px-4 border-1 border-y-0 border-gray-100">faq</li>
            <li className="py-2 px-4 border-1 border-y-0 border-gray-100">
              contact us
            </li>
          </ul>
        </div>
      </div>}

      {/* Main Nav */}
      <div className="regular flex justify-around py-5 border-b-1 border-gray-200">
        <div className="logo">
          <Link to="/">
          <img
            src="https://kapee.presslayouts.com/wp-content/themes/kapee/assets/images/logo.png"
            alt=""
            className="w-30 h-auto"
          />
          </Link>
        </div>

        {/* Search */}
        {!admin && <NavInput /> }

        {/* Cart / Login */}
        <div className="cart flex gap-3 ">
          {/* Sign In Button */}
          {!admin && !user ? <div
            className="login flex items-center cursor-pointer"
            onClick={() => {
              setShowAuth(true);
            }}
          >
            <i className="fa-solid fa-user text-3xl"></i>
            <div className="chars ml-2">
              <h1 className="text-sm text-gray-800">hello</h1>
              <h1 className="text-xl">sign in</h1>
            </div>
          </div>: <button onClick={handleLogout} className="px-4 bg-amber-300 font-bold cursor-pointer">logout</button>}

          {!admin &&<div className="likes flex items-center">
            <i className="fa-regular fa-heart relative text-3xl ">
              <div className="num absolute top-0 -right-3 bg-amber-300 py-0.5 px-1 rounded-full text-xs">
                0
              </div>
            </i>
          </div>}
          {!admin && <div className="cartItems flex items-center mx-2">
            <i className="fa-solid fa-bag-shopping text-3xl relative">
              <div className="num text-xs absolute top-0 -right-3 bg-amber-300 py-0.5 px-1 rounded-full">
                0
              </div>
            </i>
          </div>}
        </div>
      </div>

      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 flex items-center justify-center z-30  bg-gray-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg relative">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setShowAuth(false)}
            >
              ✖
            </button>
            <AuthModal />
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
