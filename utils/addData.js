const { viewAllDepartments } = require('./viewData');

const addDepartment = (input, db) =>{
   sql = `INSERT INTO department (name) VALUES (?)`;

    db.query(sql,input,(err,rows)=>{
        if (err){
            console.clear();
            console.log("Error: ",err.message);
        }
        else{
            console.clear();
            console.log(input+ " department added successfully!");
            viewAllDepartments(db);
        }
    })
   
}

const addRole = (input, db)=>{
    
}
module.exports  = {addDepartment}