const mysql = require('mysql2');
const inquirer = require('inquirer');
const {viewAllDepartments,viewAllRoles,viewAllEmployees} = require('./utils/viewData');
const {addDepartment, addRole, addEmployee} = require('./utils/addData');

const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"Cash1234",
    database:"employee_tracker"

})

const menuPrompt = ()=>{
   console.clear();
    return inquirer
    .prompt({
        type:'list',
        name:'action',
        message:"Please choose an option:",
        pageSize:8,
        choices : [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add an employee',
            'Add a role',
            'Update employee role',
            'Exit'
        ]
    })
    .then(answers => {
        
        switch(answers.action){
            case 'View all departments':       
                viewAllDepartments(db)
                break;

            case 'View all roles':
                viewAllRoles(db)
                break;

            case 'View all employees':
                viewAllEmployees(db)
                break;

            case 'Add a department':
                inquirer
                .prompt({
                    type:'input',
                    name: 'name',
                    message:'Enter department name:',
                })
                .then(input => {
                    addDepartment(input.name,db);
                    menuPrompt();
                })
                return;

            case 'Add a role':
                inquirer
                .prompt([
                    {
                        type:'input',
                        name: 'name',
                        message:'Enter new role name:'
                    },
                    {
                        type:'number',
                        name:'salary',
                        message:'Enter salary for new role:'
                    },
                    {
                        type:'number',
                        name:'department_id',
                        message:"Enter department ID for new role:"
                    }
                ])
                .then(input =>{
                    addRole(input,db);
                    menuPrompt();
                })
                return;

            case 'Add an employee':
                inquirer
                .prompt([
                    {
                        type:'input',
                        name:'first_name',
                        message:"Enter new employee's first name?"
                    },
                    {
                        type:'input',
                        name:'last_name',
                        message: "Enter new employee's last_name?"
                    },
                    {
                        type:'input',
                        name:'role',
                        message:"Enter new employee's role?"

                    },
                    {
                        type:'input',
                        name:'manager_id',
                        message:"Enter new employee's manager?"
                    }

                ])
                .then(input=>{
                    addEmployee(input,db);
                    menuPrompt();
                })
                return;

            case 'Update employee role':
                updateEmployeeRole(db);
                break;

            default:
                db.end();
        }
    
       menuPrompt();
    })
}

menuPrompt();
