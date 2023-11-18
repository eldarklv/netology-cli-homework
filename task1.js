#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
const fs = require("fs");
const path = require("path");
const Helper = require("./helper.js");

const helper = new Helper();

const rl = readline.createInterface({ input, output });

const argv = yargs(hideBin(process.argv)).option("logs", {
  alias: "l",
  type: "string",
  description: "Log file name",
  demandOption: true,
}).argv;

const dir = path.join(__dirname, "logs");
const filePath = path.join(dir, argv.logs);
console.log(filePath);

// создать дирректорию logs, если ее нет
if (!fs.existsSync(dir)) {
  fs.mkdir(dir, (error) => {
    if (error) throw Error(error);
  });
}

async function startGame() {
  console.log("ОРЕЛ И РЕШКА: отгадай случайное число (1 или 2) \n ");

  // создать дирректорию logs, если ее нет
  if (!fs.existsSync(dir)) {
    await fs.mkdir(dir, (error) => {
      if (error) throw Error(error);
    });
  }

  // записываем в логи, что игра началась
  const logGameStarted = "GAME START " + new Date() + "\n ";
  await fs.appendFile(filePath, logGameStarted, (error) => {
    if (error) throw Error(error);
  });

  // генерация рандомного числа, запись в лог этого числа
  const randomNumber = helper.getRandomInt(1, 3); // не включая 3
  await fs.appendFile(
    filePath,
    `GENERATED randomNumber=${randomNumber} \n `,
    (error) => {
      if (error) throw Error(error);
    }
  );

  console.log(randomNumber); // читы

  // запрашиваем ответ от игрока, логгируем его действие
  let gameResult = "";
  rl.question("Введите число: ", async (answer) => {
    if (+answer !== randomNumber) {
      console.log("Неверно");
      gameResult = "GAME LOSE \n ";
      await fs.appendFile(
        filePath,
        `USER ACTION wrong answer=${answer} \n `,
        (error) => {
          if (error) throw Error(error);
        }
      );
    } else {
      console.log("Ты выйграл!");
      gameResult = "GAME WIN \n";
      await fs.appendFile(
        filePath,
        `USER ACTION correct answer=${answer} \n `,
        (error) => {
          if (error) throw Error(error);
        }
      );
    }
    await fs.appendFile(filePath, gameResult, (error) => {
      if (error) throw Error(error);
    });
    rl.close();
  });
}

startGame();
