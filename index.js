const mysql = require('mysql2');

const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"Cash1234",
    database:"employee_tracker"

})

db.query(`SELECT employee.*, roles.title AS role
FROM employee
LEFT JOIN roles ON employee.roles_id = roles.id
RIGHT JOIN department ON roles.department_id = department.id`,(err,rows)=>{
    if(err){
        console.log("Error!!",err.message);
        return;
    } else {
        console.log(rows);
    }
})