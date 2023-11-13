#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const { boolean } = require('yargs')

const argv = yargs(hideBin(process.argv)).option(
    "year", {
        alias: "y"
    }
).option(
    "month", {
        alias: "m",
    }
).option(
    "date", {
        alias: "d",
    }
).argv

console.log(argv)

const date = new Date()

// получение текущего года, месяца, дня
if (argv._.includes('current') && !argv.year && !argv.month && !argv.date) {
    console.log(date)
} else if (argv._.includes('current') && argv.year && !argv.month && !argv.date) {
    console.log(date.getFullYear())
} else if (argv._.includes('current') && !argv.year && argv.month && !argv.date) {
    console.log(date.getMonth() + 1)
} else if (argv._.includes('current') && !argv.year && !argv.month && argv.date) {
    console.log(date.getDate())
}

// получение года, месяца, дня в будущем
// кейс когда задают + 1234 дня надо конвертировать в месяцы и годы
if(argv._.includes('add') && argv.year && !argv.month && !argv.date) {
    const futureYearUnix = date.setFullYear(date.getFullYear() + argv.year)
    const futureYearIso = new Date(futureYearUnix).toISOString()
    console.log(futureYearIso)
} else if (argv._.includes('add') && !argv.year && argv.month && !argv.date) {
    const futureMonthUnix = date.setMonth(date.getMonth() + argv.month)
    const futureMonthIso = new Date(futureMonthUnix).toISOString()
    console.log(futureMonthIso)
} else if (argv._.includes('add') && !argv.year && !argv.month && argv.date) {
    const futureDateUnix = date.setDate(date.getDate() + argv.date)
    const futureDateIso = new Date(futureDateUnix)
    console.log(futureDateIso)
}

// получение года, месяца, дня в прошлом
// кейс когда задают -1234 дня надо конвертировать в месяцы и годы
if(argv._.includes('sub') && argv.year && !argv.month && !argv.date) {
    const pastYearUnix = date.setFullYear(date.getFullYear() - argv.year)
    const pastYearIso = new Date(pastYearUnix).toISOString()
    console.log(pastYearIso)
} else if (argv._.includes('sub') && !argv.year && argv.month && !argv.date) {
    const pastMonthUnix = date.setMonth(date.getMonth() - argv.month)
    const pastMonthIso = new Date(pastMonthUnix).toISOString()
    console.log(pastMonthIso)
} else if (argv._.includes('sub') && !argv.year && !argv.month && argv.date) {
    const pastDateUnix = date.setDate(date.getDate() - argv.date)
    const pastDateIso = new Date(pastDateUnix)
    console.log(pastDateIso)
}