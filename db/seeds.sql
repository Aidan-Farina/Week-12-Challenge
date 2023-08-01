INSERT INTO department (department_name)
VALUES ("Management"),
       ("Human Resources"),
       ("Customer Service"),
       ("IT"),
       ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("CEO", 1000000, 1),
       ("Human Resource Manager", 80000, 2),
       ("Customer Service Manager", 70000, 3),
       ("IT Manager", 120000, 4),
       ("Sales Manager", 160000, 5),
    
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Aidan", "Farina", 1)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Michael", "Prevost", 2, 1)
        ("Jenn", "Butler", 3, 1)
        ("Kat", "Gorecki", 4, 1)
        ("Austin", "Waller", 5, 1)
       
