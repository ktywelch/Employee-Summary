// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Intern extends Employee {

    constructor(name,id,email,school){        
        //const role = "manager"

        super(name,id,email)
        this.school = school;
        this.role = "Intern";
    }

    getRole(){
        return this.role;
    }
    
    getSchool(){
        return this.school;
    }
    
}
module.exports = Intern;