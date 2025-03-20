import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import "bootstrap/dist/css/bootstrap.min.css";
import "./OnlineBookstore.css";
import axios from "axios";
import AddToCart from "./AddToCart";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import { Dropdown } from "react-bootstrap";

const OnlineBookstore = () => {
    const [categories, setCategories] = useState([]);
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({ categoryId: null, categoryName: "All Categories" });
    const [searchQuery, setSearchQuery] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesResponse = await axios.get("http://localhost:5165/api/Categories", {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                setCategories(categoriesResponse.data);

                const booksResponse = await axios.get("http://localhost:5165/api/Books", {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                setBooks(booksResponse.data);
                setFilteredBooks(booksResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                alert("Failed to fetch data. Please log in again.");
            }
        };

        fetchData();
    }, [accessToken]);

    const filterBooks = (category) => {
        if (category.categoryId === null) {
            setFilteredBooks(books);
        } else {
            setFilteredBooks(books.filter((book) => book.categoryId === category.categoryId));
        }
        setSelectedCategory(category);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = books.filter(
            (book) =>
                book.title.toLowerCase().includes(query.toLowerCase()) ||
                book.author.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredBooks(filtered);
    };

    const handlePriceFilter = () => {
        let filtered = books;

        const min = minPrice ? parseFloat(minPrice) : null;
        const max = maxPrice ? parseFloat(maxPrice) : null;

        if (min !== null) {
            filtered = filtered.filter((book) => book.price >= min);
        }
        if (max !== null) {
            filtered = filtered.filter((book) => book.price <= max);
        }

        setFilteredBooks(filtered);
    };

    const handleAddToCart = (book) => {
        dispatch(addToCart(book));
        alert(`${book.title} added to cart!`);
    };

    return (
        <div className="online-bookstore">
            {/* Navigation Bar */}
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">📚 Online Bookstore</a>

                    <div className="d-flex align-items-center">
                        {/* Search Input */}
                        <input
                            type="text"
                            className="form-control me-2"
                            placeholder="Search by title or author"
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            style={{ width: "300px" }}
                        />

                        {/* Cart Button */}
                        <button className="cart-button" onClick={() => navigate("/cart")}>
                            🛒 Cart
                            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
                        </button>

                        {/* Profile Dropdown */}
                        <ProfileDropdown />
                    </div>
                </div>
            </nav>

            <div className="container-fluid">
                <div className="row">
                    {/* Sidebar - Categories & Price Filter */}
                    <div className="col-md-3 sidebar">
                        <h4 className="sidebar-title">Categories</h4>

                        <Dropdown className="mb-3">
                            <Dropdown.Toggle className="btn btn-success w-100">
                                {selectedCategory.categoryName}
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="w-100">
                                <Dropdown.Item
                                    onClick={() => filterBooks({ categoryId: null, categoryName: "All Categories" })}
                                >
                                    All Categories
                                </Dropdown.Item>
                                {categories.map((cat) => (
                                    <Dropdown.Item key={cat.categoryId} onClick={() => filterBooks(cat)}>
                                        {cat.categoryName}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>

                        {/* Price Filtering Section */}
                        <h5 className="mt-3">Filter by Price</h5>
                        <div className="input-group mb-2">
                            <span className="input-group-text">Min ₹</span>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Min"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                            />
                        </div>
                        <div className="input-group mb-2">
                            <span className="input-group-text">Max ₹</span>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Max"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                            />
                        </div>
                        <button className="btn btn-primary w-100" onClick={handlePriceFilter}>
                            Apply Filter
                        </button>
                    </div>

                    {/* Main Content - Book List with Scrolling */}
                    <div className="col-md-9 book-container">
                        <div className="row">
                            {filteredBooks.map((book) => (
                                <div key={book.bookId} className="col-md-3 mb-3">
                                    <div className="card">
                                        {/* Book Image */}
                                        <img
                                            src={`/images/${book.coverImageName}`}
                                            className="card-img-top"
                                            alt={book.title}
                                        />
                                        <div className="card-body">
                                            <h6 className="card-title">{book.title}</h6>
                                            <p className="card-text small">{book.author}</p>
                                            <p className="card-price text-primary">₹{book.price.toFixed(2)}</p>
                                            <AddToCart book={book} addToCart={handleAddToCart} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnlineBookstore;