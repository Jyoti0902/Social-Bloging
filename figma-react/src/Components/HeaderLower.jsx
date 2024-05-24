import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { filterPosts, getAllBlogs, searchByTitle } from '../Redux/actions/post';

const HeaderLower = () => {
  const [title, setTitle] = useState("");
  const [created_Date, setCreated_Date] = useState("");
  const [searchBy, setSearchBy] = useState("");
  //redux getblogs
  const dispatch = useDispatch();
  const allBlogs = useSelector((state) => state.Tasks);
  console.log(allBlogs, 'allbogs')
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
    <div className='container-HL'>
      <div className='left-HL'>
        <p className='filter headingall'>Filters</p>
        {/* <div className="createdby">
          <p>Created By</p>
          <select className='field1' value={title} onChange={(e) => setTitle(e.target.value === "All" ? "" : e.target.value)}>
            <option value="All">All</option>
            {
              allBlogs?.allpost?.map((item, index) =>
                <option key={index} value={item.title}>{item.title}</option>
              )
            }
          </select>
        </div> */}
        {/* <div className="published">
          <p>Published Date</p>
          <input className='field2' type='date' onChange={(e) => setCreated_Date(e.target.value)} />
        </div> */}
      </div>
      {/* <div className="right-HL">
        <p>Search</p>
        <input className='field3'
          placeholder='Search here'
          value={searchBy}
          onChange={(e) => { setSearchBy(e.target.value) }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchInput(searchBy);
            }
          }} />
        <FaSearch className='search' onClick={() => { dispatch(searchByTitleOnInput(searchBy)) }} />
        {searchBy.length ?
          <div className='suggestions'>
            {
              allBlogs?.search?.map((item, index) =>
                <>
                  <span style={{ color: "black" }} onClick={() => navigate(`/blogdetails/${item._id}`, {
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
      </div> */}
    </div >
  )
}

export default HeaderLower