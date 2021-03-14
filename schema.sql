DROP DATABASE IF EXISTS employee_tracker_db;
CREATE database employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30)
);
------------------------------------------------------
CREATE TABLE role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
  );
-------------------------------------------------------
CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
 --  ADD manager_id FK--  
  FOREIGN KEY (role_id) REFERENCES role(id)  ON DELETE CASCADE,
  FOREIGN KEY (manager_id) REFERENCES role(id)  ON DELETE SET NULL
);
-------------------------------------------------------
-- INSERT INTO department(department_name)
-- VALUES ("manager");
-- INSERT INTO role (title, salary, department_id)
-- VALUES ("manager", 130000, 1); 
-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES ("Jean-Luc", "Picard", 1, null);


-- INSERT INTO department(department_name)
-- VALUES ("assistant_manager");
-- INSERT INTO role (title, salary, role.id)
-- VALUES ("assistant_manager", 100000, default); 
-- INSERT INTO employee (first_name, last_name)
-- VALUES ("William", "Riker");


-- INSERT INTO department(department_name)
-- VALUES ("Supervisor");
-- INSERT INTO role (title, salary)
-- VALUES ("supervisor", 70000); 
-- INSERT INTO employee (first_name, last_name)
-- VALUES ("Worf", "OfMartok");

SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;



SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name AS department_name, concat(manager.first_name, " ", manager.last_name) AS manager_fullName
  FROM employee 
  LEFT JOIN role ON employee.role_id = role.id
  LEFT JOIN department ON department.id = role.department_id
LEFT JOIN employee as manager ON employee.manager_id = manager.id;
