const inquirer = require("inquirer");
const fs = require("fs");
const validator = require("email-validator");


const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const { title } = require("process");


const questions = [
    {
        type: 'list',
        name: 'title',
        message: "Employee Title:",
        choices: ['Manager', 'Engineer', 'Intern'],
    },
    {
        type: 'input',
        name: 'name',
        message: 'Employee name:',
    },
    {
        type: 'input',
        name: 'id',
        message: 'Employee ID:',
    },

    {
        type: 'input',
        name: 'officeNum',
        message: "Office number:",
        when: (answers) => answers.title === 'Manager'
    },
    {
        type: 'input',
        name: 'github',
        message: 'GitHub username:',
        when: (answers) => answers.title === 'Engineer'
    },
    {
        type: 'input',
        name: 'school',
        message: 'School:',
        when: (answers) => answers.title === 'Intern'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Employee email:',
        validate: function (response) {
            if (validator.validate("test@email.com")) {
                return true;
            }
            return console.log("Please enter a valid response");
        },
    },
]

// const employeeQues = [
//     {
//         type: 'input',
//         name: 'name',
//         message: 'Enter employee name:',
//     },
//     {
//         type: 'input',
//         name: 'id',
//         message: 'Employee ID:',
//     },
//     {
//         type: 'input',
//         name: 'email',
//         message: 'Employee email:',
//         validate: function (response) {
//             if (validator.validate("test@email.com")) {
//                 return true;
//             }
//             return console.log("Please enter a valid response");
//         },
//     },
// ];

// const managerQues = [
//     {
//         type: 'input',
//         name: 'officeNum',
//         message: "Team manager office number:"
//     }
// ];

// const teamQues = [
//     {
//         type: 'list',
//         name: 'title',
//         message: "Employee Title:",
//         choices: ['Engineer', new inquirer.Separator(), 'Intern'],
//     }
// ];

// const engineerQues = [
//     {
//         type: 'input',
//         name: 'github',
//         message: 'Enter the engineer\'s GitHub username',
//     },
// ];

// const internQuest = [
//     {
//         type: 'input',
//         name: 'school',
//         message: 'What school does the intern attend?',
//     },
// ];

const newTeamMember = () => {
    inquirer.prompt(questions).then((answers) => {
        if (answers.title === 'Manager') {
            const manager = new Manager(answers.name, answers.id, answers.officeNum, answers.email)
            managerHTML(manager);
        } else if (answers.title === 'Engineer') {
            const engineer = new Engineer(answers.name, answers.id, answers.github, answers.email)
            engineerHTML(engineer);
        } else {
            const intern =  new Intern(answers.name, answers.id, answers.school, answers.email)
            internHTML(intern)
        }
        addOrDone();
    })
}

const managerHTML = (manager) => {
    const { name, id, email, officeNum } = manager
    const mHTML = `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Profile</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
</head>

<body>
    <div class="jumbotron jumbotron-fluid bg-success bg-gradient text-white">
        <div class="container">
            <h1 class="display-1">Team Profile</h1>
        </div>
    </div>
    <div class=container>
        <div class="row">
            <div class =col>
                <div class="card" style="width: 13rem;">
                    <div class="card-header bg-dark text-white">
                        <h4>Manager</h4>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <ul>
                            <li>${id}</li>
                            <li>${officeNum}</li>
                            <li><a href="mailto:${email}" class="card-link">${email}</a></li>
                        </ul>
                    </div>
                </div>
            </div>`
    fs.writeFile('./dist/team.html', mHTML, (err) => err ? console.log(err) : '')
};

const engineerHTML = (engineer) => {
    const { name, id, github, email } = engineer
    const eHTML = `
    <div class="col">
        <div class="card" style="width: 13rem;">
            <div class="card-header bg-primary text-white">
                <h4>Engineer</h4>
            </div>
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <ul>
                    <li>${id}</li>
                    <li><a href="https://github.com/${github}" class="card-link">GitHub Profile: ${github}</a></li>
                    <li><a href="mailto:${email}" class="card-link">${email}</a></li>
                </ul>
            </div>
        </div>
    </div>`
    fs.appendFile('./dist/team.html', eHTML, (err) => err ? console.log(err) : '')
};

const internHTML = (intern) => {
    const { name, id, school, email } = intern
    const iHTML = `
    <div class="col">
        <div class="card" style="width: 13rem;">
            <div class="card-header bg-info text-white">
                <h4>Intern</h4>
            </div>
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <ul>
                    <li>${id}</li>
                    <li>${school}</li>
                    <li><a href="mailto:${email}" class="card-link">${email}</a></li>
                </ul>
            </div>
        </div>
    </div>`
    fs.appendFile('./dist/team.html', iHTML, (err) => err ? console.log(err) : '')
};

// const newManager = () => {
//     inquirer.prompt(questions).then((answers) => {
//         const manager = new Manager(answers.name, answers.id, answers.officeNum, answers.email)
//         managerHTML(manager);
//         addOrDone();
//     })
// };

// const addEmployee = () => {
//     inquirer.prompt(employeeQues).then((answers) => {
//         const employee = new Employee(answers.name, answers.id, answers.email)
//         inquirer.prompt(teamQues).then((answer) => {
//             if (answer.title === 'Engineer') {
//                 inquirer.prompt(engineerQues).then((answers) => {
//                     const engineer = new Engineer(answers.github)
//                     engineerHTML(employee, engineer)
//                     addOrDone()
//                 })
//             } else {
//                 inquirer.prompt(internQuest).then((answers) => {
//                     const intern = new Intern(answers.school)
//                     internHTML(employee, intern)
//                     addOrDone()
//                 })
//             }
//         })
//     })
// };

const addOrDone = () => {
    inquirer.prompt([{
        type: 'confirm',
        name: 'newTeamMem',
        message: 'Add more team members?',
        default: true,
    }]).then((answer) => {
        if (answer.newTeamMem) {
            newTeamMember();
        } else {
            console.log('Team Profile has been generated');
            const endHTML = `
            </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4"
                crossorigin="anonymous"></script>
        </body>
        </html>`
            fs.appendFile('./dist/team.html', endHTML, (err) => err ? console.log(err) : '')
        }
    });
};

newTeamMember();