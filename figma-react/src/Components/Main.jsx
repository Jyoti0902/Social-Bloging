// import React from 'react'
// import '../ComponentCSS/Main.css';
// import { useNavigate } from 'react-router-dom';
// import Post from './Post';

// const Main = () => {
//   const navigate = useNavigate();
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   }
//   return (
//     <div className='main-container'>
//       <div className='main-content'>
//         <h1 className='blog-heading'>BLOG POSTS</h1>
//         <div className='btns-main'>
//           <button className="btn-main" onClick={() => navigate("/create")}>Create New</button>
//           <button className='btn-main' onClick={() => handleLogout()}>Logout</button>
//         </div>
//       </div>
//       <div className="main">
//         <Post/>
//       </div>
//     </div>
//   )
// }

// export default Main

import React from 'react'
import '../ComponentCSS/Main.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { GetBlogs } from '../APIs/endpoints';
import Post from './Post';
import HeaderLower from './HeaderLower';

const Main = () => {
  const navigate = useNavigate();
  const [render, setRender] = useState(false);
  // logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  }
  // get blog API
  const [allPosts, setAllPosts] = useState([]);
  const fetchPosts = async () => {
    try {
      const res = await GetBlogs();
      if (res.data) {
        setAllPosts(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchPosts();
  }, [render]);
  return (
    <>
      <HeaderLower allPosts={allPosts} setAllPosts={setAllPosts} />
      <div className='main-container'>
        <div className='main-content'>
          <h1 className='blog-heading'>BLOG POSTS</h1>
          <div className='btns-main'>
            <button className="btn-main" onClick={() => navigate("/create")}>Create New</button>
            <button className='btn-main' onClick={() => handleLogout()}>Logout</button>
          </div>
        </div>
        <div className="main">
          {
            allPosts?.length ? allPosts.map((post, id) => {
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
      </div>
    </>

  )
}

export default Main