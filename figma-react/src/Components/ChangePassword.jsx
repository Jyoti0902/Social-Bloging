import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { passwordChange } from '../Redux/actions/user';
import '../ComponentCSS/ChangePassword.css';

const ChangePassword = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newpassword, setNewPassword] = useState({
    oldPassword: "",
    newPassword: ""
  });

  const handleChangePassword = () => {
    dispatch(passwordChange({ newpassword, userId }));
    alert("Password is changed successfully!");
    navigate("/profile");
  };

  return (
    <div className="change-password">
      <h1>Change Your Password</h1>
      <div className="password-form">
        <div className="form-field">
          <label>Old Password</label>
          <input 
            type="password" 
            placeholder="Old password" 
            value={newpassword.oldPassword} 
            onChange={(e) => setNewPassword({ ...newpassword, oldPassword: e.target.value })} 
          />
        </div>
        <div className="form-field">
          <label>New Password</label>
          <input 
            type="password" 
            placeholder="New password" 
            value={newpassword.newPassword} 
            onChange={(e) => setNewPassword({ ...newpassword, newPassword: e.target.value })} 
          />
        </div>
        <div className="button-group">
          <button className='cancel-btn' onClick={() => handleChangePassword()}>Change Password</button>
          <button className='cancel-btn' onClick={() => navigate("/profile")}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
