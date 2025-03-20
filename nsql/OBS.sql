-- Create Database
CREATE DATABASE OnlineBookStorePro;
USE OnlineBookStorePro;

-- 1. Users Table
CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY(1,1),
    FirstName NVARCHAR(50) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    Password NVARCHAR(255) NOT NULL,
    CellNumber NVARCHAR(15) NOT NULL
);

-- 2. Categories Table
CREATE TABLE Categories (
    CategoryId INT PRIMARY KEY IDENTITY(1,1),
    CategoryName NVARCHAR(50) NOT NULL
);

-- 3. Books Table
CREATE TABLE Books (
    BookId INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(255) NOT NULL,
    Author NVARCHAR(255) NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    Stock INT NOT NULL,
    CoverImageName NVARCHAR(255),
    CategoryId INT FOREIGN KEY REFERENCES Categories(CategoryId)
);

-- 4. Orders Table
CREATE TABLE Orders (
    OrderId INT PRIMARY KEY IDENTITY(1,1),
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    TotalAmount DECIMAL(10,2) NOT NULL,
    OrderDate DATETIME NOT NULL DEFAULT GETDATE()
);

-- 5. OrderDetails Table
CREATE TABLE OrderDetails (
    OrderDetailsId INT PRIMARY KEY IDENTITY(1,1),
    OrderId INT FOREIGN KEY REFERENCES Orders(OrderId),
    BookId INT FOREIGN KEY REFERENCES Books(BookId),
    Quantity INT NOT NULL,
    Price DECIMAL(10,2) NOT NULL
);

-- 6. Carts Table
CREATE TABLE Carts (
    CartId INT PRIMARY KEY IDENTITY(1,1),
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    DateCreated DATETIME NOT NULL DEFAULT GETDATE()
);

-- 7. CartItems Table
CREATE TABLE CartItems (
    CartItemId INT PRIMARY KEY IDENTITY(1,1),
    CartId INT FOREIGN KEY REFERENCES Carts(CartId),
    BookId INT FOREIGN KEY REFERENCES Books(BookId),
    Quantity INT NOT NULL
);

-- Enable IDENTITY_INSERT and Insert Users
SET IDENTITY_INSERT Users ON;
INSERT INTO Users (UserID, FirstName, LastName, Email, Password, CellNumber)
VALUES 
(101, 'Lokesh', 'Asrith', 'LA@email.com', 'LA123', '9876543210'),
(102, 'Sai', 'Thrinath', 'Sai@email.com', 'Sai456', '8765432109');
SET IDENTITY_INSERT Users OFF;

-- Enable IDENTITY_INSERT and Insert Categories
SET IDENTITY_INSERT Categories ON;
INSERT INTO Categories (CategoryId, CategoryName)
VALUES 
(1, 'Biography'), 
(2, 'Fiction'), 
(3, 'Mystery'), 
(4, 'Fantasy'), 
(5, 'Romance');
SET IDENTITY_INSERT Categories OFF;

-- Enable IDENTITY_INSERT and Insert Books
SET IDENTITY_INSERT Books ON;
INSERT INTO Books (BookId, Title, Author, Price, Stock, CoverImageName, CategoryId)
VALUES 
(201, 'The Great Gatsby', 'F. Scott Fitzgerald', 149.00, 50, 'TheGreatGatsby.jpg', 2),
(202, 'Becoming', 'Michelle Obama', 875.00, 30, 'Becoming.jpg', 1),
(203, 'The Hobbit', 'J.R.R. Tolkien', 1484.00, 40, 'TheHobbit.jpg', 4);
SET IDENTITY_INSERT Books OFF;

-- Enable IDENTITY_INSERT and Insert Orders
SET IDENTITY_INSERT Orders ON;
INSERT INTO Orders (OrderId, UserID, TotalAmount, OrderDate)
VALUES 
(301, 101, 500.00, '2023-10-01'),
(302, 102, 1200.00, '2023-10-05');
SET IDENTITY_INSERT Orders OFF;

-- Enable IDENTITY_INSERT and Insert OrderDetails
SET IDENTITY_INSERT OrderDetails ON;
INSERT INTO OrderDetails (OrderDetailsId, OrderId, BookId, Quantity, Price)
VALUES 
(401, 301, 201, 2, 149.00),
(402, 302, 202, 1, 875.00);
SET IDENTITY_INSERT OrderDetails OFF;

-- Enable IDENTITY_INSERT and Insert Carts
SET IDENTITY_INSERT Carts ON;
INSERT INTO Carts (CartId, UserID, DateCreated)
VALUES 
(501, 101, '2023-10-02'),
(502, 102, '2023-10-06');
SET IDENTITY_INSERT Carts OFF;

-- Enable IDENTITY_INSERT and Insert CartItems
SET IDENTITY_INSERT CartItems ON;
INSERT INTO CartItems (CartItemId, CartId, BookId, Quantity)
VALUES 
(601, 501, 201, 1),
(602, 502, 203, 2);
SET IDENTITY_INSERT CartItems OFF;

SELECT * FROM Books;


