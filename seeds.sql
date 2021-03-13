USE employee_tracker_db;

INSERT INTO department(department_name)
VALUES ("manager");

INSERT INTO role (title, salary)
VALUES ("manager", 130000); 

INSERT INTO employee (first_name, last_name)
VALUES ("Jean-Luc", "Picard");



INSERT INTO department(department_name)
VALUES ("assistant_manager");

INSERT INTO role (title, salary)
VALUES ("assistant_manager", 100000); 

INSERT INTO employee (first_name, last_name)
VALUES ("William", "Riker");



INSERT INTO department(department_name)
VALUES ("Supervisor");

INSERT INTO role (title, salary)
VALUES ("supervisor", 70000); 

INSERT INTO employee (first_name, last_name)
VALUES ("Worf", "OfMartok");
