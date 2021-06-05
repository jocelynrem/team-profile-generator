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
        name: 'ID',
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

const roleQues = [
    {
        type: 'list',
        name: 'role',
        message: "Which type of team member would you like to add?",
        choices: ['Engineer', 'Intern'],
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
        name: 'ID',
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
        name: 'ID',
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
