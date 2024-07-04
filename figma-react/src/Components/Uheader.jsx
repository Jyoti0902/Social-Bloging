import React, { useEffect, useState } from 'react'
import '../ComponentCSS/Uheader.css'
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { filterPosts, getAllBlogs, searchByTitle, searchByTitleOnInput } from '../Redux/actions/post';

const Uheader = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const allBlogs = useSelector((state) => state.Tasks);
    const [searchBy, setSearchBy] = useState("");
    const [title, setTitle] = useState("");
    const [created_Date, setCreated_Date] = useState("");
    //handle search input
    const handleSearchInput = (title) => {
        dispatch(searchByTitle(title))
    }
    useEffect(() => {
        dispatch(getAllBlogs());
    }, []);
    useEffect(() => {
        dispatch(filterPosts({ title, created_Date }));
    }, [title, created_Date]);
    useEffect(() => {
        handleSearchInput(searchBy);
    }, [searchBy]);
    return (
        <>
            <div className="Uheader">
                <div className="U-left">
                    <FaSearch className='search-icon' onClick={() => { dispatch(searchByTitleOnInput(searchBy)) }} />
                    <div> <input className='search-field'
                        placeholder='Search...'
                        value={searchBy}
                        onChange={(e) => { setSearchBy(e.target.value) }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearchInput(searchBy);
                            }
                        }} />
                        {searchBy?.length ?
                            <div className='suggestion'>
                                {
                                    allBlogs?.search?.map((item, index) =>
                                        <>
                                            <span style={{ color: 'white' }} onClick={() => navigate(`/blogdetails/${item._id}`, {
                                                state: {
                                                    id: item._id
                                                }
                                            })}>
                                                {item.title}
                                            </span><br />
                                        </>
                                    )
                                }
                            </div> : null}
                    </div>
                </div>
                <div className="U-right">
                    <div className="createdby">
                        <p>Created By</p>
                        <select className='field1' value={title} onChange={(e) => setTitle(e.target.value === "All" ? "" : e.target.value)}>
                            <option value="All">All</option>
                            {
                                allBlogs?.allpost?.map((item, index) =>
                                    <option key={index} value={item.title}>{item.title}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="published">
                        <p>Published Date</p>
                        <input className='field2' type='date' onChange={(e) => setCreated_Date(e.target.value)} />
                    </div>
                </div>
            </div >
        </>
    )
}

export default Uheader