import React, { useEffect, useState } from "react";
import axios from "axios";
import { Cancel, PlusYellow } from "../assets/icons/IconsSVGConst";
import { useModal } from "../../src/hooks/useContext/ModalContext"
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { ConfirmContact } from "./uiPrimitives/ConfirmContact";
import { SuccessfullyUploaded } from "./responseModals/SuccessfullyUploaded";
import { FailedToUpload } from "./responseModals/FailedToUpload";

Modal.setAppElement(document.getElementById("root"));

export const PublishFound = ({ isOpen, onRequestClose }) => {
  // const { modalIsOpen, openModal } = useModal();
  const [successfullyUploadedIsOpen, setSuccessfullyUploadedIsOpen] = useState(false);
  const [failedToUploadIsOpen, setFailedToUploadIsOpen] = useState(false);
  const openModal = () => {
    setSuccessfullyUploadedIsOpen(true);
    setFailedToUploadIsOpen(true);
  };

  const closeModal = () => {
    setSuccessfullyUploadedIsOpen(false);
    setFailedToUploadIsOpen(false);
  };

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
      .get("http://localhost:3000/found")
      .then((response) => {
        setCategoriesData(response.data);
      })
      .catch((error) => {
        setError("Can not get data", error);
      });
  }, []);

  const [formData, setFormData] = useState({
    type: "[Found]",
    title: "",
    description: "",
    category: "",
    country: "",
    city: "",
    date_lost: "",
    ///IMAGE////
    imageurl: null,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  ///IMAGE////
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, image: file }));
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("category", formData.category);
      form.append("country", formData.country);
      form.append("city", formData.city);
      form.append("date_found", formData.date_found);
      form.append("description", formData.description);
      ///IMAGE////
      form.append("image", formData.image);

      const response = await axios.post(
        "http://localhost:3000/test-upload",
        form
      );

      if (response.status === 200) {
        onRequestClose();
        setSuccessfullyUploadedIsOpen(true);
        // setFailedToUploadIsOpen(true);

        
        console.log("Form submitted successfully!");
      } else {
        console.error("Failed to submit form.");
      }
    } catch (error) {
      console.error("Error:", error);
      onRequestClose();
      setFailedToUploadIsOpen(true);
    }
  };

  return (
    <>
     {successfullyUploadedIsOpen && (
        <SuccessfullyUploaded isOpen={openModal} onRequestClose={closeModal} />
      )}
     {failedToUploadIsOpen && (
        <FailedToUpload  isOpen={openModal} onRequestClose={closeModal}/>
      )}

      <Modal
        className=" absolute left-[25rem]  p-12 bg-[#373737] rounded-[1rem] w-[50rem] h-[45rem] "
        isOpen={isOpen}
        style={modalStyle}
        onRequestClose={onRequestClose}
      >
        <form
          onSubmit={handleUpload}
          encType="multipart/form-data"
          className="flex flex-col align-start justify-start gap-4 "
        >
          <div className="flex flex-row justify-between	">
            <span className="w-32 flex flex-row inline-block gap-x-2 px-[0.75rem] pb-2 hover:text-[#FBE62E] bg-none border border-2 hover:border-[#FBE62E]  focus:outline-none text-[#FFFFFF] text-[0.7rem] font-semibold rounded-[0.65rem] text-xs px-5 py-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              <PlusYellow /> I’VE FOUND
            </span>
            <button onClick={onRequestClose} className="flex justify-end">
              <Cancel />
            </button>
          </div>

          <label className="self-start text-[0.85rem] mb-1 justify-self-center place-items-center text-[#CDCDCD]">
            Please fill the following information regarding the belonging you
            found{" "}
          </label>

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
          >
            <option value="">All categories</option>
            {categories.map((item) => (
              <option key={item.id} value={item.category}>
                {item.category}
              </option>
            ))}
          </select>

          <label className="self-start text-[0.85rem] mb-1 justify-self-center place-items-center text-[#CDCDCD55]">
            Where and when did you find it !
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
              name="date_found"
              value={formData.date_found}
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
          {/* ///IMAGE//// */}
          <input
            type="file"
            // id="image"
            // name="image"
            // accept="image/*"
            // onChange={handleImageChange}
            onChange={handleFileChange}
          />

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
            className="self-end text-center w-28 px-3 pb-2 text-[#fff] bg-transparent border border-1 border-[#fff] font-light focus:outline-none hover:bg-[#ffffff] hover:text-[#373737]  rounded-lg text-[1rem] px-5 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Publish
          </button>
         
        </form>
      </Modal>
    </>
  );
};

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Cancel, PlusYellow } from "../assets/icons/IconsSVGConst";
// import Modal from "react-modal";
// import { useNavigate } from "react-router-dom";

// Modal.setAppElement(document.getElementById("root"));

// export const PublishFound = ({ isOpen, onRequestClose }) => {
//   const modalStyle = {
//     overlay: {
//       backgroundColor: "#ffffff50",
//       zIndex: 1000,
//     },
//   };

//   const inputBorderStyle = {
//     background: "transparent",
//     border: "none",
//     borderBottom: "1px solid #CDCDCD84",
//     placeholder: "#CDCDCD84",
//     color: "white",
//   };

//   const [formData, setFormData] = useState({
//     type: "Found",
//     title: "",
//     description: "",
//     category: "",
//     country: "",
//     city: "",
//     date_found: "",
//     imageurl: null, // Initialize as null
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setFormData({ ...formData, imageurl: file });
//   };

//   const [error, setError] = useState("");
//   const [categories, setCategoriesData] = useState([]);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formDataToSend = new FormData();

//     for (const key in formData) {
//       formDataToSend.append(key, formData[key]);
//     }

//     try {
//       const response = await axios.post("http://localhost:3000/itemfound", formData);

//       console.log("Form data sent successfully:", response.data);
//       navigate("/");
//     } catch (error) {
//       setError("Something went wrong");
//       console.error("Error:", error);
//     }
//   };
