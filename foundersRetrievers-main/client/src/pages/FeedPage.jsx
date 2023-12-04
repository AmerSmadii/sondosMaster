import React from "react";
import { Link } from "react-router-dom";
import { MainCardLost } from "../components/MainCardLost";
import { CardLost } from "../components/CardLost";
import { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FoundItBtn } from "../components/uiPrimitives/FoundItBtn";
import { NotSignedIn } from "../components/uiPrimitives/NotSignedIn";
import { MineBtn } from "../components/uiPrimitives/MineBtn";
// import { MainCardFound } from "./MainCardFound";
import { Comment } from "../components/uiPrimitives/Comment";
import { Location } from "../assets/icons/IconsSVGConst";
import {
  Calendar,
  Minus,
  Plus,
  Share,
  Cancel,
} from "../assets/icons/IconsSVGConst";

// import SwiperCore, { Autoplay } from 'swiper/core';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

// Import Swiper modules
// SwiperCore.use([Autoplay]);

import { useModal } from "../../src/hooks/useContext/ModalContext";
import Modal from "react-modal";
// import { CardFound } from "./CardFound";
import { DeliveryAlertFound } from "../components/DeliveryAlertFound";
import { ConfirmContact } from "../components/uiPrimitives/ConfirmContact";
import Payment from "../components/Payment";
import {
  FoundCard,
  LostCard,
  RetrievedCard,
} from "../components/profile/CardsProfile";

import { UseUser } from "../hooks/useContext/UserContext";
Modal.setAppElement(document.getElementById("root"));

