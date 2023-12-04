import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LogoTwoPng from "../assets/clips/LogoTwoPng.png";
import {
  Plus,
  LinkIcon,
  Minus,
  UserProfile,
  Profile,
  ProfileWhite,
  Posts,
} from "../assets/icons/IconsSVGConst";
import { PublishLost } from "./PublishLost";
import { NotSignedIn } from "../components/uiPrimitives/NotSignedIn";

import { useModal } from "../../src/hooks/useContext/ModalContext";
import Modal from "react-modal";
import { PublishFound } from "./PublishFound";
////JWT///////
import { UseUser } from "../hooks/useContext/UserContext";
Modal.setAppElement(document.getElementById("root"));

export const Navbar = () => {
  ////JWT///////
  const { user, logout } = UseUser();
  const { modalIsOpen, openModal } = useModal();

  const [isVisible, setIsVisible] = useState(false);

  const [foundModalIsOpen, setFoundModalIsOpen] = useState(false);
  const [lostModalIsOpen, setLostModalIsOpen] = useState(false);

  const openFoundModal = () => {
    setFoundModalIsOpen(true);
  };

  const openLostModal = () => {
    setLostModalIsOpen(true);
  };

  const closeModal = () => {
    setFoundModalIsOpen(false);
    setLostModalIsOpen(false);
  };

  const [isListOpen, setListOpen] = useState(false);

  const toggleList = () => {
    setListOpen(!isListOpen);
  };

  return (
    <div className="flex flex-row justify-around">
      <ul className="flex flex-row pt-8 gap-x-4 mt-4">
        {/* Manage if signed in  */}
        <li className=" ">
          <button className="flex flex-row inline-block gap-x-2 px-[0.75rem] pb-2 text-[#18E074] bg-none border border-2 border-[#18E074]  focus:outline-none hover:bg-[#18E074] hover:text-[#FFFFFF] text-[0.7rem] font-semibold rounded-[0.65rem] text-xs px-5 py-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 w-[7rem]">
            {" "}
            <LinkIcon /> RETRIEVED
          </button>
        </li>
        <li className=" ">
          <button
            onClick={openFoundModal}
            className="flex flex-row inline-block gap-x-2 px-[0.75rem] pb-2 text-[#FBE62E] bg-none border border-2 border-[#FBE62E]  focus:outline-none hover:bg-[#FBE62E] hover:text-[#FFFFFF] text-[0.7rem] font-semibold rounded-[0.65rem] text-xs px-5 py-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            <Plus /> I’VE FOUND
          </button>
        </li>
        <li className=" ">
          <button
            onClick={openLostModal}
            className="flex flex-row inline-block gap-x-2 px-[0.75rem] pb-2 text-[#E83434] bg-none border border-2 border-[#E83434]  focus:outline-none hover:bg-[#E83434] hover:text-[#FFFFFF] text-[0.7rem] font-semibold rounded-[0.65rem] text-xs px-5 py-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            <Minus /> I’VE LOST
          </button>
        </li>
        {user ? (
          <PublishFound isOpen={foundModalIsOpen} onRequestClose={closeModal} />
        ) : (
          <NotSignedIn isOpen={foundModalIsOpen} onRequestClose={closeModal} />
        )}
        {user ? (
          <PublishLost isOpen={lostModalIsOpen} onRequestClose={closeModal} />
        ) : (
          <NotSignedIn isOpen={lostModalIsOpen} onRequestClose={closeModal} />
        )}
      </ul>
      <img
        src={LogoTwoPng}
        className="px-3 pb-2 mt-6 gap-x-4  h-[4.25rem] justify-self-start	"
      />
      <ul className="flex flex-row pt-2 mt-4">
        <li className=" mb-2 mt-6 mx-2">
          <div className="w-[7rem] px-3 pb-2 text-transparent  bg-transparent focus:outline-none   px-5 py-2 rounded-[0.65rem] text-xs font-semibold"></div>
        </li>
        {user ? (
          <>
            <li className=" mb-2 mt-6 mx-2">
              <div className="w-[7rem] px-3 pb-2 text-transparent  bg-transparent focus:outline-none   px-5 py-2 rounded-[0.65rem] text-xs font-semibold"></div>
            </li>

            <button
              onClick={toggleList}
              className={`mr-12 relative ${
                isListOpen
                  ? "border border-spacing-8 dotted border-[#18E074] rounded-full p-2"
                  : ""
              }`}
            >
              <UserProfile />
            </button>

            {isListOpen && (
              <ul className="absolute pt-6 top-24 right-36 bg-[#333333] w-[10rem] rounded-[1rem] p-4">
                <li>
                  <Link
                    to="/profilepage"
                    className="flex flex-row items-center text-[#ffffff] font-extralight "
                  >
                    <ProfileWhite />{" "}
                    <span className="hover:border-b-[0.01rem]">Profile</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/feedpage"
                    className="flex flex-row items-center  text-[#ffffff] font-extralight "
                  >
                    {" "}
                    <Posts />{" "}
                    <span className="hover:border-b-[0.01rem]">Feed Page</span>
                  </Link>
                </li>
                <li className="">
                  <Link to="">
                    {" "}
                    <button
                      onClick={logout}
                      className="whitespace-nowrap  mt-4 pb-2 text-[#E83434] bg-transparent border border-2 border-[#E83434]  focus:outline-none hover:bg-[#E83434] hover:text-[#FFFFFF] font-semibold rounded-[0.65rem] text-xs px-5 py-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 "
                    >
                      LOG OUT{" "}
                    </button>
                  </Link>
                </li>
              </ul>
            )}
          </>
        ) : (
          <>
            <li className=" mb-2 mt-6 mx-2">
              <Link
                to="/signin"
                className=" px-3 pb-2 text-[#000000] bg-transparent focus:outline-none  hover:border hover:border-2 hover:border-[#E83434]  hover:text-[#E83434]  px-5 py-2 rounded-[0.65rem] text-xs font-semibold"
              >
                SIGN IN
              </Link>
            </li>
            <li className=" mb-2 mt-6">
              <Link
                to="/signup"
                className=" px-3 pb-2 text-[#E83434] bg-transparent border border-2 border-[#E83434]  focus:outline-none hover:bg-[#E83434] hover:text-[#FFFFFF] text-xs font-semibold rounded-[0.65rem] text-xs px-5 py-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                SIGN UP
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
