import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { Cancel } from "../../assets/icons/IconsSVGConst";
////////JWT///////////
import { UseUser } from "../../hooks/useContext/UserContext";
import { useParams } from "react-router-dom";
import { useCookies } from 'react-cookie';


Modal.setAppElement(document.getElementById("root"));

const UpdateUserDataModal = ({ isOpen, onRequestClose }) => {
  const modalStyle = {
    overlay: {
      backgroundColor: "#ffffff50",
      zIndex: 5,
      border: "none",
    },
  };

  const defaultImageURL =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAh0lEQVR42mP4z/CfPwMDAzMDP//PAAmgsHk1Ab0AAAAASUVORK5CYII=";


  const [userData, setUserData] = useState({
    user_id: "",
    username: "",
    country: "",
    city: "",
    email: "",
    phonenumber: "",
    password: "",
  });

  
  const { user } = UseUser();
  const [cookies] = useCookies(['userToken']);

  const [formData, setFormData] = useState({
    username:'',
    email:'',
    phonenumber:'',
    country:'',
    city:'',
    password:'',
  });
  
  useEffect(() => {
      const fetchUserData = async () => {
        try {
          if (user) {
            const token = cookies.userToken || null;
            axios.defaults.headers.common['authorization'] = `${token}`;
            const response = await axios.get(`http://localhost:3000/profile`);
            // console.log(response.data)
            setUserData(response.data[0]);
          }
                     
          } catch (error) {
        console.error("Error fetching user data:", error);
      }
   
    };
    fetchUserData();
  }, [user, cookies]);


useEffect(()=>{
if(userData){
  setFormData({
    username: userData.username || '',
    email: userData.email || '',
    phonenumber: userData.phonenumber || '',
    country: userData.country || '',
    city: userData.city || '',
    password: userData.password || '',
  })
}
}, [userData])

const handleInputChange = (e) => {
  const {name, value} = e.target;
  setFormData({
    ...formData,
    [name]:value,
  });
};
  
  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    const updatedData ={
      username: formData.username,
      email: formData.email,
      phonenumber: formData.phonenumber,
      country: formData.country,
      city: formData.city,
      password: formData.password,
    };

    try {
      const token = cookies.userToken || null;
      // axios.defaults.headers.common['authorization'] = `${token}`;
      axios.defaults.headers.common['authorization'] = `${token}`;

      const response = await axios.put(`http://localhost:3000/user`, updatedData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
    

  return (
    <Modal
      className="absolute top-12 left-[30rem]  gap-8 p-12 bg-[#373737] rounded-[1rem] w-[38rem] h-[40rem] "
      isOpen={isOpen}
      style={modalStyle}
      onRequestClose={onRequestClose}
      contentLabel="Update User Info Modal"
    >
      <div className="flex flex-col">
        <button onClick={onRequestClose} className="self-end">
          <Cancel />
        </button>
        <div className="self-center justify-self-center">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="20" cy="20" r="19.5" stroke="#E83434" />
            <path
              d="M20 11V22"
              stroke="#E83434"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M20 27V29"
              stroke="#E83434"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      <div className="text-[2.25rem] text-center font-extralight text-[#fff]">
        Update My Info
      </div>

      <form className="flex flex-col justify-center items-center" encType="multipart/form-data" onSubmit={handleUpdateInfo}>
        <label htmlFor="">Image</label>
        <input
          type="file"
          // onChange={handleImageChange}
          // accept="image/*"
          src={defaultImageURL}
          className="bg-[#86868673] p-1 mb-1 rounded-full w-[5rem]"
          // onChange={(e) => setEditedImage(e.target.files[0])}
        />

        {/* <img
          src={userData.profileImage || defaultImageURL}
          alt="userpic"
          className="bg-[#000] row-span-2 w-10 h-10 rounded-full"
        /> */}

        <label htmlFor="">Name</label>
        <input
          type="text"
          className="bg-[#ffffff70] p-1 mb-1 rounded-[0.25rem] w-[10.5rem]"
          onChange={handleInputChange}
          value={formData.username}
          name='username'
        />

        <label htmlFor="">Country</label>
        <input
          type="text"
          className="bg-[#ffffff70] p-1 rounded-[0.25rem] w-[10.5rem]"
          onChange={handleInputChange}
          value={formData.country}
          name="country"
        />

        <label htmlFor="">City</label>
        <input
          type="text"
          className="bg-[#ffffff70] p-1 rounded-[0.25rem] w-[10.5rem]"
          onChange={handleInputChange}
          value={formData.city}
          name="city"
        />

        <label htmlFor="">Email</label>
        <input
          type="text"
          className="bg-[#ffffff70] p-1 rounded-[0.25rem] "
          onChange={handleInputChange}
          value={formData.email}
          name="email"
        />

        <label htmlFor="">Phone Number</label>
        <input
          type="text"
          className="bg-[#ffffff70] p-1 rounded-[0.25rem] "
          onChange={handleInputChange}
          value={formData.phonenumber}
          name="phonenumber"
        />

        <label htmlFor="" className="text-[#000] font-light text-[0.9rem] ">
          Password
        </label>
        <input
          type="password"
          placeholder="set new password"
          className="bg-[#ffffff70] p-1 rounded-[0.25rem] "
          onChange={handleInputChange}
          value={formData.password}
          name='password'
        />

        <button
          type="submit"
          className="text-center mt-4 text-[#fff] font-light text-[0.9rem] border border-[#fff]  hover:bg-[#ffffff50] rounded-[0.5rem] p-1 w-[10rem]"
        >
          Save Changes
        </button>
      </form>
    </Modal>
  );
};

export default UpdateUserDataModal;



////////////////////old/////////////////////////////
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Modal from "react-modal";
// import { Cancel } from "../../assets/icons/IconsSVGConst";
// ////////JWT///////////
// import { UseUser } from "../../hooks/useContext/UserContext";
// import { useParams } from "react-router-dom";
// import { useCookies } from 'react-cookie';


// Modal.setAppElement(document.getElementById("root"));

// const UpdateUserDataModal = ({ isOpen, onRequestClose }) => {
//   const modalStyle = {
//     overlay: {
//       backgroundColor: "#ffffff50",
//       zIndex: 5,
//       border: "none",
//     },
//   };

//   const defaultImageURL =
//     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAh0lEQVR42mP4z/CfPwMDAzMDP//PAAmgsHk1Ab0AAAAASUVORK5CYII=";


//   const [userData, setUserData] = useState({
//     user_id: "",
//     username: "",
//     country: "",
//     city: "",
//     email: "",
//     phonenumber: "",
//     password: "",
//     // Add other fields as needed
//   });

//   // const [formData, ]
//   const [editedUsername, setEditedUsername] = useState("");
//   const [editedCity, setEditedCity] = useState("");
//   const [editedCountry, setEditedCountry] = useState("");
//   const [editedEmail, setEditedEmail] = useState("");
//   const [editedPhoneNumber, setEditedPhoneNumber] = useState("");
//   const [editedPassword, setEditedPassword] = useState("");
//   const [editedImage, setEditedImage] = useState(null); // Use null to represent no change in the image

//   const { user } = UseUser();
//   const [cookies] = useCookies(['userToken']);

//   useEffect(() => {
//       const fetchUserData = async () => {
//         try {
//           if (user) {
//             const token = cookies.userToken || null;
//             axios.defaults.headers.common['authorization'] = `${token}`;
//             const response = await axios.get(`http://localhost:3000/profile`);
//             // console.log(response.data)
//             setUserData(response.data[0]);
//           }
                     
//           } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
   
//     };
//     fetchUserData();
//   }, [user, cookies]);

//   const handleUpdateInfo = async (e) => {
//     e.preventDefault();
  
//     try {
//       const token = cookies.userToken || null;
//       axios.defaults.headers.common['authorization'] = `${token}`;

//       const formData = new FormData();
     
//       // Append the updated user data
//       if (editedUsername !== null){
//       formData.append("username", editedUsername || userData.username);}
//       formData.append("country", editedCountry || userData.country);
//       formData.append("city", editedCity || userData.city);
//       formData.append("email", editedEmail || userData.email);
//       formData.append("phonenumber", editedPhoneNumber || userData.phonenumber);
//       formData.append("password", editedPassword || userData.password);
  
//       // // Append the updated image if available
//       // if (editedImage) {
//       //   formData.append("image", editedImage, editedImage.name);
//       // }
  
//       const response = await axios.put(
//         `http://localhost:3000/user`,
//         formData
//       );
  
//       console.log("FormData:", formData); // Log FormData before making the request

//       console.log("Update successful", response.data);
  
//       // Update the state only after a successful response
    
  
//       // Clear the edited image state
//       if (response.status === 200) {
//         console.log('Form submitted successfully!');
//       } else {
//         console.error('Failed to submit form.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
  
//   const handleImageChange = (e) => {
//     const selectedImage = e.target.files[0];
//     setEditedImage(selectedImage);
//   };
//   // setUserData({
//   //   ...userData,
//   //   username: editedUsername || userData.username,
//   //   country: editedCountry || userData.country,
//   //   city: editedCity || userData.city,
//   //   email: editedEmail || userData.email,
//   //   phonenumber: editedPhoneNumber || userData.phonenumber,
//   //   password: editedPassword || userData.password,
//   //   // Add other fields as needed
//   // });
//   return (
//     <Modal
//       className="absolute top-12 left-[30rem]  gap-8 p-12 bg-[#373737] rounded-[1rem] w-[38rem] h-[40rem] "
//       isOpen={isOpen}
//       style={modalStyle}
//       onRequestClose={onRequestClose}
//       contentLabel="Update User Info Modal"
//     >
//       <div className="flex flex-col">
//         <button onClick={onRequestClose} className="self-end">
//           <Cancel />
//         </button>
//         <div className="self-center justify-self-center">
//           <svg
//             width="40"
//             height="40"
//             viewBox="0 0 40 40"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <circle cx="20" cy="20" r="19.5" stroke="#E83434" />
//             <path
//               d="M20 11V22"
//               stroke="#E83434"
//               strokeWidth="2"
//               strokeLinecap="round"
//             />
//             <path
//               d="M20 27V29"
//               stroke="#E83434"
//               strokeWidth="2"
//               strokeLinecap="round"
//             />
//           </svg>
//         </div>
//       </div>
//       <div className="text-[2.25rem] text-center font-extralight text-[#fff]">
//         Update My Info
//       </div>

//       <form className="flex flex-col justify-center items-center" encType="multipart/form-data" onSubmit={handleUpdateInfo}>
//         <label htmlFor="">Image</label>
//         <input
//           type="file"
//           onChange={handleImageChange}
//           // accept="image/*"
//           src={defaultImageURL}
//           className="bg-[#86868673] p-1 mb-1 rounded-full w-[5rem]"
//           // onChange={(e) => setEditedImage(e.target.files[0])}
//         />

//         {/* <img
//           src={userData.profileImage || defaultImageURL}
//           alt="userpic"
//           className="bg-[#000] row-span-2 w-10 h-10 rounded-full"
//         /> */}

//         <label htmlFor="">Name</label>
//         <input
//           type="text"
//           className="bg-[#ffffff70] p-1 mb-1 rounded-[0.25rem] w-[10.5rem]"
//           onChange={(e) => setEditedUsername(e.target.value)}
//           value={editedUsername || userData.username}
//         />

//         <label htmlFor="">Country</label>
//         <input
//           type="text"
//           className="bg-[#ffffff70] p-1 rounded-[0.25rem] w-[10.5rem]"
//           onChange={(e) => setEditedCountry(e.target.value)}
//           value={editedCountry || userData.country}
//         />

//         <label htmlFor="">City</label>
//         <input
//           type="text"
//           className="bg-[#ffffff70] p-1 rounded-[0.25rem] w-[10.5rem]"
//           onChange={(e) => setEditedCity(e.target.value)}
//           value={editedCity || userData.city}
//         />

//         <label htmlFor="">Email</label>
//         <input
//           type="text"
//           className="bg-[#ffffff70] p-1 rounded-[0.25rem] "
//           onChange={(e) => setEditedEmail(e.target.value)}
//           value={editedEmail || userData.email}
//         />

//         <label htmlFor="">Phone Number</label>
//         <input
//           type="text"
//           className="bg-[#ffffff70] p-1 rounded-[0.25rem] "
//           onChange={(e) => setEditedPhoneNumber(e.target.value)}
//           value={editedPhoneNumber || userData.phonenumber}
//         />

//         <label htmlFor="" className="text-[#000] font-light text-[0.9rem] ">
//           Password
//         </label>
//         <input
//           type="text"
//           placeholder="set new password"
//           className="bg-[#ffffff70] p-1 rounded-[0.25rem] "
//           onChange={(e) => setEditedPassword(e.target.value)}
//           value={editedPassword || userData.password}
//         />

//         <button
//           type="submit"
//           className="text-center mt-4 text-[#fff] font-light text-[0.9rem] border border-[#fff]  hover:bg-[#ffffff50] rounded-[0.5rem] p-1 w-[10rem]"
//         >
//           Save Changes
//         </button>
//       </form>
//     </Modal>
//   );
// };

// export default UpdateUserDataModal;
