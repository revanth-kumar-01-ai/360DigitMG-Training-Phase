create database Embryo;

use Embryo;

-- create a table for doctor details 

create table doctor_details(
	doctor_id char(36) primary key default (uuid()),
    doctor_name varchar(100) not null,
    email varchar(100) not null unique,
    password varchar(100) not null
);

-- create a patients table  
create table patient_detils(
	patient_id CHAR(36) PRIMARY KEY,
	doctor_id CHAR(36),
	patient_name VARCHAR(100) NOT NULL,
	patient_age VARCHAR(100) NOT NULL,
	patient_blood_group VARCHAR(100) NOT NULL,
	prediction VARBINARY(100) NOT NULL,
	probability VARCHAR(100) NOT NULL,
	image_path VARCHAR(1000) NOT NULL,
	FOREIGN KEY (doctor_id) REFERENCES doctor_details(doctor_id)
);

-- insert doctor 
insert into  doctor_details (doctor_name, email, password) value ('Dr. Ravi Kumar', 'kumar@example.com', '12345');
insert into  doctor_details (doctor_name, email, password) value ('Dr. Revanth Kumar', 'revanth@example.com', '12345');
insert into  doctor_details (doctor_name, email, password) value ('Dr. Kumar', 'kumarj@example.com', '12345');


-- insert the patient details 

INSERT INTO patient_detils (doctor_id, patient_name, patient_age, patient_blood_group, prediction, probability, image_path)
VALUES
  ((SELECT doctor_id FROM doctor_details WHERE email = 'kumar@example.com'), 'John Doe', '30', 'O+', '0x1234', '85%', '/path/to/image1.jpg'),
  ((SELECT doctor_id FROM doctor_details WHERE email = 'kumar@example.com'), 'Jane Smith', '25', 'A+', '0x5678', '90%', '/path/to/image2.jpg'),
  ((SELECT doctor_id FROM doctor_details WHERE email = 'kumar@example.com'), 'Alice Brown', '28', 'B+', '0x9abc', '80%', '/path/to/image3.jpg'),

  ((SELECT doctor_id FROM doctor_details WHERE email = 'revanth@example.com'), 'Mike Davis', '32', 'AB+', '0xdef0', '88%', '/path/to/image4.jpg'),
  ((SELECT doctor_id FROM doctor_details WHERE email = 'revanth@example.com'), 'Emily Clark', '22', 'O-', '0x2345', '92%', '/path/to/image5.jpg'),
  ((SELECT doctor_id FROM doctor_details WHERE email = 'revanth@example.com'), 'David Wilson', '40', 'A-', '0x6789', '85%', '/path/to/image6.jpg'),

  ((SELECT doctor_id FROM doctor_details WHERE email = 'kumarj@example.com'), 'Sophia Lee', '35', 'B-', '0x3456', '75%', '/path/to/image7.jpg'),
  ((SELECT doctor_id FROM doctor_details WHERE email = 'kumarj@example.com'), 'Olivia White', '29', 'AB-', '0x7890', '90%', '/path/to/image8.jpg'),
  ((SELECT doctor_id FROM doctor_details WHERE email = 'kumarj@example.com'), 'Liam Harris', '33', 'O+', '0x4567', '80%', '/path/to/image9.jpg');

-- show particular  doctor handle cases
SELECT * 
FROM patient_detils 
WHERE doctor_id = (SELECT doctor_id FROM doctor_details WHERE email = 'kumarj@example.com');

ALTER TABLE patient_detils
ADD COLUMN XAImage VARCHAR(1000);

select * from patient_detils;

select * from doctor_details;

-- DELETE FROM doctor_details; 















