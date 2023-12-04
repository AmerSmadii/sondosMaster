import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Cancel,
  MinusRed,
  Plus,
  PlusYellow,
} from "../assets/icons/IconsSVGConst";
import { LinkIcon } from "../assets/icons/IconsSVGConst";
import { Navigate, useNavigate } from "react-router-dom";

import Modal from "react-modal";
Modal.setAppElement(document.getElementById("root"));

export const PublishLost = ({ isOpen, onRequestClose }) => {
  const modalStyle = {
    overlay: {
      backgroundColor: "#ffffff50",
      zIndex: 1000,
    },
  };

  const inputBorderStyle = {
    background: "transparent",
    border: "none",
    borderBottom: "1px solid #CDCDCD84",
    placeholder: "#CDCDCD84",
    color: "white",
  };

  const [error, setError] = useState("");
  const [categories, setCategoriesData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/lost")
      .then((response) => {
        setCategoriesData(response.data);
      })
      .catch((error) => {
        setError("Can not get data", error);
      });
  }, []);

  const [formData, setFormData] = useState({
    type: 'lost',
    title: '',
    description: '',
    category: '',
    country: '',
    city: '',
    date_lost: '',
    imageurl: null,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, imageurl: file }));
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("category", formData.category);
      form.append("country", formData.country);
      form.append("city", formData.city);
      form.append("date_lost", formData.date_lost);
      form.append("description", formData.description);
      form.append("image", formData.imageurl);

      const response = await axios.post("http://localhost:3000/test-uploaded",form);

      if (response.status === 200) {
        console.log("Form submitted successfully!");
        console.log("ssss",formData );
      } else {
        console.error("Failed to submit form.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Modal
        className=" absolute left-[25rem]  p-12 bg-[#373737] rounded-[1rem] w-[50rem] h-[45rem] "
        isOpen={isOpen}
        style={modalStyle}
        onRequestClose={onRequestClose}
      >
        <form
          onSubmit={handleUpload}
          className="flex flex-col align-start justify-start gap-4 "
        >
          <div className="flex flex-row justify-between	">
            <label className="w-32 mb-8 flex flex-row align-center inline-block gap-x-2 px-[1rem] pb-2 text-[#E83434] bg-none border border-2 border-[#E83434] text-[0.7rem] font-semibold rounded-[0.65rem] text-xs px-5 py-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              <MinusRed />
              I’VE LOST
            </label>
            <button onClick={onRequestClose} className=" flex justify-end">
              <Cancel />
            </button>
          </div>
          <label className="self-start text-[0.85rem] mb-1 justify-self-center place-items-center text-[#CDCDCD]">
            Please fill the following information regarding the belonging you
            Lost{" "}
          </label>

          <label></label>
          <input
            type="text"
            name="title"
            style={inputBorderStyle}
            value={formData.title}
            onChange={handleInputChange}
            placeholder="What did you find !!"
            className="placeholder-[#CDCDCD84] mb-4 font-light"
            required
          />

          <label className="self-start text-[0.85rem] mb-1 justify-self-center place-items-center text-[#CDCDCD55]">
            Under what category does it fall !
          </label>

          <select
            name="category"
            id=""
            className="w-32 bg-transparent text-[#CDCDCD95]"
            onChange={handleInputChange}
            // required
          >
            <option value="">All categories</option>
            {categories.map((item) => (
              <option key={item.id} value={item.category}>
               {item.category}
              </option>
            ))}
          </select>

          <label className="self-start text-[0.85rem] mb-1 justify-self-center place-items-center text-[#CDCDCD55]">
            Where and when did you lost it !
          </label>
          <label htmlFor="" className="flex flex-row gap-4">
            <select
              name="country"
              id=""
              className="w-24 bg-transparent text-[#CDCDCD95]"
              onChange={handleInputChange}
              required
            >
              <option value="">Country</option>
              <option value="Jordan">Jordan</option>
            </select>
            <select
              name="city"
              id=""
              className="w-24 bg-transparent text-[#CDCDCD95]"
              onChange={handleInputChange}
              required
            >
              <option value="">City</option>
              <option value="Amman">Amman</option>
              <option value="Zarqaa">Zarqaa</option>
            </select>
            <input
              type="date"
              name="date_lost"
              value={formData.date_lost}
              onChange={handleInputChange}
              className="w-32 bg-transparent text-[#CDCDCD95]"
              required
            />
          </label>

          <label
            htmlFor=""
            className="self-start text-[0.85rem] mb-1 justify-self-center place-items-center text-[#CDCDCD55]"
          >
            Attach images of the item
          </label>
          <input type="file" 
          onChange={handleFileChange}

          // value={formData.image}
          />

          {/* max number of letters */}
          <label
            htmlFor=""
            className="self-start text-[0.85rem] mb-1 justify-self-center place-items-center text-[#CDCDCD55]"
          >
            Write notes/ description to others
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="h-[7rem] rounded-[0.65rem] bg-[#CDCDCD95]"
          />

          <button
            type="submit"
            className=" self-end text-center w-28 px-3 pb-2 text-[#fff] bg-transparent border border-1 border-[#fff] font-light focus:outline-none hover:bg-[#ffffff] hover:text-[#373737]  rounded-lg text-[1rem] px-5 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Publish
          </button>
        </form>
      </Modal>
    </>
  );
};
