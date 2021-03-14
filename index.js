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
    runEmpFirstNameArr();
    runEmpLastNameArr();
    runEmpRolesArr();
    runTracker();
});

const runTracker = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'VIEW Full Employees Database',
                'ADD Department',
                'ADD Role',
                'ADD Employee',
                'VIEW Departments',
                'VIEW Roles',
                'UPDATE Employee roles',
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'VIEW Full Employees Database':
                    employeeTable();
                    runTracker();
                    break;
                // ----------------------------
                case 'ADD Department':
                    addDepartment();
                    break;

                case 'ADD Role':
                    addRole();
                    break;

                case 'ADD Employee':
                    addEmployee();
                    break;
                // -----------------------------
                case 'VIEW Departments':
                    viewDepartments();
                    break;

                case 'VIEW Roles':
                    viewRoles();
                    break;
                // -----------------------------
                case 'UPDATE Employee roles':
                    updateRoles();
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
};
// how to push full list to dataTable - it's being pushed to diff arrs
//function that returns array - use return 'value' RETURN VALUE!!!!!!!!!
let empFnameArr = [];
let empLnameArr = [];
let rolesArr = [];
let departArr = [];
let managersArr = [];
let fullDataTable = [];

const employeeTable = () => {
    // console.log(dataTable)

    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id`, (err, res) => {
        if (err) throw err;
        fullDataTable.push(res);
        console.log('\n');
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
            })
            console.log(chalk.green('Department was added to database'));
            runTracker();

        });
};

function addRole() {
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
                rolesArr.push(res)

            })
            console.log('New ROLE and SALARY were added to database');
            runTracker();
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
        },
        {
            name: 'employeeRole',
            type: 'input',
            message: "Employee's ROLE ?:",
        }
        ])
        .then((answer) => {
            const query = `INSERT INTO employee (first_name, last_name) VALUES (?, ?)`
            connection.query(query, [answer.employeeFN, answer.employeeLN], (err, res) => {
                if (err) throw err;

                empFnameArr.push(answer.employeeFN)
                empLnameArr.push(answer.employeeLN)
            })
            console.log(chalk.green('New EMPLOYEE and Role have ADDED added to database'));
            runTracker();
        });
    
}

function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(
            "All Departments",
            "-------------------------------------",
            res
        );
        runTracker();
    });
};

function viewRoles() {
    connection.query("SELECT role.id, title, salary, department_name AS department FROM role LEFT JOIN department ON role.department_id = department.id", function (err, res) {
        if (err) throw err;
        console.table(
            "All Roles",
            "-------------------------------------",
            res
        );
        runTracker();
    });
};

// ------------------------------------------------------------
function runEmpFirstNameArr() {
    const query = `
    SELECT first_name
    FROM employee;`;

    connection.query(query, function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            empFnameArr.push(res[i].first_name);
        }
    });
}

function runEmpLastNameArr() {
    const query = `
    SELECT last_name
    FROM employee;`;

    connection.query(query, function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            empLnameArr.push(res[i].last_name);
        }
    });
}

function runEmpRolesArr() {
    const query = `
    SELECT title
    FROM role;`;

    connection.query(query, function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            rolesArr.push(res[i].title);
        }
    });
}


function updateRoles() {
    inquirer
        .prompt([{
            name: 'employeeSelectFN',
            type: 'list',
            message: "SELECT the EMPLOYEE's FIRST name :",
            choices: empFnameArr
        },
        {
            name: 'employeeSelectLN',
            type: 'list',
            message: "SELECT the EMPLOYEE's LAST name :",
            choices: empLnameArr
        },
        {
            name: 'roleSelect',
            type: 'list',
            message: 'SELECT a NEW ROLE:',
            choices: rolesArr
        }])
        .then((answer) => {
            const query =
                `UPDATE employee 
        SET role_id = ${answer.roleSelect}
        WHERE employee.id = ${answer.roleSelect}`
            connection.query(query, [answer.employeeSelectFN, answer.employeeSelectLN, answer.roleSelect], (err, res) => {
                if (err) throw err;
                console.log(chalk.green('New ROLE and SALARY were Updated'));
                runTracker();
            })

        });
}
// function updateRoles(){
//     const currentEmployeesList = employees.map(({ id, first_name, last_name }) => ({
//         name: `${first_name} ${last_name}`,
//         value: id
//       }));

//     inquirer
//         .prompt({
//             name: 'employeeSelect',
//             type: 'rawlist',
//             message: 'SELECT an EMPLOYEE to change their ROLE:',
//             choices: currentEmployeesList
//         })
//         .then((answer) => {
//             switch (answer.action) {
//                 case 'VIEW Full Employees Database':
//                     employeeTable();
//                     runTracker();
//                     break;
//             }
// })
// })
// }



// const query = `INSERT INTO department (department_name) VALUES (?);`; 
// connection.query(query, [answer.department_name], (err, res) => {
//     if (err) throw err;
// });