import React from 'react'
import { useSelector } from 'react-redux'
import Post from './Post'
import '../ComponentCSS/Allposts.css'

const AllPosts = () => {
  const allPost = useSelector((state) => state.Tasks)
  return (
    <>
      <div className='all-blogs'>
        <div className="allblogs">
          {
            allPost?.task.length ? allPost.task.map((post, id) => {
              return (
                <>
                  <Post
                    post={post}
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

export default AllPosts