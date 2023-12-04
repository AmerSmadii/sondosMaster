import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Minus, Plus, Share } from "../../assets/icons/IconsSVGConst";
import { FoundItBtn } from "../uiPrimitives/FoundItBtn";
import { NotSignedIn } from "../uiPrimitives/NotSignedIn";
import { MineBtn } from "../uiPrimitives/MineBtn";
import { useModal } from "../../hooks/useContext/ModalContext";
import { MainCardFound } from "../MainCardFound";

// import SwiperCore, { Autoplay } from 'swiper/core';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import Modal from "react-modal";
import { UseUser } from "../../hooks/useContext/UserContext";
import { MainCardLost } from "../MainCardLost";
Modal.setAppElement(document.getElementById("root"));

// Import Swiper modules
// SwiperCore.use([Autoplay]);

export const AutoplaySwiper = ({ image, publishday, city, title }) => {
  const { modalIsOpen, openModal } = useModal();

  const { user, logout } = UseUser();

  const [dataFromFirstAPI, setDataFromFirstAPI] = useState([]);
  const [dataFromSecondAPI, setDataFromSecondAPI] = useState([]);
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  //////////////////////////////MODAL/////////////////////////////////

  const [cardDataFound, setCardDataFound] = useState(false);
  const [cardDataLost, setCardDataLost] = useState(false);
  const [modalData, setModalData] = useState(null);

  const openModalLost = (category) => {
    // setModalData();
    setCardDataLost(category);
  };
  // const openModalFound = () => {
  //   setCardDataFound(true);
  // };
  const openModalFound = (title) => {
    setModalData(combinedData.find((item) => item.data.title === title)?.data);
    setCardDataFound(true);
  };
  
  const openModalNotSignedUp = () => {
    setIsUserSignedIn(true);
  };

  const closeModal = () => {
    setCardDataLost(false);
    setCardDataFound(false);
    setIsUserSignedIn(false);
  };

  useEffect(() => {
    // GET data from LOSTS
    axios
      .get("http://localhost:3000/lost")
      .then((response) => {
        setDataFromFirstAPI(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from the first API:", error);
      });

    // GET data from FOUNDS
    axios
      .get("http://localhost:3000/found")
      .then((response) => {
        setDataFromSecondAPI(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from the second API:", error);
      });
  }, []);

  const combinedData = [];

  for (
    let i = 0;
    i < Math.max(dataFromFirstAPI.length, dataFromSecondAPI.length);
    i++
  ) {
    if (dataFromFirstAPI[i]) {
      combinedData.push({ type: "losts", data: dataFromFirstAPI[i] });
    }

    if (dataFromSecondAPI[i]) {
      combinedData.push({ type: "found", data: dataFromSecondAPI[i] });
    }
  }
  console.log(combinedData);

  const swiperParams = {
    autoplay: {
      delay: 3000, // Set the autoplay delay in milliseconds
    },
    breakpoints: {
      550: {
        slidesPerView: 2,
      },
      825: {
        slidesPerView: 3,
      },
      1120: {
        slidesPerView: 5,
      },
      1600: {
        slidesPerView: 10,
      },
    },
    slidesOffsetBefore: 10,
    slidesOffsetAfter: 10,
    spaceBetween: 0,
    freeMode: true,
    navigation: false,
    loop: true,
    effect: "fade",
  };

  return (
    <div className="max-w-screen-2xl m-0 overflow-hidden relative">
      <Swiper {...swiperParams}>
        {combinedData.map((item, user_id) => (
          <SwiperSlide key={item.user_id}>
            {item.type === "losts" ? (
              <div className="flex flex-col">
                <span className="flex flex-row inline-block gap-x-2 px-[0.75rem] pb-2 text-[#E83434] bg-none focus:outline-none text-[0.7rem] font-semibold rounded-[0.65rem] text-xs px-5 py-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  <Minus /> I’VE LOST
                </span>
                <div className="p-8 pb-8 gap-4 grid grid-col-1 grid-flow-row  bg-[#373737] rounded-[1.25rem] w-[18rem] h-[25rem] ">
                  <div className="flex flex-row gap-6 ">
                    <img
                      src=""
                      alt="userpic"
                      className="bg-[#ffffff75] row-span-2 w-10 h-10 rounded-full"
                    />
                    <div className="flex flex-col">
                      <span
                        key={item.user_id}
                        className="text-[#CDCDCD] font-light text-[0.9rem]"
                      >
                        Caroline
                      </span>
                      <span
                        key={item.user_id}
                        className="text-[#CDCDCD85] font-light text-[0.75rem]"
                      >
                        {item.data.title}
                      </span>
                    </div>
                  </div>
                  <div className="border border-1-solid rounded-[1.25rem] h-[14rem]">
                    <img
                      src={`${item.data.imageurl}`}
                      alt={`Image for ${item.data.description}`}
                      className="object-cover w-full h-full rounded-[1.25rem]"
                    />
                  </div>
                  <div className="flex flex-row gap-[4.75rem] items-center">
                    <button
                      onClick={user ? openModalLost : openModalNotSignedUp}
                    >
                      {" "}
                      <FoundItBtn />
                    </button>

                    <Share />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col">
                <span className="flex flex-row inline-block gap-x-2 px-[0.75rem] pb-2 text-[#FBE62E] bg-none text-[0.7rem] font-semibold rounded-[0.65rem] text-xs px-5 py-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  <Plus /> I’VE FOUND
                </span>
                <div className="p-8 pb-8 gap-4 grid grid-col-1 grid-flow-row  bg-[#373737] rounded-[1.25rem] w-[18rem] h-[25rem] ">
                  <div className="flex flex-row gap-6 ">
                    <img
                      src=""
                      alt="userpic"
                      className="bg-[#CDCDCD] row-span-2 w-10 h-10 rounded-full"
                    />
                    <div className="flex flex-col">
                      <span
                        key={item.user_id}
                        className="text-[#CDCDCD] font-light text-[0.9rem]"
                      >
                        Caroline
                      </span>
                      <span
                        key={item.user_id}
                        className="text-[#CDCDCD85] font-light text-[0.75rem]"
                      >
                        {item.data.title}
                      </span>
                    </div>
                  </div>
                  <div className="border border-1-solid rounded-[1.25rem] h-[14rem]">
                    <img
                      src={`${item.data.imageurl}`}
                      alt={`Image for ${item.data.description}`}
                      className="object-cover w-full h-full rounded-[1.25rem]"
                    />
                  </div>
                  <div className="flex flex-row gap-[4.75rem] items-center">
                    <button
                      onClick={user ? openModalFound : openModalNotSignedUp}
                    >
                      <MineBtn />
                    </button>
                    {console.log("Data for Modal:", item.data)}
                    {console.log("Data for Modal:", modalData)}

                    <MainCardFound
                      modalData={modalData}
                      
                      data={item.data}
                      isOpen={cardDataFound}
                      onRequestClose={closeModal}
                    />
                    <NotSignedIn
                      isOpen={isUserSignedIn}
                      onRequestClose={closeModal}
                    />
                    <Share />
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <MainCardLost isOpen={cardDataLost} onRequestClose={closeModal} />
      <NotSignedIn isOpen={isUserSignedIn} onRequestClose={closeModal} />
    </div>
  );
};
