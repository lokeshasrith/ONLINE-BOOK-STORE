import React, { useEffect, useState } from "react";
import { Container, Spinner, Button, Alert, Table } from "react-bootstrap"; // Import Table
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasOrders, setHasOrders] = useState(false); // Track if user has orders
    const accessToken = localStorage.getItem("accessToken");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const decodedToken = JSON.parse(atob(accessToken.split(".")[1])); // Decode the JWT token
                const userId = decodedToken.UserID;

                if (!userId) {
                    alert("UserID is missing. Please log in again.");
                    navigate("/");
                    return;
                }

                // Fetch orders for the logged-in user
                const ordersResponse = await axios.get(`http://localhost:5165/api/Orders?userId=${userId}`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });

                // If no orders are found, set hasOrders to false
                if (!ordersResponse.data || ordersResponse.data.length === 0) {
                    setHasOrders(false);
                    setLoading(false);
                    return;
                }

                // Fetch order details and book titles for each order
                const ordersWithDetails = await Promise.all(
                    ordersResponse.data.map(async (order) => {
                        const detailsResponse = await axios.get(`http://localhost:5165/api/OrderDetails?orderId=${order.orderId}`, {
                            headers: { Authorization: `Bearer ${accessToken}` },
                        });

                        const detailsWithTitles = await Promise.all(
                            detailsResponse.data.map(async (detail) => {
                                const bookResponse = await axios.get(`http://localhost:5165/api/Books/${detail.bookId}`, {
                                    headers: { Authorization: `Bearer ${accessToken}` },
                                });
                                return { ...detail, title: bookResponse.data.title };
                            })
                        );

                        return { ...order, details: detailsWithTitles };
                    })
                );

                setOrders(ordersWithDetails);
                setHasOrders(true); // User has orders
                setLoading(false);
            } catch (error) {
                console.error("Error fetching order history:", error);
                setLoading(false);
            }
        };

        fetchOrderHistory();
    }, [accessToken, navigate]);

    if (loading) {
        return (
            <Container className="mt-4 text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    // If user has no orders, show a message and redirect to home
    if (!hasOrders) {
        return (
            <Container className="mt-4 text-center">
                <Alert variant="info">
                    You have no order history. Start shopping now!
                </Alert>
                <Button variant="primary" onClick={() => navigate("/store")}>Go to Store</Button>
            </Container>
        );
    }

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Container className="mt-4" style={{ flex: 1, overflow: "auto", paddingBottom: "80px" }}>
                <h2 className="text-center">Order History</h2>

                {/* Scrollable Table Container */}
                <div style={{ maxHeight: "500px", overflowY: "auto", border: "1px solid #ddd" }}>
                    <Table striped bordered hover>
                        <thead style={{ position: "sticky", top: 0, backgroundColor: "white", zIndex: 1 }}>
                            <tr>
                                <th>Order ID</th>
                                <th>Order Date</th>
                                <th>Total Amount</th>
                                <th>Books</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.orderId}>
                                    <td>{order.orderId}</td>
                                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                    <td>₹{order.totalAmount.toFixed(2)}</td>
                                    <td>
                                        {order.details.map((detail, index) => (
                                            <div key={index}>{detail.title} (Qty: {detail.quantity})</div>
                                        ))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Container>

            {/* Fixed "Back to Home" Button */}
            <div style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "#fff",
                padding: "10px",
                boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                zIndex: 1000
            }}>
                <Button variant="primary" onClick={() => navigate("/store")}>Back to Home</Button>
            </div>
        </div>
    );
};

export default OrderHistory;