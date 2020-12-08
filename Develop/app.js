const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const util = require("util");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const roleChoice = ["Manager","Intern","Engineer"]

//an Array to store employees in 
let employees = [];


// Questions for all Employees
var e_questions = [
    {
      type: 'input',
      name: 'e_name',
      message: "What is the Employee Name:",
      validate: function (e_email) {
        valid = /^\w+*\s\w+*+$/.test(e_name)
        if (valid) {
            return true;
        } else {
            return 'Please enter a valid name must include first and last name';
        }
        } 

    },
    {
      type: 'input',
      name: 'e_email',
      message: "What's the employee email:",
      validate: function (e_email) {
        valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e_email)
        if (valid) {
            return true;
        } else {
            return 'Please enter a valid email';
        }
        }  
    },
    {
      name: 'e_role',
      type: 'list',
      message: "\nPlease select the user Role:\n",  
      choices: roleChoice
      }
];
// Function that asks the employee questions
function askEmployeeInfo(){
  let ans = [];
  let employee = {};
  console.clear();
  inquirer.prompt(e_questions)
.then(ans = async (ans) => {
    switch (ans.e_role) {
    case 'Manager':
        //remove Manager from choice of roles because there is only one    
        roleChoice.shift();
        //and create a new variable in the array to give custom prompt
        ans.uField = "officeNumber";
        return ans;  
    case "Engineer":
       ans.uField = "github";
       return ans;
    case "Intern":   
       ans.uField = "school";
       return ans;
    }
    })
.then(ans = async(ans) => {
let pop = await lastQ(ans);
return pop;
})
.then(res = async(res) => {
// This how we start getting the employee name just add one to the array    
let cur_id = employees.length + 1;
switch (res.e_role) {
    case 'Manager':
    employee = new Manager(res.e_name,cur_id,res.e_email,res.officeNumber);
    break;  
    case 'Engineer':
    employee = new Engineer(res.e_name,cur_id,res.e_email,res.github);
    break; 
    case 'Intern':   
    employee = new Intern(res.e_name,cur_id,res.e_email,res.school);
    break; 
}
employees.push(employee);
//This calls the function that asks if there are more employees
await moreEmployees();
})
.catch(err => {console.log(err)})
}

//Function to ask if there are more Employees - if not it renders the output
async function moreEmployees(){
    //console.log(ans);
    inquirer.prompt([{
        type: 'confirm',
        name: 'askAgain',
        message: 'Is there aonther Employee: ',
        default: true,
       }])
       .then(res => {
        if(res.askAgain){
            askEmployeeInfo()    
        } else {
        createOutput(employees);    
        return res}
       })

}

// This function is a custom question for each time the last employee question
async function lastQ(ans){
    let var1 = "";
    await inquirer.prompt([{
    type: 'input',
    name: 'uniqueVal',
    message: `Please Enter the information for the ${ans.uField} field: ` 
    }])
    .then(res => {
    var1 = res.uniqueVal;    
    return(ans)
    })
    ans[ans.uField] = var1;
    return(ans);
}

function createOutput(employees){  
    fs.writeFile(outputPath, render(employees), (err) =>
    err ? console.error(err) : console.log(`File Successfully written to ${outputPath}`)
        ); 
}

askEmployeeInfo()
