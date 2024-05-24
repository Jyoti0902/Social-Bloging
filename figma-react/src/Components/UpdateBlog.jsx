import React, { useEffect, useState } from 'react';
import '../ComponentCSS/CreateBlog.css'; // Reuse the same CSS for consistency
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getByIdBlog, updateBlog } from '../Redux/actions/post';

const UpdateBlog = () => {
  const navigate = useNavigate();
  const [updateDetails, setUpdateDetails] = useState({
    title: "",
    description: "",
    image: ""
  });
  const dispatch = useDispatch();
  const { getOne } = useSelector((state) => state.Tasks);

  const { id } = useParams();

  const getData = () => {
    dispatch(getByIdBlog(id));
  };

  useEffect(() => {
    getData();
  }, [id]);

  useEffect(()=>{
    setUpdateDetails({
      title: getOne.title,
      description: getOne.description,
      image: getOne.image
    });
  },[getOne])
  const handleFile = (e) => {
    const file = e.target.files[0];
    setUpdateDetails({ ...updateDetails, image: file });
  };

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("title", updateDetails.title);
    formData.append("description", updateDetails.description);
    formData.append("image", updateDetails.image);
    dispatch(updateBlog({ formData, id }));
    alert("Updated successfully!");
    navigate("/blog");
  };

  return (
    <div className="create-blog">
      <h1>Update Your Blog!</h1>
      <div className="blog-form">
        <div className="form-field">
          <label>Title</label>
          <input type="text" value={updateDetails.title} onChange={(e) => setUpdateDetails({ ...updateDetails, title: e.target.value })} />
        </div>
        <div className="form-field">
          <label>Description</label>
          <input type="text" value={updateDetails.description} onChange={(e) => setUpdateDetails({ ...updateDetails, description: e.target.value })} />
        </div>
        <div className="form-field">
          <label>Image</label>
          <input type="file" onChange={(e) => handleFile(e)} />
        </div>
        <button className="submit-btn" onClick={handleUpdate}>Update</button>
        <button className='profile-btn' onClick={() => navigate("/blog")}>Back</button>
      </div>
    </div>
  );
};

export default UpdateBlog;
