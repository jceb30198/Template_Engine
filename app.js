const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Empty array to push the hired people into
const hiredArr = [];

// Questions for the prompt
const employeeArr = [
    {
        type: "input",
        name: "name",
        message: "Name of employee"
    },
    {
        type: "input",
        name: "id",
        message: "ID number of employee"
    },
    {
        type: "input",
        name: "email",
        message: "Email address of employee"
    },
    {
        type: "list",
        name: "role",
        message: "Role of employee",
        choices: ["Manager", "Engineer", "Intern"]
    }
];

// Special objects for the whichever role is chosen
const managerObj = {
        type: "input",
        name: "officeNumber",
        message: "Manager office number"
};

const engineerObj = {
    type: "input",
    name: "github",
    message: "Engineer Github username"
};

const internObj = {
    type: "input",
    name: "school",
    message: "School that the intern is attending"
};

// Prompt code to run through the question array and there are conditionals based on the role
inquirer.prompt(employeeArr).then(function(response){
    if (response.role === "Manager") {
        console.log("Chose Manager");
        inquirer.prompt(managerObj).then(function(data){
            const manager = new Manager(response.name, response.id, response.email, data.officeNumber);
            hiredArr.push(manager);
            htmlFunc();
        });
    }
    else if (response.role === "Engineer") {
        console.log("Chose Engineer");
        inquirer.prompt(engineerObj).then(function(data){
            const engineer = new Engineer(response.name, response.id, response.email, data.github);
            hiredArr.push(engineer);
            htmlFunc();
        });
    }
    else {
        console.log("Chose Intern");
        inquirer.prompt(internObj).then(function(data){
            const intern = new Intern(response.name, response.id, response.email, data.school);
            hiredArr.push(intern);
            htmlFunc();
        });
    }
});

// Final function to write down on the html file
function htmlFunc(){
    const output = render(hiredArr);
    fs.writeFileSync(outputPath, output, function(err) {
        if (err) throw err;
    });
}