export const FeedPage = ({ isOpen, onRequestClose }) => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  const { user } = UseUser();

  const { modalIsOpen } = useModal();
  // const [dataFromFirstAPI, setDataFromFirstAPI] = useState([]);
  // const [dataFromSecondAPI, setDataFromSecondAPI] = useState([]);
  // const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  // const [combinedData, setCombinedData] = useState([]);

  // const [confirmContactIsOpen, setConfirmContactIsOpen] = useState(false);
  // const [paymentIsOpen, setPaymentIsOpen] = useState(false);

  // const openConfirmContact = () => {
  //   setConfirmContactIsOpen(true);
  // };
  // const openPayment = () => {
  //   setPaymentIsOpen(true);
  // };
  // const openNotSignedIN = () => {
  //   setIsUserSignedIn(true);
  // };
  // const closeModal = () => {
  //   setConfirmContactIsOpen(false);
  //   setPaymentIsOpen(false);
  //   setIsUserSignedIn(false);
  // };

  // useEffect(() => {
  //   // GET data from LOSTS
  //   axios
  //     .get("http://localhost:3000/lost")
  //     .then((response) => {
  //       setDataFromFirstAPI(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data from the first API:", error);
  //     });

  //   // GET data from FOUNDS
  //   axios
  //     .get("http://localhost:3000/found")
  //     .then((response) => {
  //       setDataFromSecondAPI(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data from the second API:", error);
  //     });
  // }, []);

  // useEffect(() => {
  //   const newCombinedData = [];

  //   for (
  //     let i = 0;
  //     i < Math.max(dataFromFirstAPI.length, dataFromSecondAPI.length);
  //     i++
  //   ) {
  //     if (dataFromFirstAPI[i]) {
  //       newCombinedData.push({ type: "losts", data: dataFromFirstAPI[i] });
  //     }

  //     if (dataFromSecondAPI[i]) {
  //       newCombinedData.push({ type: "found", data: dataFromSecondAPI[i] });
  //     }
  //   }

  //   setCombinedData(newCombinedData);
  // }, [dataFromFirstAPI, dataFromSecondAPI]);

  // PAGINATION //

  // const ITEMS_PER_PAGE = 8;

  // const [currentPage, setCurrentPage] = useState(1);

  // const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  // const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  // const currentItems = combinedData.slice(indexOfFirstItem, indexOfLastItem);

  // const paginate = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  /////FILTER//////
  const [dataFromFirstAPI, setDataFromFirstAPI] = useState([]);
  const [dataFromSecondAPI, setDataFromSecondAPI] = useState([]);
  const [dataFromThirdAPI, setDataFromThirdAPI] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [isUserSignedIn, setIsUserSignedIn] = useState(true);
  // const { user } = UseUser();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // GET data from LOSTS
        const lostsResponse = await axios.get(`http://localhost:3000/lost`);
        setDataFromFirstAPI(lostsResponse.data);

        // GET data from FOUNDS
        const foundsResponse = await axios.get(`http://localhost:3000/found`);
        setDataFromSecondAPI(foundsResponse.data);
        // const retrievedResponse = await axios.get(
        //   `http://localhost:3000/retrieve`
        // );
        // setDataFromThirdAPI(retrievedResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const combined = [];

    for (
      let i = 0;
      i <
      Math.max(
        dataFromFirstAPI.length,
        dataFromSecondAPI.length,
        dataFromThirdAPI.length
      );
      i++
    ) {
      if (dataFromFirstAPI[i]) {
        combined.push({ type: "lost", data: dataFromFirstAPI[i] });
      }

      if (dataFromSecondAPI[i]) {
        combined.push({ type: "found", data: dataFromSecondAPI[i] });
      }
      if (dataFromThirdAPI[i]) {
        combined.push({ type: "retrieve", data: dataFromThirdAPI[i] });
      }
    }

    setCombinedData(combined);
  }, [dataFromFirstAPI, dataFromSecondAPI, dataFromThirdAPI]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedDay, setSelectedDay] = useState("All");

  const [showMyLosts, setShowMyLosts] = useState(false);
  const [showMyFounds, setShowMyFounds] = useState(false);
  const [showMyAllPublishes, setShowMyAllPublishes] = useState(true);
  const [showMyRetrieved, setShowMyRetrieved] = useState(false);

  const [filteredData, setFilteredData] = useState(combinedData);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    const filteredData =
      category === "All"
        ? combinedData
        : combinedData.filter((item) => item.data.category === category);

    setFilteredData(filteredData);
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);

    const filteredData =
      city === "All"
        ? combinedData
        : combinedData.filter((item) => item.data.city === city);

    setFilteredData(filteredData);
  };

  const handleDayChange = (day) => {
    setSelectedDay(day);

    const filteredData =
      day === "All"
        ? combinedData
        : combinedData.filter((item) => item.data.day === day);

    setFilteredData(filteredData);
  };
  const handleMyLostsClick = () => {
    const lostsData = combinedData.filter((item) => item.type === "lost");

    setFilteredData(lostsData);
    setShowMyLosts(true);
    setShowMyFounds(false);
    setShowMyRetrieved(false);
  };

  const handleMyFoundsClick = () => {
    const foundData = combinedData.filter((item) => item.type === "found");

    setFilteredData(foundData);
    setShowMyFounds(true);
    setShowMyLosts(false);
    setShowMyRetrieved(false);
  };
  const handleMyRetrievedClick = () => {
    const retrievedData = combinedData.filter(
      (item) => item.type === "retrieve"
    );

    setFilteredData(retrievedData);
    setShowMyFounds(false);
    setShowMyAllPublishes(false);
    setShowMyLosts(false);
    setShowMyRetrieved(true);
  };
  const handleMyAllPublishes = () => {
    setFilteredData(combinedData);
    setShowMyAllPublishes(true);
    setShowMyFounds(false);
    setShowMyLosts(false);
  };

  // Extract unique categories
  const uniqueCategories = [
    ...new Set(combinedData.map((item) => item.data.category)),
  ];

  // Extract unique cities
  const uniqueCities = [...new Set(combinedData.map((item) => item.data.city))];

  // Extract unique date
  const uniqueDay = [...new Set(combinedData.map((item) => item.data.date_lost || item.data.date_found))];

  // PAGINATION //

  const ITEMS_PER_PAGE = 6;

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center justify-items-center 	">
        <div className="mt-24 flex flex-row items-end  justify-between  w-[44rem] max-w-[44rem] ">
          <ul className="flex flex-row gap-4">
            <li>
              <select
                id="category"
                onChange={(e) => handleCategoryChange(e.target.value)}
                value={selectedCategory}
                className="bg-transparent"
              >
                <option value="All">ALL CATEGORIES</option>
                {uniqueCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </li>
            <li>
              <select
                id="city"
                onChange={(e) => handleCityChange(e.target.value)}
                value={selectedCity}
                className="bg-transparent"
              >
                <option value="All">CITY</option>
                {uniqueCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </li>
          </ul>
          <ul className="flex flex-row gap-4">
            
            <li
              className="hover:text-[#18E074]"
              onClick={() => handleMyAllPublishes()}
            >
              ALL
            </li>
            <li
              className="hover:text-[#18E074]"
              onClick={() => handleMyRetrievedClick()}
            >
              LINKED
            </li>
            <li
              className="hover:text-[#FBE62E]"
              onClick={() => handleMyFoundsClick()}
            >
              FOUNDS
            </li>
            <li
              className="hover:text-[#E83434]"
              onClick={() => handleMyLostsClick()}
            >
              LOSTS
            </li>
          </ul>
        </div>
        <hr className=" w-[44rem] mt-4 border-[#868686] border-dashed  sm:mx-auto dark:border-gray-700 " />
        <div className="flex flex-row justify-items-center justify-between  w-[44rem] max-w-[44rem]">
          {/* SEARCH  */}

          <div class="pt-2 relative ">
            <input
              class=" placeholder-[#868686] border border-[#868686] bg-[#86868610] h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="Search"
            />
            <button type="submit" class="absolute right-0 top-0 mt-5 mr-4">
              <svg
                class="text-gray-600 h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsxlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
                style={{ enableBackground: "new 0 0 56.966 56.966" }}
                xmlspace="preserve"
                width="512px"
                height="512px"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </div>
          <select
              id="day"
              onChange={(e) => handleDayChange(e.target.value)}
              value={selectedDay}
              className="bg-transparent"
            >
              <option value="All" className="text-end">DATE</option>
              {uniqueDay.map((day) => (
                <option key={day} value={day} className="overflow-hidden w-22">
                  {day}
                </option>
              ))}
            </select>
        </div>
      </div>

      <div>
        {/* DISPLAYED DATA */}
        <div className="flex flex-row flex-wrap	 justify-center items-center gap-12 mb-28">
          <div className="flex flex-row flex-wrap justify-center items-center gap-12 mr-44 ml-44 mb-28 mt-12">
            {/* Render your data based on the state of filters */}
            {showMyLosts &&
              currentItems.map((item) => (
                <LostCard
                  // user_id={filteredData.data.user_id}
                  title={item.data.title}
                  city={item.data.city}
                  day={item.data.day}
                />
              ))}
            {showMyFounds &&
              currentItems.map((item) => (
                <FoundCard
                  // user_id={filteredData.data.user_id}
                  title={item.data.title}
                  city={item.data.city}
                  day={item.data.day}
                />
              ))}

            {/*4$$$$$$$$$$$$$$ FILTER IS NOT APPLIED &&& when changing list to retrieved it becomes empty  $$$$$$$$$$$$ */}
            {!showMyFounds &&
              !showMyLosts &&
              !showMyRetrieved &&
              showMyAllPublishes &&
              currentItems.map((item) => (
                <>
                  {item.type === "lost" ? (
                    <LostCard
                      title={item.data.title}
                      city={item.data.city}
                      day={item.data.day}
                    />
                  ) : item.type === "found" ? (
                    <FoundCard
                      title={item.data.title}
                      city={item.data.city}
                      day={item.data.day}
                    />
                  ) : null}
                </>
              ))}
            {showMyRetrieved &&
              !showMyAllPublishes &&
              currentItems.map((item) => (
                <RetrievedCard
                  // user_id={filteredData.data.user_id}
                  uesrname={item.data.title}
                  description={item.data.description}
                />
              ))}
          </div>
          </div>

          {/* PAGINATION  */}

          <div class="flex justify-center">
            <nav aria-label="Page navigation example">
              <ul className="flex list-style-none">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                  onClick={() => paginate(currentPage - 1)}
                >
                  <a
                    className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-500 pointer-events-none focus:shadow-none"
                    href="#"
                    tabIndex="-1"
                  >
                    Previous
                  </a>
                </li>

                {Array.from(
                  { length: Math.ceil(filteredData.length / ITEMS_PER_PAGE) },
                  (_, index) => (
                    <li key={index} className="page-item">
                      <a
                        className={`page-link relative block py-1.5 px-3 rounded border-0 outline-none transition-all duration-300 text-gray-800 focus:shadow-none ${
                          currentPage === index + 1 ? "bg-gray-200" : ""
                        }`}
                        href="#"
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </a>
                    </li>
                  )
                )}
                <li
                  className="page-item"
                  onClick={() => paginate(currentPage + 1)}
                >
                  <a
                    className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                    href="#"
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
      </div>
    </>
  );
};
