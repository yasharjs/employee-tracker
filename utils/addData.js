const { viewAllDepartments, viewAllRoles, viewAllEmployees } = require('./viewData');

const addDepartment = (input, db) =>{
   sql = `INSERT INTO department (name) VALUES (?)`;

    db.query(sql,input,(err,rows)=>{
        if (err){
            console.clear();
            console.log("Error: ",err.message);
            return;
        }
        else{   
            viewAllDepartments(db);
    
        }
    })
   
}

const addRole = (input, db)=>{
    const sql = `
    INSERT INTO roles (title,salary,department_id)
    VALUES (?,?,?)`;
    const params = [input.name,input.salary,input.department_id];
    db.query(sql,params,(err,rows)=>{
        if(err){
            console.clear();
            console.log("Error: ",err.message);
        }
        else{
            viewAllRoles(db);
        }
    })
}

const addEmployee = (input,db)=>{

    const sql = `
    INSERT INTO employee(
      first_name,
      last_name,
      roles_id,
      manager_id)
    VALUES (?,?,?,?)`;

    const params = [input.first_name,input.last_name,input.role,input.manager_id];

    db.query(sql,params,(err,rows)=>{
        if(err){
            console.clear();
            console.log("Error: ",err.message);
        }
        else{
            console.clear();
            console.log("New employee added successfully!");
            viewAllEmployees(db);
        }
    })

}

module.exports  = {addDepartment, addRole, addEmployee};