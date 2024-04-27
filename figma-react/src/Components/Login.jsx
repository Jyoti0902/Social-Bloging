import React, { useState } from 'react'
import '../ComponentCSS/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
	const navigate = useNavigate();
	//login details
	const [logindetail, setLoginDetail] = useState({
		email: "",
		password: ""
	})
	//validation 
	const [errors, setErrors] = useState({});
	const handleError = async () => {
		const error = {};
		if (!logindetail.email.trim()) {
			error.email = "Email is required!";
		}
		if (!logindetail.password.trim()) {
			error.password = "Please enter password!";
		}
		else if (Object.keys(errors).length === 0) {
			const res = await axios.post("http://localhost:5505/auth/login", logindetail);
			if (res.data.token) {
				localStorage.setItem("token", res.data.token);
				localStorage.setItem("userId", res.data.userId);
				alert("Login successful!");
				navigate("/blog");
			}
		}
		setErrors(error);
	}
	return (
		<>
			<div className='main-login'>
				<div className="login-container">
					<div className="login-content">
						<h1>LOGIN</h1>
						<p className='login-para'>If you don't have an account,
							<a href='/signup'> Signup</a> here
						</p>
					</div>
					<div className="login-inputs">
						<input type="email" placeholder='Email' value={logindetail.email} onChange={(e) => { setErrors({}); setLoginDetail({ ...logindetail, email: e.target.value }) }} />
						{errors.email && <span>{errors.email}</span>}
						<input type="password" placeholder='Password' value={logindetail.password} onChange={(e) => { setErrors({}); setLoginDetail({ ...logindetail, password: e.target.value }) }} />
						{errors.password && <span>{errors.password}</span>}
					</div>
					<div className="login-btn">
						<button onClick={() => handleError()}>LOGIN</button>
					</div>
					<Link to={"/forgotpassword"} className='login-para' >Forgot Password</Link>
				</div>
			</div>
		</>
	)
}

export default Login
