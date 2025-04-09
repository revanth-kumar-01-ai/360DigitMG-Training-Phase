# employe

/*

1. Given a table with columns EmployeeID, FirstName, LastName, Department, Salary, write a SQL query to find the highest paid employee in each department.

2. Given tables with columns OrderID, CustomerID, OrderDate, and TotalAmount in one table, and columns CustomerID, FirstName, LastName in another table, write a SQL query to find the total amount spent by each customer in the year 2023.

3. Given a table with columns ProductID, ProductName, Category, Price, write a SQL query to find the top 3 most expensive products in each category.

4. Given tables with columns StudentID, FirstName, LastName in one table, and columns StudentID, Subject, Grade in another table, write a SQL query to find the average grade of each student.

5. Given tables with columns BookID, Title, Author, ISBN in one table, and columns BorrowerID, BookID, BorrowDate, ReturnDate in another table, write a SQL query to find the books that have been borrowed the most.
*/

create database employees;

use employees;

-- Question one

-- 1. Given a table with columns EmployeeID, FirstName, LastName, Department, Salary, write a SQL query to find the highest paid employee in each department.

CREATE TABLE employeeInfo (
    EmployeeID INT PRIMARY KEY,
    FirstName VARCHAR(100),
    LastName VARCHAR(100),
    Department VARCHAR(100),
    Salary DECIMAL(10, 2)
);

INSERT INTO employeeInfo VALUES 
(1, 'Revanth', 'Kumar', 'MSC IT', 120000.90),
(2, 'John', 'Doe', 'HR', 80000.00),
(3, 'Jane', 'Smith', 'Finance', 95000.50),
(4, 'Arun', 'V', 'Marketing', 72000.00),
(5, 'Sara', 'Ali', 'IT', 100000.00),
(6, 'David', 'Williams', 'Operations', 87000.75),
(7, 'Priya', 'R', 'MSC IT', 119000.00),
(8, 'Kiran', 'Raj', 'Sales', 65000.00),
(9, 'Emily', 'Clark', 'HR', 90000.25),
(10, 'Vikram', 'Sharma', 'Finance', 105000.10);


select * from employeeInfo;

select max(Salary) as highestSalary from employeeInfo;

-- Question 2 

-- 2. Given tables with columns OrderID, CustomerID, OrderDate, and TotalAmount in one table, and columns CustomerID, FirstName, LastName in another table, write a 
-- SQL query to find the total amount spent by each customer in the year 2023.

-- Create Customer Info table
CREATE TABLE SalesCustomerInfoDetails (
    CustomerID INT PRIMARY KEY,
    FirstName VARCHAR(100),
    LastName VARCHAR(100)
);

CREATE TABLE SalesCustomerOrderDetails (
    OrderID INT PRIMARY KEY,
    CustomerID INT,
    OrderDate DATE,
    TotalAmount DECIMAL(10, 2),
    FOREIGN KEY (CustomerID) REFERENCES SalesCustomerInfoDetails(CustomerID)
);



INSERT INTO SalesCustomerInfoDetails (CustomerID, FirstName, LastName) VALUES
(1, 'Revanth', 'Kumar'),
(2, 'John', 'Doe'),
(3, 'Alice', 'Smith'),
(4, 'Bob', 'Johnson'),
(5, 'Eve', 'Brown'),
(6, 'Charlie', 'Davis'),
(7, 'David', 'Clark'),
(8, 'Emma', 'Lewis'),
(9, 'Olivia', 'Hall'),
(10, 'Liam', 'Young');


INSERT INTO SalesCustomerOrderDetails (OrderID, CustomerID, OrderDate, TotalAmount) VALUES
(001, 1, '2024-04-01', 100.50),
(002, 2, '2024-04-02', 50.00),
(003, 3, '2024-04-03', 50.75),
(004, 4, '2024-04-04', 90.20),
(005, 5, '2024-04-05', 430.00),
(006, 6, '2024-04-06', 190.80),
(007, 7, '2024-04-07', 70.00),
(008, 8, '2024-04-08', 30.99),
(009, 9, '2024-04-08', 99.99),
(010, 10, '2024-04-09', 100.00),
(001, 1, '2025-04-01', 1200.50),
(102, 2, '2025-04-02', 850.00),
(103, 3, '2025-04-03', 560.75),
(104, 4, '2025-04-04', 910.20),
(105, 5, '2025-04-05', 430.00),
(106, 6, '2025-04-06', 1490.80),
(107, 7, '2025-04-07', 780.00),
(108, 8, '2025-04-08', 340.99),
(109, 9, '2025-04-08', 999.99),
(110, 10, '2025-04-09', 1700.00);


select * from SalesCustomerOrderDetails;

select 
	c.CustomerID, 
    c.FirstName, 
    c.LastName, 
    sum(o.TotalAmount) as TotalSpend
    FROM 
		SalesCustomerInfoDetails c
    join 
		SalesCustomerOrderDetails o on c.CustomerID = o.CustomerID
	where
		year(o.OrderDate) in (2024, 2025) -- you chnge 2023 question asking only 2023
    Group By 
		c.CustomerID, c.FirstName, c.LastName;
    
-- Question three 
-- 3. Given a table with columns ProductID, ProductName, Category, Price, write a SQL query to find the top 3 most expensive products in each category.

CREATE TABLE Products (
    ProductID INT PRIMARY KEY,
    ProductName VARCHAR(100),
    Category VARCHAR(50),
    Price DECIMAL(10, 2)
);

