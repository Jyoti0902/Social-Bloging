import React from 'react';
import '../ComponentCSS/About.css'
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate()
    return (
        <div className='about-container'>
            <div className='about-content'>
                <h1>Welcome to BlogNest</h1>
                <p>Blognest is a platform for sharing your thoughts, experiences, and stories with the world. Whether you're a seasoned writer or just starting, Blognest provides you with the tools to create and share your blogs effortlessly.</p>
                <p>At Blognest, we believe that every blog is a nest of ideas waiting to hatch, grow, and take flight. Your words have the power to inspire, educate, and connect people from all walks of life.</p>
                <p>Blognest is not just a platform; it's a community where bloggers come together to support, learn, and grow together. Join us in this journey of self-expression and exploration.</p>
                <h2>What does "BlogNest" mean?</h2>
                <p>Blognest is a combination of "blog" and "nest." A blog is a personal website or web page where an individual or a group of individuals share their opinions, experiences, or expertise on various topics. A nest represents a safe and nurturing environment where ideas are incubated, nurtured, and eventually shared with the world. Together, "Blognest" symbolizes a platform where bloggers can comfortably create, nurture, and share their ideas.</p>
                <div className='btn-container'>
                    <button className='all-btn' onClick={() => navigate("/blog")}>Back to Home</button>
                </div>
            </div>
        </div>
    );
}

export default About;
