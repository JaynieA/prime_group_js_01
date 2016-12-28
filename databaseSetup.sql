--Database Name: bonus_calculator

CREATE TABLE employee (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	employee_number INT UNIQUE NOT NULL,
	annual_salary INT NOT NULL,
	rating INT NOT NULL CHECK(rating >= 1 and rating <= 5)
);
