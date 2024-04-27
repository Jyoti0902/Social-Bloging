import React, { useEffect, useState } from 'react'
import '../ComponentCSS/HeaderUpper.css';
import { FaRocketchat, FaCaretDown } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { getProfileDetails } from '../APIs/endpoints';


const HeaderUpper = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const userId = localStorage.getItem("userId");
  const fetchProfileDetails = async () => {
    const res = await getProfileDetails(userId);
    setUserDetails(res.data);
  }
  useEffect(() => {
    fetchProfileDetails();
  }, []);
  return (
    <>
      <div className="container-HU">
        <div className="rightHU">
          <p className='headingall'>Chatterly</p>
          <FaRocketchat className='chat-icon' />
        </div>
        <div className="leftHU">
          <img className='profile-img' src={`http://localhost:5505/${userDetails.profilePhoto}`} alt='profile-img' onClick={() => navigate("/profile")} />
          <p className='heading1 headingall' onClick={() => navigate("/profile")}>{userDetails.userName}</p>
          <FaCaretDown className='c1' />
        </div>
      </div>
    </>
  )
}

export default HeaderUpper