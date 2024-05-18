import React, { useEffect, useState } from 'react'
import bg1 from '../Assets/bg7.jpg'
import '../ComponentCSS/Profile.css'
import { Link, useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile, updateUserDetail, updateUserProfile } from '../Redux/actions/user'
import { FaCameraRetro } from "react-icons/fa6";


const Profile = () => {
    const [userDetails, setUserDetails] = useState({
        userName: "",
        email: "",
        country: "",
        state: "",
        pincode: ""
    });
    const [profilePic, setProfilePic] = useState({});
    const [coverPic, setCoverPic] = useState({});
    const navigate = useNavigate();
    const { task } = useSelector((state) => state.Tasks)
    //redux 
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.User)
    //edit state
    const [editForm, setEditForm] = useState(true);
    const [editCover, setEditCover] = useState(false);
    const userId = localStorage.getItem("userId");
    const getUser = () => {
        dispatch(getUserProfile(userId))
        setUserDetails({
            userName: user.userName,
            email: user.email,
            country: user.country,
            state: user.state,
            pincode: user.pincode
        })
    }
    const handleSave = () => {
        dispatch(updateUserDetail({ userDetails, userId }))
        handleProfileUpdate();
        alert("Profile updated successfully!")
        setEditForm(true);
    }
    //update Profile Photo
    const handleProfileUpdate = () => {
        const formData = new FormData();
        formData.append('profilePhoto', profilePic);
        dispatch(updateUserProfile({ formData, userId }))
    }
    const handleCoverPhoto = () => {
        const formData = new FormData();
        formData.append('coverPhoto', coverPic);
        dispatch(updateUserProfile({ formData, userId }))
        alert("Cover photo updated successfully!");
    }
    useEffect(() => {
        getUser()
    }, [editForm, editCover]);
    return (
        <>
            {
                editForm ?

                    <div className='profile-container'>
                        <div className="profile-bg">
                            <img src={`http://localhost:5505/${user.coverPhoto}`} alt="profile-bg"
                            />
                            <div className='cover-photo-icon' >
                                {
                                    editCover ?
                                        <div>
                                            <input type="file"
                                                onChange={(e) => {
                                                    if (e.target.files.length) {
                                                        const selectedFile = e.target.files[0];
                                                        setCoverPic(selectedFile);
                                                    } else {
                                                        setCoverPic({});
                                                    }
                                                }} />
                                            <button onClick={() => { handleCoverPhoto(); setEditCover(false) }} className='save-btn'>Save</button>
                                            <button onClick={() => setEditCover(false)} className='save-btn'>Cancel</button>
                                        </div>
                                        :
                                        <div>
                                            <FaCameraRetro onClick={() => setEditCover(true)} />
                                        </div>
                                }
                            </div>
                        </div>
                        <div className='details-profile'>
                            <div className="profile-photo">
                                <img src={`http://localhost:5505/${user.profilePhoto}`} alt="profile-bg" />
                                <button className='profile-btn' onClick={() => setEditForm(false)}>Edit Profile</button>
                                <div><button className='profile-btn' onClick={() => navigate("/change-password")} >Change Password</button></div>
                                <div>
                                    <button type="submit" className="profile-btn" onClick={() => navigate("/blog")}>Back</button>
                                </div>
                            </div>
                            <div className='user-detail'>
                                <div className='user-details'><h2>Name: </h2><div><p>{user.userName}</p></div></div>
                                <div className='user-details'> <h2>Email: </h2><div><p>{user.email}</p></div></div>
                                <div className='user-details'> <h2>Country: </h2><div><p>{user.country}</p></div></div>
                                <div className='user-details'> <h2>State: </h2><div><p>{user.state}</p></div></div>
                                <div className='user-details'> <h2>Pincode: </h2><div><p>{user.pincode}</p></div></div>
                            </div>
                            <div>
                                <div className='followers'>
                                    <div>
                                        <h2>{task.length}</h2>
                                        <p>Blogs</p>
                                    </div>
                                    <div>
                                        <h2>789</h2>
                                        <p>Followers</p>
                                    </div>
                                    <div>
                                        <h2>209</h2>
                                        <p>Following</p>
                                    </div>
                                </div>
                                <div className='display-post'>
                                    <Swiper
                                        spaceBetween={30}
                                        centeredSlides={true}
                                        autoplay={{
                                            delay: 2500,
                                            disableOnInteraction: false,
                                        }}
                                        pagination={{
                                            clickable: true,
                                        }}
                                        navigation={true}
                                        modules={[Autoplay, Pagination, Navigation]}
                                        className="mySwiper"
                                    >
                                        {task.map((item, index) => {
                                            return (<div className='display-post-photos'>
                                                <Link to={`http://localhost:5505/${item.image}`}>
                                                    <SwiperSlide><img className='blog-images' src={`http://localhost:5505/${item.image}`} alt="blogs" /></SwiperSlide>
                                                </Link>
                                            </div>
                                            )
                                        })}
                                        ...
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div >
                    :
                    <div className='update-form'>
                        <div className='update-fields'>
                            <h2>Update profile</h2>
                            <div className='update-field'>
                                <input type="text" placeholder='Name' value={userDetails.userName} onChange={(e) => setUserDetails({ ...userDetails, userName: e.target.value })} />
                                <input type="text" placeholder='Email' value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} />
                                <input type="text" placeholder='Country' value={userDetails.country} onChange={(e) => setUserDetails({ ...userDetails, country: e.target.value })} />
                                <input type="text" placeholder='State' value={userDetails.state} onChange={(e) => setUserDetails({ ...userDetails, state: e.target.value })} />
                                <input type="text" placeholder='Pincode' value={userDetails.pincode} onChange={(e) => setUserDetails({ ...userDetails, pincode: e.target.value })} />
                                <input type="file" onChange={(e) => {
                                    if (e.target.files.length) {
                                        const selectedFile = e.target.files[0];
                                        setProfilePic(selectedFile);
                                    } else {
                                        setProfilePic({});
                                    }
                                }} />
                            </div>
                            <div className='save'>
                                <button type="submit" className='save-btn' onClick={() => handleSave()}>Save</button>
                                <button type="submit" className='cancel-btn' onClick={() => setEditForm(true)}>Cancel</button>
                            </div>
                        </div>
                    </div >
            }
        </>

    )
}

export default Profile