import React, { useEffect, useState } from 'react'
import '../ComponentCSS/HeaderLower.css';
import { FaSearch } from "react-icons/fa";
import { Filter, GetBlogs, SearchByTitle } from '../APIs/endpoints';
import { useNavigate } from 'react-router-dom';


const HeaderLower = ({ setAllPosts }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [created_Date, setCreated_Date] = useState("");
  const [allBlogs, setAllBlogs] = useState([]);
  const [searchBy, setSearchBy] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  //fetch posts
  const fetchPosts = async () => {
    try {
      const res = await GetBlogs();
      if (res.data) {
        setAllBlogs(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  //handle search input
  const handleSearchInput = async () => {
    try {
      const res = await SearchByTitle(searchBy);
      setSuggestions(res.data);

    } catch (error) {
      console.log(error, "search input error!")
    }
  }
  const handleCreated_Date = (date) => {
    setCreated_Date(date);
  }
  const handleFilter = async () => {
    try {
      const res = await Filter(title, created_Date);
      setAllPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchPosts();
  }, []);
  useEffect(() => {
    handleFilter();
  }, [title, created_Date]);
  // useEffect(() => {
  //   handleSearchInput();
  // }, [searchBy]);
  return (
    <div className='container-HL'>
      <div className='left-HL'>
        <p className='filter headingall'>Filters</p>
        <div className="createdby">
          <p>Created By</p>
          <select className='field1' value={title} onChange={(e) => setTitle(e.target.value === "All" ? "" : e.target.value)}>
            <option value="All">All</option>
            {
              allBlogs.map((item, index) =>
                <option key={index} value={item.title}>{item.title}</option>
              )
            }
          </select>
        </div>
        <div className="published">
          <p>Published Date</p>
          <input className='field2' type='date' onChange={(e) => handleCreated_Date(e.target.value)} />
        </div>
      </div>
      <div className="right-HL">
        <p>Search</p>
        <input className='field3' placeholder='Search here' value={searchBy} onChange={(e) => { setSearchBy(e.target.value); handleSearchInput() }} />
        <FaSearch className='search' onClick={() => { handleSearchInput(); setAllPosts(suggestions); setSearchBy("") }} />
        {searchBy.length ?
          <div className='suggestions'>
            {
              suggestions.map((item, index) =>
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
      </div>
    </div >
  )
}

export default HeaderLower