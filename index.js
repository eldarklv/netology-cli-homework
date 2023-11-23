#!/usr/bin/env node
const http = require("http");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const config = require("./config.js");

const argv = yargs(hideBin(process.argv)).option("city", {
  alias: "c",
  type: "string",
  description: "City name",
  demandOption: true,
}).argv;

const weatherApi = `http://api.weatherstack.com/current?access_key=${config.ACCESS_KEY}&query=${argv.city}`;

http
  .get(weatherApi, (res) => {
    const { statusCode } = res;
    if (statusCode !== 200) {
      console.log(`status code: ${statusCode}`);
      return;
    }

    res.setEncoding("utf8");
    let rowData = "";
    res.on("data", (chunk) => {
      rowData += chunk;
    });
    res.on("end", () => {
      let parsedData = JSON.parse(rowData);

      console.log("Город ", argv.city);
      console.log("Температура ", parsedData.current.temperature);
      console.log("Скорость ветра", parsedData.current.wind_speed);
      console.log(
        "Общее описание ",
        parsedData.current.weather_descriptions[0]
      );

    });
  })
  .on("error", (error) => {
    console.error(error);
  });
