#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const fs = require("fs").promises;

const argv = yargs(hideBin(process.argv)).option("path", {
  alias: "p",
  type: "string",
  description: "Log file name",
  demandOption: true,
}).argv;

async function parseLogs() {
  try {
    let gameCount = 0;
    let gameWin = 0;
    let gameLose = 0;

    const data = await fs.readFile(argv.path, "utf-8");
    const arrayDataLogs = data.split(" ");

    arrayDataLogs.forEach((item) => {
      if (item === "START") {
        gameCount += 1;
      }

      if (item === "WIN") {
        gameWin += 1;
      }

      if (item === "LOSE") {
        gameLose += 1;
      }
    });
    console.log("Общее количество партий", gameCount);
    console.log("Количество выигранных партий", gameWin);
    console.log("Количество проигранных партий", gameLose);
    console.log("Процентное соотношение выигранных партий", gameWin / gameCount * 100)

  } catch (error) {
    console.log(error);
  }
}

parseLogs();
