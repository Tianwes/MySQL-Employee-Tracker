USE employee_tracker_db;

INSERT INTO department(department_name)
VALUES ("assistant_manager");

INSERT INTO role (title, salary, department_id)
VALUES ("assistant_manager", 100000, 2); 

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("William", "Riker", 231, 427);
