import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
import LoginAndSignUp from "./components/LoginAndSignUp";
import PageNotFound from "./components/PageNotFound";
import OnlineBookstore from "./OnlineBookStore/OnlineBookstore";
import CartPage from "./OnlineBookStore/CartPage";
import PaymentPage from "./OnlineBookStore/PaymentPage";
import OrderHistory from "./OnlineBookStore/OrderHistory";
import ProfilePage from "./OnlineBookStore/ProfilePage";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginAndSignUp />} />
                    <Route path="/store" element={<OnlineBookstore />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/payment" element={<PaymentPage />} />
                    <Route path="/order-history" element={<OrderHistory />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;