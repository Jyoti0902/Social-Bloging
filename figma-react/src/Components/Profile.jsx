import React, { useEffect, useState } from 'react';
import '../ComponentCSS/Profile.css';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import logo from '../Assets/blognest-high-resolution-logo-transparent.png'
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, updateUserDetail, updateUserProfile } from '../Redux/actions/user';
import { FaCameraRetro } from "react-icons/fa6";
import Footer from './Footer';

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
    const { task } = useSelector((state) => state.Tasks);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.User);
    const [editForm, setEditForm] = useState(true);
    const [editCover, setEditCover] = useState(false);
    const userId = localStorage.getItem("userId");

    const getUser = () => {
        dispatch(getUserProfile(userId));
        setUserDetails({
            userName: user.userName,
            email: user.email,
            country: user.country,
            state: user.state,
            pincode: user.pincode
        });
    };

    const handleSave = () => {
        dispatch(updateUserDetail({ userDetails, userId }));
        handleProfileUpdate();
        alert("Profile updated successfully!");
        setEditForm(true);
    };

    const handleProfileUpdate = () => {
        const formData = new FormData();
        formData.append('profilePhoto', profilePic);
        dispatch(updateUserProfile({ formData, userId }));
    };

    const handleCoverPhoto = () => {
        const formData = new FormData();
        formData.append('coverPhoto', coverPic);
        dispatch(updateUserProfile({ formData, userId }));
        alert("Cover photo updated successfully!");
    };

    useEffect(() => {
        getUser();
    }, [editForm, coverPic]);

    return (
        <>
            {
                editForm ?
                    <div className='profile-container'>
                        <div className="profile-bg">
                            <img src={`${process.env.REACT_APP_API}/${user.coverPhoto}`} alt="profile-bg" />
                            <div className='cover-photo-icon'>
                                {
                                    editCover ?
                                        <div className='input-cover'>
                                            <input type="file" onChange={(e) => {
                                                if (e.target.files.length) {
                                                    const selectedFile = e.target.files[0];
                                                    setCoverPic(selectedFile);
                                                } else {
                                                    setCoverPic({ ...user, coverPhoto: {} });
                                                }
                                            }} />
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <button onClick={() => { handleCoverPhoto(); setEditCover(false) }} className='save-btn'>Save</button>
                                                <button onClick={() => setEditCover(false)} className='cancel-btn'>Cancel</button>
                                            </div>

                                        </div>
                                        :
                                        <FaCameraRetro onClick={() => setEditCover(true)} style={{ color: '#fceae8', fontSize: '20px' }} />
                                }
                            </div>
                        </div>
                        <div className='details-profile'>
                            <div className="profile-photo">
                                <img src={`${process.env.REACT_APP_API}/${user.profilePhoto}`} alt="profile" />
                                <button className='profile-btn' onClick={() => setEditForm(false)}>Edit Profile</button>
                                <button className='profile-btn' onClick={() => navigate("/change-password")}>Change Password</button>
                                <button className='profile-btn' onClick={() => navigate("/blog")}>Back</button>
                            </div>
                            <div className='user-detail'>
                                <div className='user-details'><h2>Name: </h2><p>{user.userName}</p></div>
                                <div className='user-details'><h2>Email: </h2><p>{user.email}</p></div>
                                <div className='user-details'><h2>Country: </h2><p>{user.country}</p></div>
                                <div className='user-details'><h2>State: </h2><p>{user.state}</p></div>
                                <div className='user-details'><h2>Pincode: </h2><p>{user.pincode}</p></div>
                            </div>
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
                                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                                    pagination={{ clickable: true }}
                                    navigation={true}
                                    modules={[Autoplay, Pagination, Navigation]}
                                    className="mySwiper"
                                >
                                    {task.map((item, index) => (
                                        <div className='display-post-photos' key={index}>
                                            <Link to={`${process.env.REACT_APP_API}/${item.image}`}>
                                                <SwiperSlide>
                                                    <img className='blog-images' src={`${process.env.REACT_APP_API}/${item.image}`} alt="blogs" />
                                                </SwiperSlide>
                                            </Link>
                                        </div>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                    :
                    <>

                        <img src={logo} alt="logo" className='main-logo' style={{ margin: '20px' }} />
                        <div className='update-form'>
                            <div className='update-fields'>
                                <h2>Update Profile</h2>
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
                                    <button type="submit" className='cancel-btn' onClick={() => handleSave()}>Save</button>
                                    <button type="submit" className='cancel-btn' onClick={() => setEditForm(true)}>Cancel</button>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </>
            }
        </>
    );
};

export default Profile;
