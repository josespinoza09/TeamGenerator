const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { create } = require("domain");

const employees = []

async function getManager() {
    const mQuestions = [
        { message: 'What is the managers name?', name: 'name' },
        { message: 'What is the managers id?', name: 'id' },
        { message: 'What is the managers email?', name: 'email' },
        { message: 'What is the managers office number?', name: 'officeNum' }
    ]

    const response = await inquirer.prompt(mQuestions)
    const manager = new Manager(response.name, response.id, response.email, response.officeNum)
    employees.push(manager)
    fs.writeFileSync(outputPath, render(employees), 'UTF-8')
    createEmployees()
}
getManager()

async function createEmployees() {
    const employeeSelection = await inquirer.prompt([
        { type: 'list', message: 'Select the employee you want to add.', name: 'employee', choices: ['Engineer', 'Intern', 'No more employees'] }
    ])
    if (employeeSelection.employee === 'Engineer'){
        getEngineer();
    }else if(employeeSelection.employee === 'Intern'){
        getIntern();
    }else{
        process.exit
    }
}
async function getEngineer(){
    const eQuestions = [
        { message: 'What is the engineers name?', name: 'name' },
        { message: 'What is the engineers id?', name: 'id' },
        { message: 'What is the engineers email?', name: 'email' },
        {message:'What is the engineers github?', name:'github'}
    ]
    const response = await inquirer.prompt(eQuestions)
    const engineer = new Engineer(response.name,response.id,response.email,response.github)
    employees.push(engineer)
    fs.writeFileSync(outputPath, render(employees), 'UTF-8')
    createEmployees();
}

async function getIntern(){
    const iQuestions = [
        { message: 'What is the engineers name?', name: 'name' },
        { message: 'What is the engineers id?', name: 'id' },
        { message: 'What is the engineers email?', name: 'email' },
        {message: 'What is the interns school?', name:'school'}
    ]
    const response = await inquirer.prompt(iQuestions)
    const intern = new Intern(response.name,response.id,response.email,response.school)
    employees.push(intern)
    fs.writeFileSync(outputPath, render(employees), 'UTF-8')
    createEmployees();
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
