const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function askQuestionsM() {
  console.log("Welcome to your team's webpage generator, manager! ")
  console.log("-------------")
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Alright Manager, what's the name of the team and/or project?"
    },{
        type: "input",
        name: "manager",
        message: "Great, and what's your name?"
      },{
        type: "input",
        name: "email",
        message: `What's an email that people can contact you on?? `
      },{
        type: "input",
        name: "github",
        message: `Alright, what is your github username? `
      },
  ]);
}
  
function nextEmployee(){
    return inquirer.prompt([
  {
    type: "input",
    name: "position",
    message: "ok now is the next employee an engineer or an intern?"
  },{
      type: "input",
      name: "employeeName",
      message: "What's their name?"
    },{
      type: "input",
      name: "employeeEmail",
      message: `What is their email address? `
    },{
      type: "input",
      name: "employeeGithub",
      message: `Enter their github if they're an engineer, and their school if they're an intern!`
    },
]);
}
//ask if he wants to add any engineers, yes = prompt for engineer info, no = prompt for intern info
//ask if he wants to add any more interns, yes = prompt for intern info, no = finish...


  function generateHTML(employeeAnswers, answers){
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <link rel="stylesheet" href="./style.css">
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>${answers.name}</title>
    </head>
    <body>
    <div class="header">
        <h1 class="title">${answers.name}</h1><br>
        <h2 class="title">lead by ${answers.manager}</h2>
    </div> 
    
    <div class="ManagerCard">
    <div class="cardTitle">
        <h2>${answers.manager}</h2>
        <h2>Roll: Manager</h2>
    </div>
        <h2>Email: <br>${answers.email}</h2>
        <h2>Github: <br><a target ="_blank" href="https://www.github.com/${answers.github}">www.github.com/${answers.github}</a></h2>
    </div>

    <div class="ManagerCard">
    <div class="cardTitle">
        <h2>${employeeAnswers.employeeName}</h2>
        <h2>Roll: ${employeeAnswers.position}</h2>
    </div>
        <h2>Email: <br>${employeeAnswers.employeeEmail}</h2>
        <h2>Github: <br><a target ="_blank" href="https://www.github.com/${employeeAnswers.employeeGithub}">www.github.com/${employeeAnswers.employeeGithub}</a></h2>
    </div>
    
    </body>
    </html>`;
  }

  async function init() {
    console.log("mode.")
      try{

      const answers = await askQuestionsM();
      const employeeAnswers = await nextEmployee()

          console.log("Alright, generating your webpage now boss! ")
      const htmldoc = generateHTML(employeeAnswers, answers);
  
      await writeFileAsync("index.html", htmldoc);
  
      console.log("COOL! Your new team webpage is ready to go.");
      }catch(err) {
        console.log(err); 
      }
    } 
  
  
  init();
