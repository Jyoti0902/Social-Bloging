import React, { useState } from 'react';
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
  });
  const dispatch = useDispatch();

  // Validation
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
    } else if (Object.keys(error).length === 0) {
      try {
        const formData = new FormData();
        formData.append("title", blogDetails.title);
        formData.append("description", blogDetails.description);
        formData.append("image", blogDetails.image);
        dispatch(createBlog(formData));
        alert("Blog created successfully");
        navigate("/blog");
      } catch (err) {
        console.log(err);
      }
    }
    setErrors(error);
  };

  return (
    <div className="create-blog">
      <h1>Create Your Blog Here!</h1>
      <div className="blog-form">
        <div className="form-field">
          <label>Title</label>
          <input type='text' value={blogDetails.title} onChange={(e) => { setErrors({}); setBlogDetails({ ...blogDetails, title: e.target.value }) }} />
          {errors.title && <span>{errors.title}</span>}
        </div>
        <div className="form-field">
          <label>Description</label>
          <input type='text' value={blogDetails.description} onChange={(e) => { setErrors({}); setBlogDetails({ ...blogDetails, description: e.target.value }) }} />
          {errors.description && <span>{errors.description}</span>}
        </div>
        <div className="form-field">
          <label>Image</label>
          <input type="file" className='file' onChange={(e) => {
            setErrors({});
            if (e.target.files.length) {
              const selectedFile = e.target.files[0];
              setBlogDetails({ ...blogDetails, image: selectedFile });
            } else {
              setBlogDetails({ ...blogDetails, image: {} });
            }
          }} />
          {errors.image && <span>{errors.image}</span>}
        </div>
        <div>
          <button className='submit-btn' onClick={() => handleCreate()}>Create</button>
          <button className='cancel-btn' onClick={() => navigate("/blog")}>Cancel</button>
        </div>

      </div>
    </div>
  );
}

export default CreateBlog;
