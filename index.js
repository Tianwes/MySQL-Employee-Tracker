const mysql = require('mysql');
const inquirer = require('inquirer');
const chalk = require('chalk');
const cTable = require('console.table');
const figlet = require('figlet')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'employee_tracker_db'
});

connection.connect((err) => {
    if (err) throw err;
    console.log(figlet.textSync('Employee Tracker', {
        font: 'standard',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
    }));

    runTracker();
});

const runTracker = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'VIEW Full Employees Database',
                'ADD Department',
                'ADD Role',
                'ADD Employee',
                'VIEW Departments',
                'VIEW Roles',
                'VIEW Employees',
                'UPDATE Employee roles',
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'VIEW Full Employees Database':
                    employeeTable();
                    runTracker();
                    break;

                case 'ADD Department':
                    addDepartment();
                    break;

                case 'ADD Role':
                    addRole();
                    break;

                case 'ADD Employee':
                    addEmployee();
                    break;
                // ----------------------------------------------------------------
                //                    HOW TO VIEW ?? console.table
                case 'VIEW Departments':
                    viewDepartments();
                    break;

                case 'VIEW Roles':
                    viewRoles();
                    break;

                case 'VIEW Employees':
                    viewEmployees();
                    break;

                case 'UPDATE employee roles':
                    updateRoles();
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
                // do I need to (inner)join somewhere??
            }
        });
};
// how to push full list to dataTable - it's being pushed to diff arrs
//function that returns array - use return 'value' RETURN VALUE!!!!!!!!!
let employeesArr = [];
let rolesArr = [];
let departArr = [];

const employeeTable = () => {
    // console.log(dataTable)

    connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id', (err, res) => {
        if (err) throw err;
        console.log('/n')
        console.table(res)
        runTracker();
    })

}

function addDepartment() {
    inquirer
        .prompt({
            name: 'depName',
            type: 'input',
            message: 'Which DEPARTMENT do you want to ADD?:',

        })
        .then((answer) => {
            const query = `INSERT INTO department (department_name) VALUES (?);`;
            connection.query(query, [answer.depName], (err, res) => {
                if (err) throw err;
                departArr.push(answer.depName)
                console.log(chalk.green('Department was added to database'));
                runTracker();
            })
        });
};

function addRole() {
    connection.query('SELECT * FROM department').then(function (response) {
        console.log(response)
    });
    console.log(department);
    inquirer
        .prompt([{
            name: 'roleName',
            type: 'input',
            message: 'Which ROLE do you want to ADD?:',

        },
        {
            name: 'roleSalary',
            type: 'input',
            message: 'ADD SALARY for role:',
        }])
        .then((answer) => {
            const query = `INSERT INTO role (title, salary) VALUES (?, ?);`;
            connection.query(query, [answer.roleName, answer.roleSalary], (err, res) => {
                if (err) throw err;
                rolesArr.push(roleName, roleSalary)
                console.log(chalk.green('New ROLE and SALARY were added to database'));
                runTracker();
            })
        });
};

function addEmployee() {
    inquirer
        .prompt([{
            name: 'employeeFN',
            type: 'input',
            message: "Employee's FIRST name ?:",
        },
        {
            name: 'employeeLN',
            type: 'input',
            message: "Employee's LAST name ?:",
        }])
        .then((answer) => {
            const query = `INSERT INTO employee (first_name, last_name) VALUES (?, ?);`;
            connection.query(query, [answer.employeeFN, answer.employeeLN], (err, res) => {
                if (err) throw err;
                employeesArr.push(answer.employeeFN, answer.employeeLN)
                console.log(chalk.green('New EMPLOYEE was ADDED added to database'));
                runTracker();
            })
        });
}

// by view : view all ? or view just roles, just departments ??
function viewDepartments() {
    console.log('departments');
    runTracker();
};

function viewRoles() {
    connection.query("SELECT role.id, title, salary, department_name AS department FROM role LEFT JOIN department ON role.department_id = department.id", function (err, res) {
        if (err) throw err;
        console.table(
            "-------------------------------------",
            "All Roles",
            "-------------------------------------",
            res
        );
    runTracker();   
    });
};

function viewEmployees() {
    console.log('displays employees');
    runTracker();
};
// ------------------------------------------------------------
// function updateRoles() {

//     const query = `UPDATE role
//             SET title = answer.title, 
//                 salary = answer.salary, 
//                WHERE id = ?;`;
//     connection.query(query, [answer.title, answer.salary], (err, res) => {
//         if (err) throw err;
//         console.log(chalk.green('New ROLE and SALARY were Updated'));
//         runTracker();
//     })
// };


