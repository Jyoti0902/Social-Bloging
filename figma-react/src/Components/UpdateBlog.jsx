import React, { useEffect, useState } from 'react'
import '../ComponentCSS/UpdateBlog.css';
import { useNavigate, useParams } from 'react-router-dom';
// import { GetBlogById } from '../APIs/endpoints';
import { useDispatch, useSelector } from 'react-redux';
import { getByIdBlog, updateBlog } from '../Redux/actions/post';

const UpdateBlog = () => {
    const navigate = useNavigate();
    const [updateDetails, setUpdateDetails] = useState({
        title: "",
        description: "",
        image: ""
    })
    const dispatch = useDispatch();
    const { getOne } = useSelector((state) => state.Tasks)
    console.log(getOne)
    //get Data API
    const { id } = useParams();
    const getData = async () => {
        try {
            const res = dispatch(getByIdBlog(id))
            console.log(res)
            setUpdateDetails({
                title: getOne.title,
                description: getOne.description,
                image: getOne.image
            })
        } catch (err) {
            console.log(err)
        }

    }
    useEffect(() => {
        getData();
    }, [id])

    const handleFile = (e) => {
        const file = e.target.files[0];
        setUpdateDetails({ ...updateDetails, image: file });
    };
    const handleUpdate = async () => {
        try {
            const formData = new FormData()
            formData.append("title", updateDetails.title)
            formData.append("description", updateDetails.description)
            formData.append("image", updateDetails.image)
            dispatch(updateBlog({ formData, id }))
            alert("Updated successfully!");
            navigate("/blog");
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <div className='update-container'>
                <div className="update-content">
                    <h2 className='heading-update'>Update ❤️</h2>
                    <input type="text" placeholder='Title' value={updateDetails.title} onChange={(e) => setUpdateDetails({ ...updateDetails, title: e.target.value })} />
                    <br />
                    <input type="text" placeholder='Description' value={updateDetails.description} onChange={(e) => setUpdateDetails({ ...updateDetails, description: e.target.value })} />
                    <br />
                    <input type="file" onChange={(e) => handleFile(e)} />
                    <br />
                    <button className='btn-main' onClick={() => handleUpdate()}>Update</button>
                </div>
            </div>
        </>

    )
}

export default UpdateBlog