// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name,id,email) {
      this.name = name;
      this.id = id;
      this.email = email;
      this.role = "";
    }
  
    getId(){
      return this.id;
    }
    getName(){
        return this.name;
    }
    getEmail(){
        return this.email;
    }
    getRole(){
        this.role = "Employee";
        return this.role;
    }
  }
  
  module.exports = Employee;