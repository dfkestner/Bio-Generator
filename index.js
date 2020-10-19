const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

const questions = [
    {
        type: "input",
        name: "name",
        message: "What is your name?"
    },
    {
        type: "input",
        name: "github",
        message: "Enter your GitHub Username"
    },
    {
        type: "input",
        name: "linkedin",
        message: "Enter your LinkedIn URL"
    },
    {
        type: "input",
        name: "location",
        message: "Where are you from?"
    },
    {
        type: "input",
        name: "forFun",
        message: "What do you do for fun?"
    },
    {
        type: "confirm",
        name: "pet",
        message: "Do you have pets?"
    },
    {
        type: "confirm",
        name: "pets",
        message: "Do you have more than one pet?",
        when: function (info) {
            return info.pet !== false;
        },
    },
    {
        type: "input",
        name: "petnames",
        message: "What are the names of your pets?",
        when: function(info) {
            return (info.pet !== false && info.pets !== false);
        },
    },
    {
        type: "input",
        name: "petname",
        message: "What is the name of your pet?",
        when: function(info) {
            return (info.pets === false);
        }
    }
];

function makeSomeHTML(info) {
    console.log(info);
    // console.log(pet);
    console.log(info.pet);

    function renderFamiliars(info) {
        if (info.pet == false) {
            return `I have no need of familiars`
        }
        else if (info.pet == true && info.pets == false) {
            return `The name of my familiar is ${info.petname}.`
        }
        else if (info.pet == true && info.pets == true) {
            return `My familiars are ${info.petnames}.`
        }
    };
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">    <title>Document</title>
    </head>
    <body>
        <div class="jumbotron jumbotron-fluid"> 
            <div class="container">
                <h1 class="display-4">Greetings mortal, I am called ${info.name}</h1>
                <hr class="my-4">
                <p>I originally spawned in the land of ${info.location}</p>
                <p>When I'm not conquering worlds, I... ${info.forFun}</p>
                <p>${renderFamiliars(info)}</p>
                <a class="btn btn-primary btn-lg" href="https://github.com/${info.github}" role="button">GitHub Profile</a>
                <a class="btn btn-primary btn-lg" href="${info.linkedin}" role="button">LinkedIn Profile</a>
            </div>
        </div>
    </body>
    </html>`;
}

inquirer.prompt(questions).then((info) => {
    console.log(JSON.stringify(info, null, " "));

    const HTML = makeSomeHTML(info);

    return writeFileAsync("./output/index.html", HTML)
});