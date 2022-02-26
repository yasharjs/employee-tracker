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
// validate input from prompts
const validateInput = (string) => {
    if (string) {
       return true;
    } else {
       console.log("An answer is required!");
       return false;
    }
 };

 // validate number input from prompts
const validateNumber = (input) => {
    if (!isNaN(input) && input) {
       return true;
    } else {
       console.log("Answer must be a number!");
       return false;
    }
 };

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
                    validate :promptInput => validateInput(promptInput)
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
                        message:'Enter new role name:',
                        validate :promptInput => validateInput(promptInput)
                    },
                    {
                        type:'input',
                        name:'salary',
                        message:'Enter salary for new role:',
                        validate: promptInput => validateNumber(promptInput)

                    },
                    {
                        type:'input',
                        name:'department_id',
                        message:"Enter department ID for new role:",
                        validate: promptInput => validateNumber(promptInput)
                    }
                ])
                .then(input =>{
                    addRole(input,db);
                    menuPrompt();
                })
                return;

            case 'Add an employee':
                const mysql = `SELECT roles.id,roles.title FROM roles ORDER BY id`;
                
                db.query(mysql,(err,rows)=>{
                    if (err){
                        console.log("WHOOOOPS");
                    }
                    const options = rows.map((item)=>{
                        return Object.values(item).join(" ");
                    });

                inquirer
                .prompt([
                    {
                        type:'input',
                        name:'first_name',
                        message:"Enter new employee's first name?",
                        validate :promptInput => validateInput(promptInput)
                    },
                    {
                        type:'input',
                        name:'last_name',
                        message: "Enter new employee's last_name?",
                        validate :promptInput => validateInput(promptInput)
                    },
                    {
                        type:'list',
                        name:'role',
                        message:'Select a role to assign to the new employee',
                        choices:options
                    },
                ])
                .then(answer=>{
                    const sql = `SELECT  employee.id, employee.first_name, employee.last_name FROM employee ORDER BY id`

                    db.query(sql,(err,rows)=>{
                        if(err){
                            console.clear();
                            console.log("Error: ",err.message);
                        }
                        const managers = rows.map((item)=>{
                            return Object.values(item).join(" ");
                        });
                    

                        inquirer
                        .prompt({
                            type:'list',
                            name:'managers',
                            message:'Choose a manager for the new employee:',
                            choices: managers,
                        })
                        .then(manager=>{
                            addEmployee(answer,manager,db);
                            menuPrompt();
                        })
                    })
                })
            })
               return;
            
            case 'Update employee role':
                const sql = `
                SELECT employee.first_name, employee.last_name, employee.id 
                FROM employee
                `;
                db.query(sql,(err,rows)=>{
                    if(err){
                        console.clear();
                        console.log("Error: ",err.message);
                    }
                    else{
                        // create a list of employee names to add to the prompt
                        const options = rows.map((item)=>{
                            return Object.values(item).join(" ");
                        })
            
                        inquirer
                        .prompt(
                         {
                        type:'list',
                        name:'employee',
                        message:'Choose an employee',
                        choices: options
                        }
                        )
                        .then(answer=>{
                            const id = answer.employee.split(" ")[2];
    
                            inquirer
                            .prompt({
                                type:'input',
                                name:'role',
                                message:"Enter the employee's new role ID:",
                                validate :promptInput => validateNumber(promptInput)
                            })
                            .then(answer=>{
                                const newId = answer.role;
                                const sql = `
                                UPDATE employee
                                SET roles_id = ?
                                WHERE id = ?`;

                                db.query(sql,[newId,id],(err)=>{
                                    if(err){
                                        console.clear()
                                        console.log("Error: ",err.message);
                                    }
                                    viewAllEmployees(db);
                                    menuPrompt();
                                })
                            })
                            
                        })
                    }
                  
                })
                return;
            
            default:
                db.end();
                console.clear();
                console.log("Thanks for using employee-tracker!");

                return;
        }
       menuPrompt();
    })
}

menuPrompt();
