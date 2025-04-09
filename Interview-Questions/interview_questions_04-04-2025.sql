-- question 
/*1. Write a SQL trigger that automatically updates a timestamp column whenever a row is inserted or updated in a specific table.
2. Create a trigger that prevents deletion of rows from a table if certain conditions are not met (e.g., the user doesn't have sufficient permissions).
3. Implement a trigger that sends an email notification to a specified address whenever a new record is inserted into a particular table.
4. Develop a trigger that maintains a running total in another table whenever a new row is inserted or an existing row is updated in a related table.
5. Write a trigger that logs all changes made to a specific table into an audit table, capturing the old and new values of the modified columns.*/



-- Qustion one and two same code itself 

CREATE DATABASE 360DigiTMGInternShip;

-- Use the database
USE 360DigiTMGInternShip;

-- Create student info table
CREATE TABLE studentInfo (
	id INT PRIMARY KEY, 
	firstName VARCHAR(100),
	lastName VARCHAR(100),
	studentInternScore INT DEFAULT 0
);

-- Create audit table
CREATE TABLE studentAudit (
	id INT AUTO_INCREMENT PRIMARY KEY,
	InsertAction TEXT,
	updateAction TEXT, 
    deleteAction TEXT
);

-- Set DELIMITER for trigger block
DELIMITER //

-- Insert Trigger
CREATE TRIGGER studentInsertTrigger 
AFTER INSERT ON studentInfo 
FOR EACH ROW
BEGIN
	INSERT INTO studentAudit (InsertAction)
	VALUES (
		CONCAT('New student with id = ', NEW.id, ' is added at ', NOW())
	);
END;

-- Update Trigger
CREATE TRIGGER studentUpdateTrigger 
AFTER UPDATE ON studentInfo
FOR EACH ROW
BEGIN
	INSERT INTO studentAudit (updateAction)
	VALUES (
		CONCAT('Student with id = ', NEW.id, ' was updated at ', NOW())
	);
END;

-- Prevent delete if score < 90  (Question number two to prevent the delete)
CREATE TRIGGER preventStudentDelete
BEFORE DELETE ON studentInfo
FOR EACH ROW 
BEGIN
	IF OLD.studentInternScore < 90 THEN
		SIGNAL SQLSTATE '45000' -- SIGNAL SQLSTATE '45000' is used to raise a custom error in MySQL 🚫
		SET MESSAGE_TEXT = 'Delete not allowed: Score is below 90';
	END IF;
END;
//

DELIMITER ;

-- ✅ Insert data
INSERT INTO studentInfo VALUES (1, 'Revanth', 'Kumar', 0);
INSERT INTO studentInfo VALUES (2, 'John', 'Smith', 0);
INSERT INTO studentInfo VALUES (3, 'Sam', 'Soundara', 95);

-- ✅ Update data
UPDATE studentInfo SET studentInternScore = 50 WHERE id = 1;
UPDATE studentInfo SET lastName = 'Wick' WHERE id = 2;

-- ✅ Try delete (will fail if score < 90)
DELETE FROM studentInfo WHERE id = 1; -- ❌ Will raise error
DELETE FROM studentInfo WHERE id = 3; -- ✅ Will succeed

-- ✅ View data
SELECT * FROM studentInfo;
SELECT * FROM studentAudit;





-- question three

use 360DigiTMGInternShip;

create table course(
	id int primary key,
    courseName varchar(100),
    email varchar(100)
);

CREATE TABLE emailQueue (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject VARCHAR(255),
    body TEXT,
    toEmail VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DELIMITER   //

CREATE trigger notificationTrigger
after insert on course
for each row
Begin
	Insert into emailQueue (subject, body, toEmail)
    values (
		"new user registered",
        concat('Course Name', New.courseName, ' posted!'),
        New.email
    );
End;

//
DELIMITER 


insert into course values (1, "Data science", "360DigiTMG@gmail.com");

SELECT * FROM emailQueue;



-- question four

USE 360DigiTMGInternShip;


CREATE TABLE courseFee (
	id INT PRIMARY KEY,
	courseName VARCHAR(100) DEFAULT 'Data Science',
	amount DECIMAL(10, 2)
);

CREATE TABLE courseFeesUpdate (
	id INT AUTO_INCREMENT PRIMARY KEY,
	courseFees DECIMAL(10, 2)
);

select * from courseFee;
select * from courseFeesUpdate;

INSERT INTO courseFeesUpdate (courseFees) VALUES (0.00);

-- trigger 
DELIMITER //
CREATE TRIGGER courseFeesInsert
AFTER INSERT ON courseFee
FOR EACH ROW 
BEGIN
	UPDATE courseFeesUpdate 
	SET courseFees = courseFees + NEW.amount;
END;

-- Update Trigger: Adjust total (old - new)
CREATE TRIGGER courseFeesUpdateTrigger
AFTER UPDATE ON courseFee
FOR EACH ROW 
BEGIN
	UPDATE courseFeesUpdate 
	SET courseFees = courseFees - OLD.amount + NEW.amount;
END;
// 
DELIMITER ;

INSERT INTO courseFee VALUES (1, 'Data Science', 1000);
INSERT INTO courseFee VALUES (2, 'AI', 2000);

SELECT * FROM courseFeesUpdate;

UPDATE courseFee SET amount = 3000 WHERE id = 2;

SELECT * FROM courseFeesUpdate;


-- question five 

USE 360DigiTMGInternShip;

CREATE TABLE employee (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    salary DECIMAL(10, 2)
);

CREATE TABLE employeeAuditT (
    auditId INT AUTO_INCREMENT PRIMARY KEY,
    employeeId INT,
    oldName VARCHAR(100),
    newName VARCHAR(100),
    oldSalary DECIMAL(10, 2),
    newSalary DECIMAL(10, 2),
    actionTime DATETIME
);

DELIMITER //

CREATE TRIGGER employeeUpdateAudit
AFTER UPDATE ON employee
FOR EACH ROW
BEGIN
    INSERT INTO employeeAuditT (
        employeeId, oldName, newName, oldSalary, newSalary, actionTime
    )
    VALUES (
        OLD.id, OLD.name, NEW.name, OLD.salary, NEW.salary, NOW()
    );
END;
//

DELIMITER ;


-- Insert initial data
INSERT INTO employee VALUES (1, 'Revanth', 40000);

-- Update the data to trigger the audit
UPDATE employee SET name = 'Revanth Kumar', salary = 45000 WHERE id = 1;

-- View audit logs
SELECT * FROM employeeAuditT;