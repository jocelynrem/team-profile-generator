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
        message: 'Manager name:',
    },
    {
        type: 'input',
        name: 'ID',
        message: 'Manager ID:',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Manager email:'
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: "Manager office number:"
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
