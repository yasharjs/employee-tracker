const cTable = require('console.table');

const viewAllDepartments = (db)=> {
    const sql = `
    SELECT
     department.id AS ID, department.name AS "Department Name"
    FROM 
     department
    ORDER BY id`;

    db.query(sql,(err,rows)=>{
        if(err){
            console.log("Error: ",err.message);
        }
        console.log("");
        console.table(rows);
    })
}

const viewAllRoles = (db)=>{
    
    const sql = `
    SELECT
        roles.id AS ID, roles.title AS "Job title", department.name AS Department , roles.salary AS Salary
    FROM 
        roles
    LEFT JOIN department ON roles.department_id = department.id
    
    `;
    db.query(sql,(err,rows)=>{
        if(err){
            console.log("Error: ",err.message);
        }
        console.log("");
        console.table(rows);
        
    });    
}

const viewAllEmployees = (db)=>{
    const sql = `
    SELECT 
        a.id AS Id,
        a.first_name AS "First Name",
        a.last_name AS "Last Name",
        roles.title AS Role,
        department.name AS Department,
        roles.salary AS Salary,
        coalesce(b.first_name,'-') AS Manager
    FROM employee a
        LEFT JOIN employee b ON a.manager_id = b.id
        LEFT JOIN roles ON a.roles_id = roles.id
        LEFT JOIN department ON roles.department_id = department.id
        ORDER BY id
    `;

    db.query(sql,(err,rows)=>{
        if(err){
            console.log("Error: ",err.message);
        }
        console.log("");
        console.table(rows);
    })
}

module.exports = {viewAllDepartments,viewAllRoles,viewAllEmployees};