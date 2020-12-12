const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const hiredArr = [];

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
    message: "Intern school that is being attended"
}
inquirer.prompt(employeeArr).then(function(response){
    if (response.role === "Manager") {
        inquirer.prompt(managerObj).then(function(data){
            const manager = new Manager(response.name, response.id, response.email, data.officeNumber);
            console.log(manager);
            hiredArr.push(manager);
        });
    }
    else if (response.role === "Engineer") {
        inquirer.prompt(engineerObj).then(function(data){
            const engineer = new Engineer(response.name, response.id, response.email, data.github);
            console.log(engineer);
            hiredArr.push(engineer);
        });
    }
    else {
        inquirer.prompt(internObj).then(function(data){
            const intern = new Intern(response.name, response.id, response.email, data.school);
            console.log(intern);
            hiredArr.push(intern);
        });
    }
    htmlFunc();
});

function htmlFunc(){
    const output = render(hiredArr);
    fs.writeFileSync(outputPath, output, function(err) {
        if (err) throw err;
    });
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
