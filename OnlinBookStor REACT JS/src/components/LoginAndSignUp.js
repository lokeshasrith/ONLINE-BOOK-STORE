import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock, faPhone } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import "./LoginAndSignUp.css";

// login page
const LoginAndSignUp = () => {
    const [isSignup, setIsSignup] = useState(false);
    const navigate = useNavigate(); // allows navigation

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        cellNumber: "",
    });

    const { firstName, lastName, email, password, cellNumber } = formData;  // to use variables directly

    // handle changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5165/api/JWTProtal/PostLoginDetails", {
                email,
                password,
            });

            if (response.data.accessToken) {
                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem("userId", response.data.userId);
                alert("Login successful!");
                navigate("/store");
            } else {
                alert("Invalid email or password.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed. Please try again.");
        }
    };

    // signup page
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const newUser = {
                firstName,
                lastName,
                email,
                password,
                cellNumber,
            };

            const response = await axios.post("http://localhost:5165/api/Users", newUser);

            if (response.status === 201) {
                alert("Signup successful!"); // Switch back to login form
                setIsSignup(false);
            } else {
                alert("Signup failed. Please try again.");
            }
        } catch (error) {
            console.error("Signup error:", error);
            alert("Signup failed. Please try again.");
        }
    };

    return (
        // UI Rendering
        <div className="login-signup-container">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className="welcome-message"
            >
                <h1>
                    <Typewriter words={["WELCOME,"]} loop={1} typeSpeed={100} />
                </h1>
                <h2>
                    <Typewriter words={["TO THE ONLINE BOOK STORE"]} loop={1} typeSpeed={100} delaySpeed={1000} />
                </h2>
            </motion.div>

            {isSignup ? (
                <div className="signup">
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSignup}>
                        <div className="input-container">
                            <FontAwesomeIcon icon={faUser} className="input-icon" />
                            <input type="text" name="firstName" placeholder="First Name" required value={firstName} onChange={handleChange} />
                        </div>
                        <div className="input-container">
                            <FontAwesomeIcon icon={faUser} className="input-icon" />
                            <input type="text" name="lastName" placeholder="Last Name" required value={lastName} onChange={handleChange} />
                        </div>
                        <div className="input-container">
                            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                            <input type="email" name="email" placeholder="Email" required value={email} onChange={handleChange} />
                        </div>
                        <div className="input-container">
                            <FontAwesomeIcon icon={faPhone} className="input-icon" />
                            <input type="text" name="cellNumber" placeholder="Cell Number" required value={cellNumber} onChange={handleChange} />
                        </div>
                        <div className="input-container">
                            <FontAwesomeIcon icon={faLock} className="input-icon" />
                            <input type="password" name="password" placeholder="Password" required value={password} onChange={handleChange} />
                        </div>
                        <button type="submit">Sign Up</button>
                    </form>
                    <p>
                        Already have an account? <span onClick={() => setIsSignup(false)} className="toggle-link">Login</span>
                    </p>
                </div>
            ) : (
                <div className="login">
                    <h2>Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="input-container">
                            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                            <input type="email" name="email" placeholder="Enter Email" required value={email} onChange={handleChange} />
                        </div>
                        <div className="input-container">
                            <FontAwesomeIcon icon={faLock} className="input-icon" />
                            <input type="password" name="password" placeholder="Password" required value={password} onChange={handleChange} />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                    <p>
                        Don't have an account? <span onClick={() => setIsSignup(true)} className="toggle-link">Sign Up</span>
                    </p>
                </div>
            )}
        </div>
    );
};

export default LoginAndSignUp;