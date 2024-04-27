import React, { useEffect, useState } from 'react'
import bg1 from '../Assets/bg7.jpg'
import '../ComponentCSS/Profile.css'
import { GetBlogs, getProfileDetails, updateProfile, updateProfilePhoto } from '../APIs/endpoints'
import { Link, useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';


const Profile = () => {
    const [userDetails, setUserDetails] = useState({});
    const [profilePic, setProfilePic] = useState({});
    const navigate = useNavigate();
    //edit state
    const [blog, setBlog] = useState([])
    const [editForm, setEditForm] = useState(true);
    const userId = localStorage.getItem("userId");
    const fetchProfileDetails = async () => {
        const res = await getProfileDetails(userId);
        setUserDetails(res.data)
        // console.log(res.data)
    }
    const handleSave = async () => {
        await updateProfile(userDetails, userId);
        handleProfileUpdate();
        alert("Profile updated successfully!")
        setEditForm(true);
        fetchProfileDetails();
    }
    const handleCancel = async () => {
        await fetchProfileDetails();
        setEditForm(true);

    }
    //blog count
    const fetchPosts = async () => {
        const res = await GetBlogs();
        setBlog(res.data);
        // console.log(res.data)
    }
    //update Profile Photo
    const handleProfileUpdate = async () => {
        const formData = new FormData();
        formData.append('profilePhoto', profilePic);
        await updateProfilePhoto(formData, userId);
    }
    useEffect(() => {
        fetchPosts()
        fetchProfileDetails();
    }, []);
    return (
        <>
            {
                editForm ?

                    <div className='profile-container'>

                        <div className="profile-bg">
                            <img src={bg1} alt="profile-bg" />
                        </div>
                        <div className='details-profile'>
                            <div className="profile-photo">
                                <img src={`http://localhost:5505/${userDetails.profilePhoto}`} alt="profile-bg" />
                                <button className='profile-btn' onClick={() => setEditForm(false)}>Edit Profile</button>
                                <div><button className='profile-btn' onClick={() => navigate("/change-password")} >Change Password</button></div>
                            </div>
                            <div className='user-detail'>
                                <div className='user-details'><h2>Name: </h2><div><p>{userDetails.userName}</p></div></div>
                                <div className='user-details'> <h2>Email: </h2><div><p>{userDetails.email}</p></div></div>
                                <div className='user-details'> <h2>Country: </h2><div><p>{userDetails.country}</p></div></div>
                                <div className='user-details'> <h2>State: </h2><div><p>{userDetails.state}</p></div></div>
                                <div className='user-details'> <h2>Pincode: </h2><div><p>{userDetails.pincode}</p></div></div>
                            </div>
                            <div>
                                <div className='followers'>
                                    <div>
                                        <h2>{blog.length}</h2>
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
                                        {blog.map((item, index) => {
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
                    </div>
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
                                        // console.log(selectedFile,"wzexrgbjk")
                                        setProfilePic(selectedFile);
                                    } else {
                                        setProfilePic({});
                                    }
                                }} />
                            </div>
                            <div className='save'>
                                <button type="submit" className='save-btn' onClick={() => handleSave()}>Save</button>
                                <button type="submit" className='cancel-btn' onClick={() => handleCancel()}>Cancel</button>
                            </div>
                        </div>
                    </div>
            }
        </>

    )
}

export default Profile