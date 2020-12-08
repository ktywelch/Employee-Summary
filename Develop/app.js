const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const util = require("util");
const path = require("path");
const fs = require("fs");
const lastQU = util.promisify(lastQ)
let cray = "";

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { Z_BEST_COMPRESSION } = require("zlib");
const roleChoice = ["Manager","Intern","Engineer"]

//an Array to store employees in 
let employees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// Questions for all Employees
var e_questions = [
    {
      type: 'input',
      name: 'e_name',
      message: "What is the EmployeeName:",
    },
    // {
    //   type: 'input',
    //   name: 'e_id',
    //   message: "What is the EmployeeID:"
    // },
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

function askEmployeeInfo(){
  let ans = [];
  let employee = {};
  inquirer.prompt(e_questions)
.then(ans = async (ans) => {
    //ans.e_role comes back as a single element array
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
.then(ans1 = async(ans1) => {
let pop = await lastQ(ans1);
//console.log("poop",pop);
return pop;
})
    //console.log("w",w)
//})    

.then(res = async(res) => {
console.log("Final Response",res)
let cur_id = employees.length + 1;
switch (res.e_role) {
    case 'Manager':
    employee = new Manager(res.e_name,cur_id,res.e_email,res.officeNumber);
    employees.push(employee);
    break;  
    case "Engineer":
    employee = new Engineer(res.e_name,cur_id,res.e_email,res.github);
    employees.push(employee);
    break; 
    case "Intern":   
    employee = new Intern(res.e_name,cur_id,res.e_email,res.school);
    employees.push(employee);
    break; 
}
console.log("employee",employee);
await moreEmployees();
})
// .then(more =>{ 
//     addE(); 
//     console.log(more)
//     askEmployeeInfo() 
// })

//.then(more => {
  //  console.log("last timr", more)
    // addE();
    // if
    // askEmployeeInfo()
//})
.catch(err => {console.log(err)})
}


async function moreEmployees(){
    //console.log(ans);
    inquirer.prompt([{
        type: 'confirm',
        name: 'askAgain',
        message: 'Is there aonther Employee: ',
        default: true,
       }])
       .then(res => {
        console.log(res);
        if(res.askAgain){
            askEmployeeInfo()    
        } else {
        createOutput(employees);    
        return res}
       })
    //console.log(ans);
}

async function lastQ(ans){
    let v = "";
    await inquirer.prompt([{
    type: 'input',
    name: 'uniqueVal',
    message: 'Please Enter ' + ans.uField
    }])
    .then(res => {
    v = res.uniqueVal;    
    return(ans)
    })
    ans[ans.uField] = v;
    return(ans);
}

function createOutput(employees){  
    console.log(outputPath) ;
    fs.writeFile(outputPath, render(employees), (err) =>
    err ? console.error(err) : console.log("Success!")
        ); 
}


askEmployeeInfo()

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
