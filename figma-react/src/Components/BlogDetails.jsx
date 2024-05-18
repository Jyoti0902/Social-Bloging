import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import "../ComponentCSS/blogdetail.css"
import { useDispatch, useSelector } from 'react-redux';
import { deleteComments, doComments, getByIdBlog } from '../Redux/actions/post';
import { MdDelete } from 'react-icons/md';

const BlogDetails = () => {
    const navigate = useNavigate()
    const bId = useParams();
    const blogId = bId.id;
    const id = bId.id
    const dispatch = useDispatch();
    const { getOne } = useSelector((state) => state.Tasks)
    //comments
    const [comments, setComment] = useState({
        comments: ''
    });
    //post comment
    const postComment = () => {
        dispatch(doComments({ comments, id }))
        alert("Comment successfully!")
        dispatch(getByIdBlog(blogId))
        setComment({
            comments: ""
        })
    }
    //delete comments
    const handleDeleteCommment = (id, commentId) => {
        dispatch(deleteComments({ id, commentId }));
        alert("Comment deleted successfully!")
        dispatch(getByIdBlog(blogId))
    }
    useEffect(() => {
        dispatch(getByIdBlog(blogId))
    }, [blogId])
    return (
        <><div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div className='blog-div-heading'>
                BlogDetails
            </div>
            <button type="submit" className="btn-main blogd-btn" onClick={() => navigate("/blog")}>Back</button>
        </div>
            <div className='blog-details'>
                <div className='blogdetail-main-container'>
                    <div className='blog-div-main-image'>
                        <img className='blog-main-image' src={`http://localhost:5505/${getOne.image}`} alt="blog" />
                    </div>
                    <div className='blogdetail-page-main-div'>
                        <div className='blog-div-title'>
                            {getOne.title}
                        </div>
                        <div className='blog-div-description'>
                            {getOne.description}
                        </div>
                        <div className='blog-div-about'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae rerum doloremque quas delectus exercitationem illo, at iusto soluta. Ratione, debitis nostrum! Labore aspernatur nulla perspiciatis placeat ratione esse alias laudantium.
                            Repellat eaque aspernatur nobis quo voluptates ducimus. Laborum saepe iste illum labore error sequi nemo est molestiae laudantium voluptatum, eius ea cumque quisquam commodi velit beatae aut omnis eos id!
                            Molestiae et corrupti commodi asperiores nihil est inventore aspernatur culpa, modi itaque, aliquam delectus ratione cum, facilis id! Ullam sint voluptate in, voluptatibus id iusto modi doloribus asperiores?</div>
                    </div>

                </div>
                <div class="chat-card">
                    <div class="chat-header">
                        <div class="h2">Comments</div>
                    </div>
                    <div class="chat-body">
                        {getOne.postComments ?
                            getOne?.postComments?.slice(0, 5).map((item, index) => {
                                return (
                                    <div class="message incoming">
                                        <p>{item.comments}</p>
                                        <MdDelete onClick={() => handleDeleteCommment(getOne._id, item._id)} />
                                    </div>
                                )
                            }) : <div class="message incoming">
                                <p>Write your comment here!</p>
                            </div>
                        }
                        {!getOne?.postComments?.length && <div className='message incoming'>No comments</div>}
                    </div>
                    <div class="chat-footer">
                        <input placeholder="Type your message" type="text" value={comments.comments} onChange={(e) => setComment({ ...comments, comments: e.target.value })} />
                        <button style={{ backgroundColor: '#49274a' }} onClick={() => postComment()}>Send</button>
                    </div>
                </div>


            </div>


        </>
    )
}

export default BlogDetails