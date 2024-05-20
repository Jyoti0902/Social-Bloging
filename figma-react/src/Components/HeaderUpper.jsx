import React, { useEffect, useState } from 'react'
import '../ComponentCSS/HeaderUpper.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getProfileDetails } from '../APIs/endpoints';
import logo from '../Assets/blognest-high-resolution-logo-transparent.png'
import { FiLogOut } from 'react-icons/fi';


const HeaderUpper = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const userId = localStorage.getItem("userId");
  const fetchProfileDetails = async () => {
    const res = await getProfileDetails(userId);
    setUserDetails(res.data);
  }
  // logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  }
  useEffect(() => {
    fetchProfileDetails();
  }, []);
  return (
    <>
      <div className="container-HU">
        <div className="rightHU">
          <img src={logo} alt="logo" className='main-logo' />
        </div>
        <div className="leftHU">
          <Link to="/blog" className='link-tag'>Home</Link>
          <Link to="/allposts" className='link-tag'>My Blogs</Link>
          <Link to="/about" className='link-tag'>About</Link>
          <Link to="/profile" className='link-tag'>Profile</Link>
          <div style={{ display: 'flex', justifyContent: 'center' }} onClick={() => handleLogout()}>
            <FiLogOut onClick={() => handleLogout()} className='logout' /><h4>Logout</h4>
          </div>
        </div>
      </div>

    </>
  )
}

export default HeaderUpper