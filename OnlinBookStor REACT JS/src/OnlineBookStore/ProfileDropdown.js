import React, { useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfileDropdown = () => {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const decodedToken = JSON.parse(atob(accessToken.split(".")[1])); // Decode the JWT token
                const userId = decodedToken.UserID;

                if (!userId) {
                    alert("UserID is missing. Please log in again.");
                    navigate("/"); // Redirect to login if UserID is missing
                    return;
                }

                // Fetch user details from the backend
                const response = await axios.get(`http://localhost:5165/api/Users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                // You can use the response data here if needed
                console.log("User Details:", response.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserDetails();
    }, [accessToken, navigate]);

    const handleLogout = () => {
        localStorage.removeItem("accessToken"); // Clear the access token
        localStorage.removeItem("userId"); // Clear the user ID
        navigate("/"); // Redirect to the root path where LoginAndSignUp is rendered
    };

    return (
        <Dropdown className="ms-3">
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                <i className="bi bi-person-circle"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu align="end">
                <Dropdown.Item onClick={() => navigate("/profile")}>My Profile</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/order-history")}>Order History</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ProfileDropdown;