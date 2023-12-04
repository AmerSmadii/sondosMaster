import {
  Backtotop,
  BurgurList,
  Cancel,
  Minus,
  UserProfile,
  UserProfileFooter,
} from "../assets/icons/IconsSVGConst";
import { Link } from "react-router-dom";
import { Plus } from "../assets/icons/IconsSVGConst";
import React, { useState, useEffect } from "react";
import { PublishLost } from "./PublishLost";
import { NotSignedIn } from "../components/uiPrimitives/NotSignedIn";

import { useModal } from "../../src/hooks/useContext/ModalContext";
import Modal from "react-modal";
import { PublishFound } from "./PublishFound";
import { UseUser } from "../hooks/useContext/UserContext";
Modal.setAppElement(document.getElementById("root"));

export const FixedFooter = (isOpen, onRequestClose) => {
  const { user } = UseUser();
  const { modalIsOpen, openModal } = useModal();

  const [isVisible, setIsVisible] = useState(false);

  const [foundModalIsOpen, setFoundModalIsOpen] = useState(false);
  const [lostModalIsOpen, setLostModalIsOpen] = useState(false);
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  const openFoundModal = () => {
    setFoundModalIsOpen(true);
  };

  const openLostModal = () => {
    setLostModalIsOpen(true);
  };
  const openModalNotSignedUp = () => {
    setIsUserSignedIn(true);
  };

  const closeModal = () => {
    setFoundModalIsOpen(false);
    setLostModalIsOpen(false);
    setIsUserSignedIn(false);
  };

  // Check the scroll position and update the visibility state
  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    setIsVisible(scrollTop > 100); // Adjust the value based on when you want the button to appear

    const scrollPosition = window.scrollY;

    // Adjust the threshold value as needed (e.g., 500 pixels)
    const threshold = 50;

    setShowFooter(scrollPosition > threshold);
  };

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Attach the scroll event listener when the component mounts
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [isClicked, setIsClicked] = useState(false);

  const handleDivClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <div
        className={`${
          showFooter ? "fixed" : ""
        } bottom-8 z-[1000] left-[28rem] mt-20 flex flex-row items-center justify-center gap-8 mr-16`}
      >
        <button
          className={`w-[3rem] h-[3rem] rounded-[0.55rem] bg-[#222222] flex justify-center items-center scroll-to-top-button ${
            isVisible ? "visible" : ""
          }`}
          onClick={scrollToTop}
        >
          <Backtotop />
        </button>

        <div
          className={` w-[30rem] h-[4rem] bg-[#4E4E4E] rounded-[0.55rem] flex flex-row gap-2 p-1.5 justify-end`}
        >
          <div
            className={`relative w-[fill] bg-[#222222] rounded-[0.55rem] text-[#fff] text-start text-[0.75rem] p-3 pt-4 flex justify-between items-center gap-1`}
          >
            BELONGINGS{" "}
            <button onClick={handleDivClick}>
              {!isClicked ? <BurgurList /> : <Cancel />}
            </button>{" "}
          </div>
          {isClicked && (
            <div
              className={`${
                showFooter ? "absolute" : ""
              }  bottom-[3.6rem] left-20  h-[11.5rem] bg-[#4E4E4E] w-[30rem] rounded-t-[0.55rem] text-[#fff] text-center text-[0.75rem]`}
            >
              {/* Add your list items here */}
              <div className="flex flex-row p-4 text-start w-[29rem] bg-[#2c2c2c] rounded-[0.55rem] m-2 text-light">
                <div className="border-r border-dotted border-[#ffffff85] h-32"></div>
                <ul className="mr-12">
                  <Link to="">
                    <div className="hover:text-[#FBE62E] hover:border-l-[0.08rem] border-[#FBE62E] pl-4 p-2">
                      Wallet
                    </div>
                  </Link>
                  <Link to="">
                    <div className="hover:text-[#FBE62E] hover:border-l-[0.08rem] border-[#FBE62E] pl-4 p-2">
                      Bags
                    </div>
                  </Link>
                  <div className="hover:text-[#FBE62E] hover:border-l-[0.08rem] border-[#FBE62E] pl-4 p-2">
                    Keys
                  </div>
                  <div className="hover:text-[#FBE62E] hover:border-l-[0.08rem] border-[#FBE62E] pl-4 p-2">
                    Clothing
                  </div>
                </ul>
                <div className="border-r border-dotted border-[#ffffff85] h-32"></div>
                <ul className="mr-12">
                  {" "}
                  <Link to="">
                    <div className="hover:text-[#FBE62E] hover:border-l-[0.08rem] border-[#FBE62E] pl-4 p-2">
                      Accessories
                    </div>
                  </Link>
                  <Link to="">
                    <div className="hover:text-[#FBE62E] hover:border-l-[0.08rem] border-[#FBE62E] pl-4 p-2">
                      Jewellery
                    </div>
                  </Link>
                  <div className="hover:text-[#FBE62E] hover:border-l-[0.08rem] border-[#FBE62E] pl-4 p-2">
                    Animals
                  </div>
                  <div className="hover:text-[#FBE62E] hover:border-l-[0.08rem] border-[#FBE62E] pl-4 p-2">
                    Toys
                  </div>
                </ul>
                <div className="border-r border-dotted border-[#ffffff85] h-32"></div>
                <ul className="mr-12">
                  {" "}
                  <Link to="">
                    <div className="hover:text-[#FBE62E] hover:border-l-[0.08rem] border-[#FBE62E] pl-4 p-2">
                      Mobile phone
                    </div>
                  </Link>
                  <Link to="">
                    <div className="hover:text-[#FBE62E] hover:border-l-[0.08rem] border-[#FBE62E] pl-4 p-2">
                      Electronic
                    </div>
                  </Link>
                  <div className="hover:text-[#FBE62E] hover:border-l-[0.08rem] border-[#FBE62E] pl-4 p-2">
                    Tools
                  </div>
                  <div className="hover:text-[#FBE62E] hover:border-l-[0.08rem] border-[#FBE62E] pl-4 p-2">
                    others
                  </div>
                </ul>
              </div>
            </div>
          )}
          <div
            className={`${
              isClicked ? "hidden" : ""
            } w-[24rem] bg-[#3E3E3E] rounded-[0.55rem] pl-4 flex flex-row gap-2 p-1 justify-end	`}
          >
            <Link
              to="/"
              className="w-[5rem] h-[2.6rem] p-[0.5rem] text-center justify-center flex flex-row inline-block gap-x-2 text-[#fff] bg-none border border-1 border-[#ffffff50]  hover:text-[#FFFFFF50] text-[0.9rem] font-[0.85rem] rounded-[0.5rem] dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              HOME
            </Link>
            <button
              className="w-[7rem] h-[2.6rem] p-[0.5rem] text-center justify-center flex flex-row inline-block gap-x-2 text-[#FBE62E] bg-none border border-1 border-[#ffffff50]  hover:text-[#FFFFFF] text-[0.8rem] font-[1.5rem] rounded-[0.5rem] dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              onClick={user ? openFoundModal : openModalNotSignedUp}
            >
              <Plus /> I’VE FOUND
            </button>

            <button
              className="w-[7rem] h-[2.6rem] p-[0.5rem] text-center justify-center flex flex-row inline-block gap-x-2 text-[#E83434] bg-none border border-1 border-[#ffffff50]  hover:text-[#FFFFFF] text-[0.8rem] font-[1.5rem] rounded-[0.5rem] dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              onClick={openLostModal}
            >
              <Minus /> I’VE LOST
            </button>
            {user ? (
              <PublishLost
                isOpen={lostModalIsOpen}
                onRequestClose={closeModal}
              />
            ) : (
              <NotSignedIn
                isOpen={lostModalIsOpen}
                onRequestClose={closeModal}
              />
            )}
          </div>
        </div>
        {user && (
          <Link to="/profilepage">
            <div className="w-[3rem] h-[3rem] rounded-[0.55rem] bg-[#222222] flex justify-center items-center">
              <UserProfileFooter />
            </div>
          </Link>
        )}
        <PublishFound isOpen={foundModalIsOpen} onRequestClose={closeModal} />

        <NotSignedIn isOpen={isUserSignedIn} onRequestClose={closeModal} />
      </div>
    </>
  );
};
