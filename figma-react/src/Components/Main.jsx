import React from 'react'
import '../ComponentCSS/Main.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Post from './Post';
import bg1 from '../Assets/bg1.avif'
import bg2 from '../Assets/bg2.avif'
import bg3 from '../Assets/bg3.avif'
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../Redux/actions/post';
import { FiLogOut } from "react-icons/fi";

const Main = () => {
  const navigate = useNavigate();
  const [render, setRender] = useState(false);
  //redux getblogs
  const allPost = useSelector((state) => state.Tasks)
  const dispatch = useDispatch();
  // logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  }
  // get blog API
  useEffect(() => {
    dispatch(getAllBlogs());
  }, [render]);

  return (
    <>
      <div className='main-container'>
        <div className='main-imgs'>
          <div>
            <img src={bg1} alt="bg1" className='main-img' />
          </div>
          <div id='main-img'>
            <img src={bg2} alt="bg2" className='main-img' />
            <h1 className='main-heading'>My Life. My Blogs.</h1>
          </div>
          <div>
            <img src={bg3} alt="bg3" className='main-img' />
          </div>
        </div>
        <div className="left-container">
          <div className="main">
            {
              allPost?.task.length ? allPost.task.slice(0,5).map((post, id) => {
                return (
                  <>
                    <Post
                      post={post}
                      render={render}
                      setRender={setRender}
                    />
                  </>
                )

              }) : <h2 className='blog-message'>No blogs to show</h2>
            }

          </div>
          <div className="create-new-container">
            <div className="create-new">
              <h1>Let the posts
                come to you.</h1>
              <div className='main-content'>
                <div className='btns-main'>
                  <button className="create-btn" onClick={() => navigate("/create")}>Create New</button>
                </div>
              </div>
            </div>
            <div className="glimpse">
              <h2>Find me on Instagram</h2>
              <div className="blog-photos">
                {
                  allPost.task.map((post, id) => {
                    return (
                      <>
                        <Link to={`http://localhost:5505/${post.image}`}>
                          <img className="blog-photo" src={`http://localhost:5505/${post.image}`} alt="blogs" />
                        </Link>
                      </>
                    )

                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default Main