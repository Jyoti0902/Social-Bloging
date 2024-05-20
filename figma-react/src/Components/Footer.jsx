import React from 'react';
import '../ComponentCSS/Footer.css';
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="upperfooter">
          <div className="part1">
            <h1 className="font3">Blog<span className="span-tag">Nest</span></h1>
            <p className="blog-para">
              BlogNest is a platform for sharing your thoughts,<br /> experiences, and stories with the world. 
              Whether <br /> you're a seasoned writer or just starting, BlogNest provides <br />you with the tools to create and share your blogs effortlessly.
            </p>
          </div>
          <div className="part2">
            <h1 className="font4">CATEGORIES</h1>
            <ul>
              <li>Technology</li>
              <li>Life Experiences</li>
              <li>Travel</li>
              <li>Food</li>
              <li>Personal Growth</li>
            </ul>
          </div>
          <div className="part3">
            <h1 className="font4">GET IN TOUCH</h1>
            <ul>
              <li>+1-234-567-890</li>
              <li>support@blognest.com</li>
            </ul>
          </div>
          <div className="part4">
            <h1 className="font4">FOLLOW US</h1>
            <FaTwitter className='social' />
            <FaInstagram className='social' />
            <FaLinkedin className='social' />
          </div>
        </div>
        <div className="lowerfooter">
          <p>© 2023 BlogNest</p>
          <p>MADE WITH <span className='heart'>❤️</span> BY BLOGNEST TEAM</p>
        </div>
      </div>
    </>
  );
}

export default Footer;
