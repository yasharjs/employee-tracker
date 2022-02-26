const { viewAllDepartments, viewAllRoles, viewAllEmployees } = require('./viewData');

const addDepartment = (input, db) =>{
   sql = `INSERT INTO department (name) VALUES (?)`;

    db.query(sql,input,(err,rows)=>{
        if (err){
            console.clear();
            console.log("Error: ",err.message);
            console.log("Use arrow keys to choose an option");
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

const addEmployee = (info,manager,db)=>{

    const sql = `
    INSERT INTO employee(
      first_name,
      last_name,
      roles_id,
      manager_id)
    VALUES (?,?,?,?)`;
    const employeeRole = info.role.split(" ")[0];
    const managerId = manager.managers.split(" ")[0];
    const params = [info.first_name,info.last_name,employeeRole,managerId];
    // console.log(params);

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