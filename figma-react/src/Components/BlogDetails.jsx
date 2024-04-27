import React, { useEffect, useState } from 'react'
import blogimage from '../Assets/bg2.avif'
import { GetBlogById } from '../APIs/endpoints';
import { useParams } from 'react-router-dom';
import "../ComponentCSS/blogdetail.css"
const BlogDetails = () => {
    const [blogDetails, setBlogDetails] = useState({});
    const blogId = useParams();
    const getBlogDetails = async () => {
        try {
            const res = await GetBlogById(blogId.id);
            setBlogDetails(res.data);
            console.log(res.data, "blogdetails")
        } catch (error) {

        }
    }
    useEffect(() => {
        getBlogDetails();
    }, [])
    return (
        <>
        <div className='blog-div-heading'>
            BlogDetails
        </div>
            <div className='blogdetail-main-container'>
                <div className='blog-div-main-image'>
                    <img className='blog-main-image' src={`http://localhost:5505/${blogDetails.image}`} alt="blog-image" />
                </div>
                <div className='blogdetail-page-main-div'>
                    <div className='blog-div-title'>
                        {blogDetails.title}
                    </div>
                    <div className='blog-div-description'>
                        {blogDetails.description}
                    </div>
                    <div className='blog-div-about'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae rerum doloremque quas delectus exercitationem illo, at iusto soluta. Ratione, debitis nostrum! Labore aspernatur nulla perspiciatis placeat ratione esse alias laudantium.
                        Repellat eaque aspernatur nobis quo voluptates ducimus. Laborum saepe iste illum labore error sequi nemo est molestiae laudantium voluptatum, eius ea cumque quisquam commodi velit beatae aut omnis eos id!
                        Molestiae et corrupti commodi asperiores nihil est inventore aspernatur culpa, modi itaque, aliquam delectus ratione cum, facilis id! Ullam sint voluptate in, voluptatibus id iusto modi doloribus asperiores? Ipsa, ipsum!
                        Ullam nam rerum repellat, esse, magnam necessitatibus minus, nostrum facilis excepturi eum sapiente reprehenderit explicabo doloribus atque. Enim facilis porro, saepe ipsam placeat reiciendis aspernatur rem aliquid voluptas tempora culpa.
                        Rem sint odio earum culpa iste impedit harum unde vero sunt suscipit mollitia dolore exercitationem tempora ad, quasi voluptates! Ab facilis unde vero facere pariatur nobis consectetur, dolorum debitis porro.</div>
                </div>

            </div>



        </>
    )
}

export default BlogDetails