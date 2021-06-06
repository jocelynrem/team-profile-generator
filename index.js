const inquirer = require("inquirer");
const fs = require("fs");

const Employee = require("./lib/Employee")
const Engineer = require("./lib/Engineer")
const Manager = require("./lib/Manager")
const Intern = require("./lib/Intern")

const managerQues = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter the team manager name:',
    },
    {
        type: 'input',
        name: 'id',
        message: 'Team manager ID:',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Team manager email:'
    },
    {
        type: 'input',
        name: 'officeNum',
        message: "Team manager office number:"
    },
];

const teamQues = [
    {
        type: 'list',
        name: 'teamRole',
        message: "Which type of team member would you like to add?",
        choices: ['Engineer', new inquirer.Separator(), 'Intern'],
    }
];


const engineerQues = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter the employee name:',
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
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter the engineer\'s GitHub username',
    },
]

const internQuest = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter intern name:',
    },
    {
        type: 'input',
        name: 'id',
        message: 'Intern ID:',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Intern email:',
    },
    {
        type: 'input',
        name: 'school',
        message: 'What school does the intern attend?',
    },
]

const managerCall = () => {
    inquirer.prompt(managerQues).then((answers) => {
        const manager = new Manager(answers.name, answers.id, answers.officeNum, answers.email)
        manager.role = new Manager().getRole();
        mgrHtml(manager);
    }).then(() => {
        teamQues();
    })
}

const managerHTML = (manager) => {
    const { name, id, email, officeNum } = manager
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
            </div>
        </div>
    <div>`
    fs.appendFile('./dist/team.html', mHTML, (err) => err ? console.log(err) : '')
}