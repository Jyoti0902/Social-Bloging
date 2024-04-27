import React, { useEffect, useState } from 'react'
import '../ComponentCSS/UpdateBlog.css';
import { useNavigate, useParams } from 'react-router-dom';
import { GetBlogById, Update } from '../APIs/endpoints';

const UpdateBlog = () => {
    const navigate = useNavigate();
    const [updateDetails, setUpdateDetails] = useState({
        title: "",
        description: "",
        image: ""
    })
    //get Data API
    const { id } = useParams();
    const getData = async () => {
        try {
            const res = await GetBlogById(id);
            setUpdateDetails({
                title: res.data.title,
                description: res.data.description,
                image: res.data.image
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
    const [errors, setErrors] = useState({});
    const handleUpdate = async () => {
        const error = {};
        if (!updateDetails.title.trim()) {
            error.title = "Title is required!";
        }
        if (!updateDetails.description.trim()) {
            error.description = "Description is required!";
        }
        else if (Object.keys(error).length === 0) {
            try {
                await Update(updateDetails, id);
                alert("Updated successfully!");
                navigate("/blog");
            } catch (err) {
                console.log(err);
            }
        }
        setErrors(error);
    }
    return (
        <>
            <div className='update-container'>
                <div className="update-content">
                    <h2 className='heading-update'>Update ❤️</h2>
                    <input type="text" placeholder='Title' value={updateDetails.title} onChange={(e) => setUpdateDetails({ ...updateDetails, title: e.target.value })} />
                    <br />{errors.title && <span>{errors.title}</span>}
                    <input type="text" placeholder='Description' value={updateDetails.description} onChange={(e) => setUpdateDetails({ ...updateDetails, description: e.target.value })} />
                    <br />{errors.description && <span>{errors.description}</span>}
                    <input type="file" onChange={(e) => handleFile(e)} />
                    <br />{errors.image && <span>{errors.image}</span>}
                    <button className='btn-main' onClick={() => handleUpdate()}>Update</button>
                </div>
            </div>
        </>

    )
}

export default UpdateBlog