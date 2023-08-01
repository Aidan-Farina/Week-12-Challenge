const inquirer = require("inquirer");
const connection = require("./requests.js");

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


function viewAll(tableName) {
    const query = `SELECT * FROM ${tableName}`;
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      start();
    });
  }

