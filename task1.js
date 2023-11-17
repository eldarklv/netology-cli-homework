#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
const fs = require("fs");
const path = require("path");
const Helper = require("./helper.js");
const { error } = require("node:console");

const helper = new Helper();

const rl = readline.createInterface({ input, output });

const argv = yargs(hideBin(process.argv)).option("logs", {
  alias: "l",
  type: "string",
  description: "Log file name",
  demandOption: true,
}).argv;

console.log(argv);
const dir = path.join(__dirname, "logs");
const filePath = path.join(dir, argv.logs);

// создать дирректорию logs, если ее нет
if (!fs.existsSync(dir)) {
  fs.mkdir(dir, (error) => {
    if (error) throw Error(error);
  });
}

const fileHeader = "GAME STARTED: " + new Date();
fs.writeFile(filePath, fileHeader, (error) => {
  if (error) throw Error(error);
});

// генерация рандомного числа
const randomNumber = helper.getRandomInt(1, 3); // не включая 3
console.log(randomNumber); // читы

console.log("ОРЕЛ И РЕШКА: отгадай случайное число (1 или 2) \n");

function startGame() {
  rl.question("Введите число: ", (answer) => {
    if (+answer !== randomNumber) {
      console.log("Неверно");
      startGame();
    } else {
      console.log("Ты выйграл!");
      rl.close();
    }
  });
}

startGame();
