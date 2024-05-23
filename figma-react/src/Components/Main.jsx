import React from 'react'
import '../ComponentCSS/Main.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Post from './Post';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../Redux/actions/post';
import Uheader from './Uheader';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Main = () => {
  const navigate = useNavigate();
  const [render, setRender] = useState(false);
  //redux getblogs
  const allPost = useSelector((state) => state.Tasks)
  const dispatch = useDispatch();
  // get blog API
  useEffect(() => {
    dispatch(getAllBlogs());
  }, [render]);

  return (
    <>
      <Uheader />
      <div className='main-container'>
        <div className="left-container">
          <div className="main">
            {
              allPost?.task.length ? allPost?.task.slice(0, 3).map((post, id) => {
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
            <div>
              <button className="all-btn" onClick={() => navigate("/allposts")}>All Posts</button>
            </div>
          </div>
          <div className="create-new-container">
            <div className="create-new">
              <h1>"Every blog is a journey waiting to be shared. Start yours today and let your words illuminate the path for others."</h1>
              <div className='main-content'>
                <div className='btns-main'>
                  <button className="create-btn" onClick={() => navigate("/create")}>Create Blog</button>
                </div>
              </div>
            </div>
            <div className="glimpse">
              <h2>Share Your Experience</h2>
              <div className="blog-photos">
                {
                  allPost?.allpost.slice(0, 6).map((post, id) => {
                    return (
                      <>
                        <Link to={`https://social-bloging-b.onrender.com/${post.image}`}>
                          <img className="blog-pics" src={`https://social-bloging-b.onrender.com/${post.image}`} alt="blogs" />
                        </Link>
                      </>
                    )

                  })
                }
              </div>
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <FaTwitter className='social-icon' />
                <FaInstagram className='social-icon' />
                <FaLinkedin className='social-icon' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default Main