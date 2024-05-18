import React, { useState } from 'react'
import '../ComponentCSS/Forgot.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ForgotPasswordEmail } from '../Redux/actions/auth';

const Forgot = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [emailSent, setEmailSent] = useState({
        email: ""
    })
    const [errors, setErrors] = useState({});
    const handleSentEmail = async () => {
        const error = {};
        if (!emailSent.email.trim()) {
            error.email = "Please enter a valid email!";
        }
        else if (Object.keys(error).length === 0) {
            dispatch(ForgotPasswordEmail(emailSent));
            alert("Link to reset password has been sent to your email!");
            navigate("/");
        }
        setErrors(error);
    }

    return (
        <>
            <div className='forgot-container'>
                <div className="forgot-page">
                    <h2>Forgot Password</h2>
                    <div method="post" id="forgotPasswordForm">
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" value={emailSent.email} onChange={(e) => setEmailSent({ ...emailSent, email: e.target.value })} />
                        <br />
                        {errors.email && <span>{errors.email}</span>} <br />
                        <button type="submit" className='btn-main' onClick={() => handleSentEmail()}>Send link</button>
                        <div className="error-message" id="errorMessage"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Forgot