DROP DATABASE IF EXISTS employee_tracker_db;
CREATE database employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (
  id INT auto_increment PRIMARY KEY,
  department_name VARCHAR(30)
);
------------------------------------------------------
CREATE TABLE role (
  id INT auto_increment PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
  );
-------------------------------------------------------
CREATE TABLE employee (
  id INT auto_increment PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
 --  ADD manager_id FK--  
  FOREIGN KEY (role_id) REFERENCES role(id)  ON DELETE CASCADE,
  FOREIGN KEY (manager_id) REFERENCES role(id)  ON DELETE SET NULL
);
-------------------------------------------------------
INSERT INTO department(department_name)
VALUES ("manager");
INSERT INTO role (title, salary, department_id)
VALUES ("manager", 130000, 1); 
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jean-Luc", "Picard", 1, null);

