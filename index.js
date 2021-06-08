const inquirer = require("inquirer");
const fs = require("fs");
const validateEmail = require("js-email-validator");

const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");


const managerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'Manager name:',
    },
    {
        type: 'input',
        name: 'id',
        message: 'Manager ID:',
    },

    {
        type: 'input',
        name: 'officeNum',
        message: "Manager Office number:",
    },
    {
        type: 'input',
        name: 'email',
        message: 'Manager email:',
        validate: (value) => {
            if (!validateEmail(value)) {
                console.log(`\n Please enter a valid response.`)
            } else {
                return true;
            }
        }
    }

]
const teamQuestions = [
    {
        type: 'list',
        name: 'title',
        message: "Employee Title:",
        choices: ['Engineer', 'Intern'],   
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
        validate: (value) => {
            if (!validateEmail(value)) {
                console.log(`\n Please enter a valid response.`)
            } else {
                return true;
            }
        }
    }
]

const startGen = () => {
    inquirer.prompt(managerQuestions).then((answers) => {
        const manager = new Manager(answers.name, answers.id, answers.officeNum, answers.email)
        managerHTML(manager);
        addOrDone();
    })
}

const newTeamMember = () => {
    inquirer.prompt(teamQuestions).then((answers) => {
        if (answers.title === 'Engineer') {
            const engineer = new Engineer(answers.name, answers.id, answers.github, answers.email)
            engineerHTML(engineer);
        } else {
            const intern = new Intern(answers.name, answers.id, answers.school, answers.email)
            internHTML(intern)
        }
        addOrDone();
    })
}

const managerHTML = (manager) => {
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
            <h1 class="display-1">My Team</h1>
        </div>
    </div>
    <div class=container>
        <div class="row">
            <div class =col>
                <div class="card" style="width: 15rem;">
                    <div class="card-header bg-dark text-white">
                        <h4>Manager</h4>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${manager.getName()}</h5>
                        <ul>
                            <li>ID: ${manager.getId()}</li>
                            <li>${manager.getOfficeNum()}</li>
                            <li><a href="mailto:${manager.getEmail()}" class="card-link">${manager.getEmail()}</a></li>
                        </ul>
                    </div>
                </div>
            </div>`
    fs.writeFile('./dist/team.html', mHTML, (err) => err ? console.log(err) : '')
};

const engineerHTML = (engineer) => {
    const eHTML = `
    <div class="col">
        <div class="card" style="width: 15rem;">
            <div class="card-header bg-primary text-white">
                <h4>Engineer</h4>
            </div>
            <div class="card-body">
                <h5 class="card-title">${engineer.getName()}</h5>
                <ul>
                    <li>ID: ${engineer.getId()}</li>
                    <li><a href="https://github.com/${engineer.getGithub()}" target="_blank" class="card-link">GitHub: ${engineer.getGithub()}</a></li>
                    <li><a href="mailto:${engineer.getEmail()}" class="card-link">${engineer.getEmail()}</a></li>
                </ul>
            </div>
        </div>
    </div>`
    fs.appendFile('./dist/team.html', eHTML, (err) => err ? console.log(err) : '')
};

const internHTML = (intern) => {
    const iHTML = `
    <div class="col">
        <div class="card" style="width: 15rem;">
            <div class="card-header bg-info text-white">
                <h4>Intern</h4>
            </div>
            <div class="card-body">
                <h5 class="card-title">${intern.getName()}</h5>
                <ul>
                    <li>ID: ${intern.getId()}</li>
                    <li>${intern.getSchool()}</li>
                    <li><a href="mailto:${intern.getEmail()}" class="card-link">${intern.getEmail()}</a></li>
                </ul>
            </div>
        </div>
    </div>`
    fs.appendFile('./dist/team.html', iHTML, (err) => err ? console.log(err) : '')
};

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

startGen();
