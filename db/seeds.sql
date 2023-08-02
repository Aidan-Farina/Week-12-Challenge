seeds for the department
INSERT INTO department (department_name)
VALUES ("Management"),
       ("Human Resources"),
       ("Customer Service");
-- seeds for the roles
INSERT INTO role (title, salary, department_id)
VALUES ("CEO", 1000000, 1),
       ("Human Resource Manager", 80000, 2),
       ("Human Resource Person", 50000, 2),
       ("Customer Service Manager", 70000, 3),
       ("Customer Service Person", 40000, 3);

-- seeds for the employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Michael", "Prevost", 1, NULL),
        ("Jenn", "Butler", 2, 1),
        ("Kat", "Gorecki", 3, 2),
        ("Austin", "Waller", 4, 1),
        ("Gabriel", "Cruz", 5, 4);
       
