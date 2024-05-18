import React, { useState } from 'react'
import '../ComponentCSS/CreateBlog.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createBlog } from '../Redux/actions/post';

const CreateBlog = () => {
  const navigate = useNavigate();
  const [blogDetails, setBlogDetails] = useState({
    title: "",
    description: "",
    image: "",
  })
  const dispatch = useDispatch();
  //validation
  const [errors, setErrors] = useState({});
  const handleCreate = async () => {
    const error = {};
    if (!blogDetails.title.trim()) {
      error.title = "Please enter title for your blog!";
    }
    if (!blogDetails.description.trim()) {
      error.description = "Please enter description!";
    }
    if (!blogDetails.image) {
      error.image = "Please select image!";
    }
    else if (Object.keys(error).length === 0) {
      try {
        const formData = new FormData();
        formData.append("title", blogDetails.title);
        formData.append("description", blogDetails.description);
        formData.append("image", blogDetails.image);
        dispatch(createBlog(formData));
        alert("Blog created successfully");
        navigate("/blog");
      } catch (err) {
        console.log(err)
      }
    }
    setErrors(error);
  }
  return (
    <>
      <div className="main-bloghead">
        <h1 className='blog-heading'>BLOG POSTS</h1>
        <div className="blog-container">
          <h2>New Blog ❤️</h2>
          <div className="details-blogs">
            <input type='text' placeholder='Title' value={blogDetails.title} onChange={(e) => { setErrors({}); setBlogDetails({ ...blogDetails, title: e.target.value }) }} />
            <br />{errors.title && <span>{errors.title}</span>}
            <input type='text' placeholder='Description' value={blogDetails.description} onChange={(e) => { setErrors({}); setBlogDetails({ ...blogDetails, description: e.target.value }) }} />
            <br />{errors.description && <span>{errors.description}</span>}
            <input type="file" className='file' onChange={(e) => {
              setErrors({});
              if (e.target.files.length) {
                const selectedFile = e.target.files[0];
                setBlogDetails({ ...blogDetails, image: selectedFile });
              } else {
                setBlogDetails({ ...blogDetails, image: {} });
              }
            }} />
            <br />{errors.image && <span>{errors.image}</span>}<br />
            <button className='btn-main' onClick={() => handleCreate()}>Create</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateBlog