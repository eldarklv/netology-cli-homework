#!/usr/bin/env node
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

const min = 0
const max = 100
const randomNumber = Math.floor( (Math.random() * 101) )

console.log(randomNumber) // читы

console.log('Загадано число в диапазоне от ${min} до ${max}')

function startGame() {
    rl.question(`Введите число: `, (answer) => {
        if (randomNumber < answer) {
            console.log('Меньше')
            startGame()
        } else if (randomNumber > answer) {
            console.log('Больше')
            startGame()
        } else {
            console.log(`Отгадано число ${randomNumber}`)
            rl.close()
        }
    })
}

startGame()