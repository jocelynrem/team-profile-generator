const inquirer = require("inquirer");
const fs = require("fs");
const validator = require("email-validator");


const Employee = require("./lib/Employee")
const Engineer = require("./lib/Engineer")
const Manager = require("./lib/Manager")
const Intern = require("./lib/Intern")

const employeeQues = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter employee name:',
    },
    {
        type: 'input',
        name: 'id',
        message: 'Employee ID:',
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

const managerQues = [
    {
        type: 'input',
        name: 'officeNum',
        message: "Team manager office number:"
    }
];

const teamQues = [
    {
        type: 'list',
        name: 'title',
        message: "Which type of team member would you like to add?",
        choices: ['Engineer', new inquirer.Separator(), 'Intern'],
    }
];


const engineerQues = [
    {
        type: 'input',
        name: 'github',
        message: 'Enter the engineer\'s GitHub username',
    },
]

const internQuest = [
    {
        type: 'input',
        name: 'school',
        message: 'What school does the intern attend?',
    },
]

const managerHTML = (manager) => {
    const { name, id, officeNum, email } = manager
    const mHTML = `
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
    <div>`
    fs.appendFile('./dist/team.html', mHTML, (err) => err ? console.log(err) : '')
}

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
}

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
}

const managerFIN = () => {
    inquirer.prompt(employeeQues).then((answers) => {
        const employee = new Employee(answers.name, answers.id, answers.email)
    }).then (() =>
    inquirer.prompt(managerQues).then((answers) => {
        const manager = new Manager(answers.officeNum)
        managerHTML(manager);
    }).then(() => {
        anotherEmployee();
    })
    )}

const anotherEmployee = () => {
    inquirer.prompt(teamQues).then((answer) => {
        if (answer.role === 'Engineer') {
            inquirer.prompt(employeeQues).then((answers) => {
                const engineer = new Engineer(answer.name, answers.id, answers.github, answers.email)
                engineer.role = new Engineer().getRole();
                engineerHTML(engineer);
                addMoreorDone()
            })
        } else {
            inquirer.prompt(employeeQues, internQuest).then((answers) => {
                const intern = new Intern(answers.name, answers.id, answers.school, answers.email)
                intern.role = new Intern().getRole();
                internHTML(intern);
                addOrDone()
            })
        }
    })
}

const addOrDone =() => {
    inquirer.prompt([{
        type: 'confirm',
        name: 'newTeamMem',
        message: 'Add more team members?',
        default: true,
    }]).then((answer) => {
        if (answer.newTeamMem) {
            teamQues();
        } else {
            console.log('Team Profile has been generated');
        }
    });
}

managerFIN()