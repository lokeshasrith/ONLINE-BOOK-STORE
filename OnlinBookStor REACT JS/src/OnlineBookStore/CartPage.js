import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, clearCart } from '../redux/cartSlice';
import { useNavigate } from "react-router-dom";
import { Container, Card, Button, Row, Col, Image } from "react-bootstrap";

const CartPage = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart || []); // Fallback to an empty array if undefined
    const navigate = useNavigate();

    const handleUpdateQuantity = (bookId, change) => {
        dispatch(updateQuantity({ bookId, change }));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    // Calculate subtotal (combined price of all items in the cart)
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <Container className="mt-4" style={{ paddingBottom: "160px" }}>
            <h2 className="text-center">🛒 Shopping Cart</h2>
            {cart.length === 0 ? (
                <div className="text-center">
                    <p>Your cart is empty.</p>
                    <Button variant="primary" onClick={() => navigate("/store")}>🏠 Back to Home</Button>
                </div>
            ) : (
                <>
                    {cart.map((item) => (
                        <Card key={item.bookId} className="mb-3 p-3 shadow-sm">
                            <Row className="align-items-center">
                                <Col xs={2}>
                                    <Image
                                        src={`/images/${item.coverImageName}`}
                                        alt={item.title}
                                        style={{ width: "80px", height: "100px", objectFit: "contain" }}
                                    />
                                </Col>
                                <Col>
                                    <h5>{item.title}</h5>
                                    <p><strong>Price:</strong> ₹{item.price.toFixed(2)}</p>
                                    <p><strong>Quantity:</strong> {item.quantity}</p>
                                    <p><strong>Total:</strong> ₹{(item.price * item.quantity).toFixed(2)}</p>
                                </Col>
                                <Col xs="auto" className="d-flex align-items-center">
                                    <Button variant="outline-secondary" onClick={() => handleUpdateQuantity(item.bookId, -1)}>-</Button>
                                    <span className="mx-2 d-flex align-items-center">{item.quantity}</span>
                                    <Button variant="outline-secondary" onClick={() => handleUpdateQuantity(item.bookId, 1)}>+</Button>
                                </Col>
                            </Row>
                        </Card>
                    ))}
                </>
            )}

            {/* Subtotal and Buttons */}
            {cart.length > 0 && (
                <div className="w-100 position-fixed bottom-0 start-0 end-0 bg-white border-top shadow">
                    {/* Subtotal Section */}
                    <div className="text-center p-3 bg-light">
                        <h4><strong>Subtotal:</strong> ₹{subtotal.toFixed(2)}</h4>
                    </div>
                    {/* Buttons */}
                    <div className="d-flex justify-content-center gap-3 p-3">
                        <Button variant="danger" onClick={handleClearCart}>🗑 Clear Cart</Button>
                        <Button variant="primary" onClick={() => navigate("/store")}>🏠 Back to Home</Button>
                        <Button variant="success" onClick={() => navigate("/payment", { state: { cart, grandTotal: subtotal } })}>💳 Proceed to Payment</Button>
                    </div>
                </div>
            )}
        </Container>
    );
};

export default CartPage;