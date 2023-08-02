const inquirer = require("inquirer");
const connection = require("./requests.js");
// this is the function that shows you the options
function start() {
    inquirer.prompt({
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an employee role",
            "Exit",
        ],
    })
        .then(handleAction);
}
// this take the answer above and will make said function work
function handleAction(answer) {
    switch (answer.action) {
        case "View all departments":
            viewAll("department");
            break;
        case "View all roles":
            viewAll("role");
            break;
        case "View all employees":
            viewAll("employee");
            break;
        case "Add a department":
            addDepartment();
            break;
        case "Add a role":
            addRole();
            break;
        case "Add an employee":
            addEmployee();
            break;
        case "Update an employee role":
            updateRole();
            break;
        case "Exit":
            connection.end();
            break;
        default:
            console.log(`Invalid action: ${answer.action}`);
            break;
    }
}

// takes the answer is a view all is clicked then uses that as the answer
function viewAll(tableName) {
    const query = `SELECT * FROM ${tableName}`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}
//functions for adding departments
function addDepartment() {
    inquirer
    //this is the prompt
        .prompt([
            {
                name: "departmentName",
                type: "input",
                message: "What is the name of the new department?",
            },
        ])
        .then((answer) => {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    department_name: answer.departmentName,
                },
                (err, res) => {
                    if (err) throw err;
                    console.log(`${answer.departmentName} Department added successfully!`);
                    start();
                }
            );
        });
}
//function for adding roles
function addRole() {
    connection.query("SELECT * FROM department", function (err, departments) {
        if (err) throw err;

        inquirer
        //this is the prompt
            .prompt([
                {
                    name: "roleTitle",
                    type: "input",
                    message: "What is the title of the new role?",
                },
                {
                    name: "roleSalary",
                    type: "input",
                    message: "What is the Salary for this role?",
                },
                {
                    name: "roleDept",
                    type: "list",
                    message: "What department is this role in?",
                    choices: departments.map((department) => ({
                        name: department.department_name,
                        value: department.id,
                    })),
                },
            ])
            .then((answer) => {
                connection.query(
                    "INSERT INTO role SET ?",
                    {
                        title: answer.roleTitle,
                        salary: answer.roleSalary,
                        department_id: answer.roleDept,
                    },
                    (err, res) => {
                        if (err) throw err;
                        console.log(`${answer.roleTitle} Role added successfully!`);
                        start();
                    }
                );
            });
    });
}
//function for adding employees
function addEmployee() {
    connection.query("SELECT * FROM employee", function (err, employees) {
      if (err) throw err;
      connection.query("SELECT * FROM role", function (err, roles) {
        if (err) throw err;
        inquirer
          .prompt([
            {
              name: "firstName",
              type: "input",
              message: "What is the employee's first name?",
            },
            {
              name: "lastName",
              type: "input",
              message: "What is the employee's last name?",
            },
            {
              name: "roleId",
              type: "list",
              message: "What role does this employee have?",
              choices: roles.map((role) => ({
                name: role.title,
                value: role.id,
              })),
            },
            {
              name: "managerId",
              type: "list",
              message: "Who is this employee's manager?",
              choices: employees.map((employee) => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id,
              })),
            },
          ])
          .then((answer) => {
            connection.query(
              "INSERT INTO employee SET ?",
              {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: answer.roleId,
                manager_id: answer.managerId,
              },
              (err, res) => {
                if (err) throw err;
                console.log(
                  `${answer.firstName} ${answer.lastName} Employee added successfully!`
                );
                start();
              }
            );
          })
          .catch((err) => {
            console.error("Error fetching data:", err);
            start();
          });
      });
    });
  }
//function for updating the roles
function updateRole() {
    // the 2 querys are pulling from sql to display
    connection.query("SELECT * FROM employee", function (err, employees) {
        if (err) throw err;
        connection.query("SELECT * FROM role", function (err, roles) {
            if (err) throw err;
            inquirer
            // this is the prompt
                .prompt([
                    {
                        name: "employeeId",
                        type: "list",
                        message: "Which employees role do you want to update?",
                        choices: employees.map((employee) => ({
                            name: `${employee.first_name} ${employee.last_name}`,
                            value: employee.id,
                        })),
                    },
                    {
                        name: "roleId",
                        type: "list",
                        message: "Which role do you want to assign the selected employee?",
                        choices: roles.map((role) => ({
                            name: role.title,
                            value: role.id,
                        })),
                    },
                ])
                .then((answers) => {
                    connection.query(
                        "UPDATE employee SET role_id = ? WHERE id = ?",
                        [answers.roleId, answers.employeeId],
                        function (err) {
                            if (err) throw err;
                            console.log("Updated employees role");
                            start();
                        }
                    );
                });
        });
    });
}

start();
