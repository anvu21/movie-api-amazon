import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
const Login = () => {

	const [data, setData] = useState({ username: "", name: "", password: "" });
	const [error, setError] = useState("");
	const [cookies] = useCookies([]);
	const navigate = useNavigate();
	useEffect(() => {
		const info=localStorage.getItem("jwt")

	  if (info) {
		navigate("/");
	  }
	}, []);


	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {

			const url = `https://movie-api-lehigh.herokuapp.com/_users/login`;
			const { data: res } = await axios.post(url, data,{
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Headers': '*',
					'Access-Control-Allow-Credentials': 'true'
				  }
				  
				},{withCredentials: true}
				  );
				  //,{withCredentials: true}
			console.log(res)
			if (res.status ===401){
				setError("Wrong username or password");

			} else{
			//localStorage.setItem("token", res._id);
			localStorage.setItem("jwt", res);
			//localStorage.setItem("likes_movie", res.likes_movie);

			window.location = "/";
			}
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input
							type="username"
							placeholder="username"
							name="username"
							onChange={handleChange}
							value={data.username}
							required
							className={styles.input}
						/>
						<input
							type="name"
							placeholder="name"
							name="name"
							onChange={handleChange}
							value={data.name}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign In
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