INSERT INTO Products VALUES
(1, 'Laptop', 'Electronics', 55000.00),
(2, 'Smartphone', 'Electronics', 25000.00),
(3, 'Desk Chair', 'Furniture', 6000.00),
(4, 'Notebook', 'Stationery', 50.00),
(5, 'Pen Drive', 'Accessories', 800.00),
(6, 'Air Conditioner', 'Electronics', 30000.00),
(7, 'Washing Machine', 'Appliances', 18000.00),
(8, 'LED Monitor', 'Electronics', 12000.00),
(9, 'Table Lamp', 'Furniture', 1500.00),
(10, 'Wireless Mouse', 'Accessories', 1200.00);

select ProductName, Price  from Products where price = (select max(price) from products);
    
select ProductName, Price from Products order by price desc limit 3;

-- Question 4
-- 4. Given tables with columns StudentID, FirstName, LastName in one table, and columns StudentID, Subject, Grade in another table, write a SQL query to find the average grade of each student.

CREATE TABLE studentDetails (
  StudentID INT PRIMARY KEY,
  FirstName VARCHAR(50),
  LastName VARCHAR(50)
);

INSERT INTO studentDetails (StudentID, FirstName, LastName) VALUES
(1, 'Revanth', 'Kumar'),
(2, 'Anjali', 'Sharma'),
(3, 'Ravi', 'Verma'),
(4, 'Sneha', 'Reddy'),
(5, 'Arjun', 'Mehta'),
(6, 'Priya', 'Singh'),
(7, 'Kiran', 'Patel'),
(8, 'Vikram', 'Das'),
(9, 'Neha', 'Jain'),
(10, 'Amit', 'Nair');
    
CREATE TABLE StudentMarksDetails (
  StudentID INT,
  Subject VARCHAR(50),
  Grade VARCHAR(2),
  FOREIGN KEY (StudentID) REFERENCES studentDetails(StudentID)
);

INSERT INTO StudentMarksDetails (StudentID, Subject, Grade) VALUES
(1, 'Math', 'A'),
(2, 'Science', 'B'),
(3, 'English', 'A'),
(4, 'Math', 'C'),
(5, 'Science', 'B'),
(6, 'English', 'A'),
(7, 'Math', 'B'),
(8, 'Science', 'C'),
(9, 'English', 'B'),
(10, 'Math', 'A');

select 
	 c.StudentID,
     c.FirstName,
     c.LastName,
     Round(AVG(
		case m.Grade
			when 'A' then 4
            when 'B' then 3
            when 'C' then 2
            when 'D' then 1
            else 0
		End
		), 2) as AverageGrade
     from studentDetails c
     Join StudentMarksDetails m on c.StudentID = m.StudentID
     GROUP BY 
		c.StudentID, c.FirstName, c.LastName;
        
-- question 5
-- 5 Given tables with columns BookID, Title, Author, ISBN in one table, and columns BorrowerID, BookID, BorrowDate, ReturnDate in another table, write a SQL query to find the books that have been borrowed the most.

CREATE TABLE Books (
    BookID int primary key,
    Title VARCHAR(100),
    Author VARCHAR(100),
    ISBN VARCHAR(20)
);
     
     
INSERT INTO Books (BookID, Title, Author, ISBN) VALUES 
(1021, 'Atomic Habits', 'James Clear', '9780735211292'),
(1022, 'The Alchemist', 'Paulo Coelho', '9780061122415'),
(1023, '1984', 'George Orwell', '9780451524935'),
(1024, 'Deep Work', 'Cal Newport', '9781455586691'),
(1025, 'The Hobbit', 'J.R.R. Tolkien', '9780547928227');

select * from Books;


CREATE TABLE BookBorrowDetails (
    BorrowerID INT,
    BookID INT,
    BorrowDate DATE,
    ReturnDate DATE,
    FOREIGN KEY (BookID) REFERENCES Books(BookID)
);

INSERT INTO BookBorrowDetails (BorrowerID, BookID, BorrowDate, ReturnDate) VALUES
(1, 1021, '2024-01-05', '2024-01-10'),
(2, 1022, '2024-01-07', '2024-01-12'),
(3, 1023, '2024-02-01', '2024-02-05'),
(4, 1024, '2024-02-03', '2024-02-10'),
(5, 1025, '2024-02-04', '2024-02-15'),
(1, 1023, '2024-03-01', '2024-03-05'),
(2, 1021, '2024-03-10', '2024-03-15'),
(3, 1024, '2024-04-01', '2024-04-08'),
(4, 1022, '2024-04-05', '2024-04-10'),
(5, 1025, '2024-04-15', '2024-04-20'),
(6, 1021, '2024-05-01', '2024-05-07'),
(7, 1022, '2024-05-03', '2024-05-09'),
(8, 1023, '2024-06-01', '2024-06-06'),
(9, 1024, '2024-06-10', '2024-06-15'),
(10, 1025, '2024-06-12', '2024-06-20'),
(11, 1025, '2024-04-15', '2024-04-20'),
(12, 1025, '2024-04-15', '2024-04-20'),
(13, 1025, '2024-04-15', '2024-04-20'),
(14, 1025, '2024-04-15', '2024-04-20');


SELECT 
    b.Title, 
    b.Author, 
    b.ISBN, 
    COUNT(*) AS BorrowCount
FROM 
    Books b
JOIN 
    BookBorrowDetails d ON b.BookID = d.BookID
GROUP BY 
    b.BookID, b.Title, b.Author, b.ISBN
order by 
	BorrowCount desc 
limit 1;




CREATE TABLE student (
   id INT PRIMARY KEY,
   name VARCHAR(50),
   gender ENUM('Male', 'Female', 'Other')
);

INSERT INTO student VALUES (1, 'one', 'Male');

SELECT * FROM student;

DROP TABLE IF EXISTS student;

	
     
    
    
    