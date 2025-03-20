import React, { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const accessToken = localStorage.getItem("accessToken");
    const navigate = useNavigate();

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

                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserDetails();
    }, [accessToken, navigate]);

    if (!user) {
        return (
            <Container className="mt-4 text-center">
                <p>Loading user details...</p>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <h2 className="text-center">My Profile</h2>
            <Card className="p-4">
                <Card.Body>
                    <Card.Title>{user.firstName} {user.lastName}</Card.Title>
                    <Card.Text>
                        <strong>Email:</strong> {user.email}
                    </Card.Text>
                    <Card.Text>
                        <strong>Cell Number:</strong> {user.cellNumber || "Not provided"}
                    </Card.Text>
                </Card.Body>
            </Card>
            <div className="text-center mt-4">
                <Button variant="primary" onClick={() => navigate("/store")}>Back to Home</Button>
            </div>
        </Container>
    );
};

export default ProfilePage;