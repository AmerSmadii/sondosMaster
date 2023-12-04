import React from "react";
import { MineBtn } from "./uiPrimitives/MineBtn";
import { Calendar, Cancel, Plus, Share } from "../assets/icons/IconsSVGConst";
import { Comment } from "./uiPrimitives/Comment";
import { Location } from "../assets/icons/IconsSVGConst";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Modal from "react-modal";
import CommentInput, {
  CoomentFunctional,
} from "./uiPrimitives/CoomentFunctional";
Modal.setAppElement(document.getElementById("root"));

export const MainCardFound = ({
  cardData,
  isOpen,
  onRequestClose,
  children,
  // description,
  username,
  // image,
  publishday,
  // city,
  // title,
  data
  // data: { title, city, description, image }
}) => {
    // const { title, city,  description, image } =
    //   data;
    const { title, city, description, image } = data || {};

  const modalStyle = {
    overlay: {
      backgroundColor: "#37373704",
      zIndex: 5000,
    },
  };

  const settings = {
    dots: false,
    infinite: false,
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  ////// GET COMMENTS //////////////////
  const [commentData, setCommentData] = useState([]);

  useEffect(() => {
    
    // GET data from LOSTS
    axios.get('http://localhost:3000/getAllComments')
      .then(response => {
        setCommentData(response.data);
        console.log('commentslider',commentData)
      })
      .catch(error => {
        console.error('Error fetching data from the first API:', error);
      });

  }, []);
  const [found, setFound] = useState([]);

  // useEffect(() => {
  //   // Fetch comments based on the card ID
  //   if (cardData && cardData.id) {
  //     axios
  //       .get(`http://localhost:3000/Founds/${cardData.id}`)
  //       .then((response) => {
  //         setFound(response.data);
  //         console.log("found", found.id);

  //         // setComments(response.data);
  //         console.log("carddata", cardData);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data: ", error);
  //       });
  //   }
  // }, [cardData]);

  ///////////////////////WITH COMMENTS////////////////////////////
  // useEffect(() => {
  //   // Fetch comments based on the card ID
  //   if (cardData && cardData.id) {
  //     axios.get(`http://localhost:3000/Founds/${cardData.id}/comments`)
  //       .then((response) => {
  //         console.log('carddata', cardData)
  //         // Make sure response.data is an array
  //         if (Array.isArray(response.data)) {
  //           setComments(response.data);
  //         } else {
  //           console.error("Invalid data format for comments:", response.data);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data: ", error);
  //       });
  //   }
  // }, [cardData]);
  //////////////////////////////////////////////////////////////////

  //   const { id } = useParams();
  //   const [found, setFound] = useState(null);

  //   useEffect(() => {
  //     axios.get(`http://localhost:3000/Founds/${id}`)
  //           .then ((response)=>{
  //             setFound(response.data[0]);
  //         })
  //         .catch ((error) => {
  //           console.error("Error fetching data: ", error);
  //         });
  //     }, []);

  //   if (!found) {
  //     return <div>Loading...</div>;
  //   }

  return (
    <Modal
      className="absolute top-1 left-[36rem] flex flex-col"
      style={modalStyle}
      onRequestClose={onRequestClose}
      isOpen={isOpen}
    >
      <span className="flex flex-row gap-4 inline-block pb-2 text-[#FBE62E] bg-none text-[0.7rem] font-semibold rounded-[0.65rem] text-xs py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
        <Plus /> I’VE FOUND
      </span>
      <div className="p-8 justify-stretch grid grid-col-1 grid-flow-row  bg-[#373737] rounded-[1.25rem] w-[22rem] h-[40rem] ">
        <button onClick={onRequestClose} className="flex justify-end">
          <Cancel />
        </button>

        <div className="flex flex-col">
          <div className="flex flex-row gap-4 ">
            <img
              src={''}
              alt="userpic"
              className="bg-[#CDCDCD] row-span-2 w-10 h-10 rounded-full"
            />
            <div className="text-[#CDCDCD] font-light text-[0.9rem]">
              {/* {found.id} */}
              {title}
              <span className="block text-[#CDCDCD85] font-light text-[0.75rem]">
                {/* {found.city} */}
                {city}
              </span>{" "}
            </div>
            <div className="pt-[0.3rem] pl-16 text-end text-[#CDCDCD] font-light text-[0.65rem]">
              21:00 pm <span className="block">
                {/* {found.publish_day} */}
                {publishday}
                </span>
            </div>
          </div>
          <hr className="w-56 content-end m-2 border-[#CDCDCD50] border-dashed  sm:mx-auto dark:border-gray-700" />
          <span className="text-[#CDCDCD] text-start font-light text-[0.75rem]">
            {/* {found.description} */}
            <span className="block text-start flex gap-2 items-center ">
              <Location />
              {/* {found.found_location} II */}
              <span className="inline-block ml-4 flex gap-2 items-center ">
                <Calendar />
                {/* {found.day} */}
              </span>
            </span>
          </span>
          <div className="pt-[0.3rem] pl-16 text-[#CDCDCD] font-light text-[0.65rem]"></div>
        </div>

        <div className="flex flex-col"></div>

        <div className="mt-4 border border-1-solid rounded-[1.25rem]  w-[14rem] h-[14rem]">
          <img src="" alt="" className="rounded-[1.25rem]" />
        </div>

        {/* <div className="mt-8 col-span-1 w-[16rem] h-[4rem] bg-[#86868637] p-4 rounded-[0.75rem]">
          <Comment />
        </div> */}

        <div className="mt-4 w-[18rem]">
          <Slider {...settings}>
            {Array.isArray(commentData.comments) && commentData.comments.map((item) => (
                <CoomentFunctional key={item.id_contact}
                description={item.description}
                username={item.full_name}
                // image={item.}
                />
            ))}
        </Slider>

          <CommentInput />
        </div>

        <div className="flex flex-row gap-[4.75rem] items-center">
          <MineBtn />
          <div className="pl-8">
            <Share />
          </div>
        </div>
      </div>
    </Modal>
  );
};
