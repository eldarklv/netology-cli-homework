#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const { boolean } = require('yargs')

const argv = yargs(hideBin(process.argv)).option(
    "year", {
        alias: "y",
        default: false
    }
).option(
    "month", {
        alias: "m",
        default: false
    }
).option(
    "date", {
        alias: "d",
        default: false
    }
).argv

console.log(argv)

const date = new Date()

if (argv._.includes('current') && !argv.year && !argv.month && !argv.date) {
    console.log(date)
} else if (argv._.includes('current') && argv.year && !argv.month && !argv.date) {
    console.log(date.getFullYear())
} else if (argv._.includes('current') && !argv.year && argv.month && !argv.date) {
    console.log(date.getMonth() + 1)
} else if (argv._.includes('current') && !argv.year && !argv.month && argv.date) {
    console.log(date.getDate())
}

// кейс когда задают + 1234 дня надо конвертировать в месяцы и годы
if(argv._.includes('add') && argv.year && !argv.month && !argv.date) {
    const newYear = date.getFullYear() + argv.year
    date.setFullYear(newYear)
    console.log(newYear)
} else if (argv._.includes('add') && !argv.year && argv.month && !argv.date) {
    const newMonth = date.getMonth() + 1 + argv.month
    console.log(newMonth)
} else if (argv._.includes('add') && !argv.year && !argv.month && argv.date) {
    const newDate = date.getDate() + argv.date
    console.log(newDate)
}

if(argv._.includes('sub') && argv.year && !argv.month && !argv.date) {
    const newYear = date.getFullYear() - argv.year
    date.setFullYear(newYear)
    console.log(newYear)
} else if (argv._.includes('sub') && !argv.year && argv.month && !argv.date) {
    const newMonth = date.getMonth() + 1 - argv.month
    console.log(newMonth)
} else if (argv._.includes('sub') && !argv.year && !argv.month && argv.date) {
    const newDate = date.getDate() - argv.date
    console.log(newDate)
}