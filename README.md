![](./Assets/images/)

The Employee-Summary application allows a user to create an engineering team comprising of one Manager, as many interns and developers as needed and  Node CLI that takes in information about employees and generates an HTML webpage that displays summaries for each person.

[Empployee-Summary Application Link]((not applicable this is a JS App))

[Empployee-Summary application can be found on repository Employee-Summary](https://github.com/ktywelch/Employee-Summary)
## Table of contents
* [Title](#Title)
* [Installation](#Installation)
* [Usage](#Usage)
* [Technologies](#Technologies)
* [Contributions](#Contributions)
* [Test](#Test)
* [License](#License)
## Installation
The installation pocess is a download of git source, using npm install to install required modules based on the package.json file included in the same directory as the application.

* Download the Application from github (see link above)
* change to the Developer Directory 
* run "npm install" to install the required modules 

## Useage
Users would use this program to input the employee details for Manager, Developers and Interns on a development team. Where there is only one manager but as many developers and interns as neede. The application generates a team.html file that contains the details of the team.

* Change to the Developer directory in the download location "cd Developer"
* Start the program by running "node app.js"
* Answer the questions for each employee and when completed reply N for when asked if there are additional employees
* Once there are no more employees the output is automatically generated and can be found in the relative path ./output/team.html
![](./Asset/images/)


## Technologies
The application was created using several opensource technologies used in developing javascript code.

* VSCode
* node.js
* jest (testing solution)
* npm and modules util,inquirer,fs

## Contributions
Recognizing contributors and sites that helped in development:

* Lauren Hutchinson - Study Group
* Vincent Gines - Reviewer
## Test
to test the components please run "npm test" from the Developer directory
## License
MIT