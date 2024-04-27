import React, { useState } from 'react'
import { ChangePasswordAPI } from '../APIs/endpoints'
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();
    const [newpassword, setNewPassword] = useState({
        oldPassword: "",
        newPassword: ""
    })
    const handleChangePassword = async () => {
        try {
            await ChangePasswordAPI(newpassword, userId);
            alert("Password is changed successfully!");
            navigate("/profile");
        } catch (error) {
            console.log(error, "Change password error!")
        }
    }
    return (
        <>
            <div className='reset-container'>
                <div className="reset-page">
                    <h2>Change Password</h2>
                    <div action="#" method="post">
                        <input type="password" name="password" placeholder="Old password" value={newpassword.oldPassword} onChange={(e) => setNewPassword({ ...newpassword, oldPassword: e.target.value })} />
                        <input type="password" name="password" placeholder="New password" value={newpassword.newPassword} onChange={(e) => setNewPassword({ ...newpassword, newPassword: e.target.value })} />
                        <button type="submit" className='btn-main' onClick={() => handleChangePassword()}>Change Password</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePassword