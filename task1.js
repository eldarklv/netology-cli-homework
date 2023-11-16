#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
const Helper = require("./helper.js");

const helper = new Helper();

const rl = readline.createInterface({ input, output });

const argv = yargs(hideBin(process.argv)).option("logs", {
  alias: "l",
  type: "string",
  description: "Log file name",
  demandOption: true,
}).argv;

const randomNumber = helper.getRandomInt(1, 3); // не включая 3
console.log(randomNumber) // читы

console.log("ОРЕЛ И РЕШКА: отгадай случайное число (1 или 2) \n");

function startGame() {
  rl.question(
    "Введите число: ",
    (answer) => {
      if (+answer !== randomNumber) {
        console.log("Неверно");
        startGame();
      } else {
        console.log("Ты выйграл!");
        rl.close();
      }
    }
  );
}

startGame();
