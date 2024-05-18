import React, { useState } from 'react'
import '../ComponentCSS/ResetPassword.css'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { passwordReset } from '../Redux/actions/auth';



const ResetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getEmail = useParams();
    const [resetDetails, setresetDetails] = useState({
        email: getEmail.email,
        newPassword: ""
    })

    const handleResetButton = async () => {
        dispatch(passwordReset(resetDetails));
        alert("Reset password successfully!");
        navigate("/");
    }
    return (
        <>
            <div className='reset-container'>
                <div className="reset-page">
                    <h2>Password Reset</h2>
                    <div action="#" method="post">
                        {/* <input type="email" name="email" placeholder="Enter your email" value={resetDetails.email} onChange={(e) => setresetDetails({ ...resetDetails, email: e.target.value })} required /> */}
                        <input type="password" name="password" placeholder="Enter new password" value={resetDetails.newPassword} onChange={(e) => setresetDetails({ ...resetDetails, newPassword: e.target.value })} required />
                        {/* <input type="password" name="confirm_password" placeholder="Confirm new password" required /> */}
                        <button type="submit" className='btn-main' onClick={() => handleResetButton()}>Reset Password</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword