#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let myBalance = 10000; // Dollar
console.log(chalk.red(`\nYour Current Balance is ${myBalance}\n`));

let myPin = 1234;
console.log(chalk.blue("\n \tATM MACHINE\n"));


let pinAnswer = await inquirer.prompt({
  name: "pin",
  message: "Enter your pin",
  type: "number",
});

if (pinAnswer.pin === myPin) {
  console.log(chalk.gray("\n \tCorrect pin code!!!\n"));

  let operationAns = await inquirer.prompt([
    {
      name: "operation",
      message: "Please select option",
      type: "list",
      choices: ["Withdraw", "Check Balance"],
    },
  ]);

  console.log(operationAns);

  if (operationAns.operation === "Withdraw") {
    let withdrawAns = await inquirer.prompt([
      {
        name: "withdrawMethod",
        type: "list",
        message: "Select a withdrawal method:",
        choices: ["Fast Cash", "Enter Amount"],
      },
    ]);
    if (withdrawAns.withdrawMethod === "Fast Cash") {
      let fastCashAns = await inquirer.prompt([
        {
          name: "fastCash",
          type: "list",
          message: "Select Amount:",
          choices: [1000, 2000, 5000, 10000, 20000, 50000],
        },
      ]);
      if (fastCashAns.fastCash > myBalance) {
        console.log("Insufficient Balance");
      } else {
        myBalance -= fastCashAns.fastCash;
        console.log(`${fastCashAns.fastCash} withdraw Successfully`);
        console.log(`Your Remaining Balance is: ${myBalance}`);
      }
    } else if (withdrawAns.withdrawMethod === "Enter Amount") {
      let amountAns = await inquirer.prompt([
        {
          name: "amount",
          message: "Enter your Amount",
          type: "number",
        },
      ]);

      if (amountAns.amount > myBalance) {
        console.log(`Insufficient Balance`);
      } else {
        myBalance -= amountAns.amount;
        console.log(`Your remaining balance is: ${myBalance}`);
      }
    }
  } else if (operationAns.operation === "Check Balance") {
    console.log(`Your balance is ${myBalance}`);
  }
} else {
  console.log("Incorrect pin code!!!:)");
}
