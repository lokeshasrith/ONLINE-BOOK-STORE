SET IDENTITY_INSERT Categories ON;
INSERT INTO Categories (CategoryId, CategoryName) VALUES
    (1, 'Fantasy'),
    (2, 'Romance'),
    (3, 'Fiction'),
    (4, 'Biography'),
    (5, 'Mystery');
SET IDENTITY_INSERT Categories OFF;
SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'Books' AND COLUMN_NAME = 'CoverImageName';

ALTER TABLE Books ADD CoverImageName NVARCHAR(255);


SET IDENTITY_INSERT Books ON;
INSERT INTO Books (BookId, Title, Author, Price, Stock, CoverImageName, CategoryId) VALUES
    (205, 'Harry Potter and the Sorcerer''s Stone', 'J.K. Rowling', 599.00, 50, 'harry1.jpg', 1),
    (206, 'Harry Potter and the Chamber of Secrets', 'J.K. Rowling', 552.00, 45, 'harry2.jpg', 1),
    (207, 'Harry Potter and the Prisoner of Azkaban', 'J.K. Rowling', 552.00, 40, 'harry3.jpg', 1),
    (208, 'Harry Potter and the Goblet of Fire', 'J.K. Rowling', 736.00, 35, 'harry4.jpg', 1),
    (209, 'Harry Potter and the Order of the Phoenix', 'J.K. Rowling', 828.00, 30, 'harry5.jpg', 1),
    (210, 'Harry Potter and the Half-Blood Prince', 'J.K. Rowling', 690.00, 25, 'harry6.jpg', 1),
    (211, 'Harry Potter and the Deathly Hallows', 'J.K. Rowling', 690.00, 20, 'harry7.jpg', 1),
    (212, 'Lost and Lassoed', 'Lyla Sage', 1000.99, 40, 'lost.jpg', 2),
    (213, 'This Summer Will Be Different', 'Carley Fortune', 150.99, 35, 'summer.jpg', 2),
    (214, 'Deep End', 'Ali Hazelwood', 1690.99, 30, 'deepend.jpg', 2),
    (215, 'Kiss Me, Mi Amor', 'Alana Quintana Albertson', 1388.99, 45, 'kissme.jpg', 2),
    (216, 'THE GIRL WHO KNEW TOO MUCH', 'Vikrant Khanna', 218.99, 25, 'girl.jpg', 3),
    (217, 'To Kill a Mockingbird', 'Harper Lee', 2217.99, 30, 'kill.jpg', 3),
    (219, 'One Hundred Years of Solitude', 'Gabriel Garcia Marquez', 129.99, 35, 'one.jpg', 3),
    (220, 'Unbroken: A World War II Story of Survival, Resilience and Redemption', 'Laura Hillenbrand', 224.99, 20, 'unbroken.jpg', 4),
    (221, 'Einstein: His Life and Universe', 'Walter Isaacson', 244.99, 18, 'einstein.jpg', 4),
    (222, 'Into the Wild', 'Jon Krakauer', 144.99, 25, 'wild.jpg', 4),
    (223, 'John Adams', 'David McCullough', 2144.99, 22, 'john.jpg', 4),
    (224, 'And Then There Were None', 'Agatha Christie', 1244.99, 50, 'kill.jpg', 5),
    (225, 'The Girl with the Dragon Tattoo', 'Stieg Larsson', 154.99, 45, 'girl2.jpg', 5),
    (226, 'The Hound of the Baskervilles', 'Sir Arthur Conan Doyle', 110.99, 40, 'hound.jpg', 5),
    (227, 'Gone Girl', 'Gillian Flynn', 103.99, 38, 'gone.jpg', 5),
    (228, 'The Secret History', 'Donna Tartt', 105.99, 32, 'secret.jpg', 5),
    (229, 'The Lord of the Rings', 'J.R.R. Tolkien', 2009.99, 50, 'hobit2.jpg', 1),
    (230, 'The Barrow-Downs', 'J.R.R. Tolkien', 819.99, 40, 'hobit3.jpg', 1),
    (231, 'The History of Middle-earth', 'J.R.R. Tolkien', 384.99, 30, 'hobit4.jpg', 1);
SET IDENTITY_INSERT Books OFF;

SELECT * FROM Books ORDER BY BookId DESC;

UPDATE Books
SET coverImageName = 
    CASE 
        WHEN bookId = 220 THEN 'unbroken.jpg'
        WHEN bookId = 213 THEN 'summer.jpg'
    END
WHERE bookId IN (220, 213);
