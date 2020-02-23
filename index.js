/*eslint quotes: ["error", "single"]*/
/*eslint-env es6*/
/*eslint no-console: ["error", { allow: ["log", "info", "error"] }] */

const { createReadStream } = require('fs');
const { createInterface } = require('readline');
const Mower = require('./mower.js');

let inputFilePath = 'input.txt';
if (process.argv[2]) {
    inputFilePath = process.argv[2];
    // console.info('Used filename provided as argument:', inputFilePath);
}
const lineReader = createInterface({ input: createReadStream(inputFilePath), crlfDelay: Infinity });
let lineCounter = 1;
let area;
let mowerConfig = null;

lineReader.on('line', (line) => {

    if (lineCounter === 1)
    {
        area = line.trim().split(' ');

        // error checking
        checkFormat(lineCounter, area.length, 2);
        checkNumber(lineCounter, area[0], area[1]);
    }
    else if (lineCounter % 2 === 0)
    {
        // get current Mower
        mowerConfig = line.trim().split(' ');

        // error checking
        checkFormat(lineCounter, mowerConfig.length, 3);
        checkNumber(lineCounter, mowerConfig[0], mowerConfig[1]);
        checkLetter(lineCounter, mowerConfig[2]);
    }
    else
    {
        const autoMower = new Mower(mowerConfig, area);
        autoMower.runForestRun(line);
        console.log(autoMower.getState());
    }
    lineCounter++;
});


function checkFormat(lineN, arrLength, lengthReq) {
    if (!arrLength) throw new Error(
        'Error in the input file, line ' + lineN + ' cannot be empty'
    );
    if (arrLength !== lengthReq) throw new Error(
        'Error in the input file, line ' + lineN +
        '. Must be ' + lengthReq + ' parameters!'
    );
}
function checkNumber(lineN, ...numbersToCheck) {

    const errorStr = 'Error in the input file, line ' +
        lineN +
        '. Coordinates must be not negative integer numbers < 2^53 − 1';

    numbersToCheck.forEach(numOrStr => {
        const num = Number('' + numOrStr);
        if (isNaN(num) || !Number.isSafeInteger(num) || num < 0)
            throw new Error(errorStr);
    });
}
function checkLetter(lineN, letter, variants='NESW') {
    if (letter.length !== 1 || !variants.includes(letter.toUpperCase())) throw new Error(
        'Error in the input file, line ' + lineN + '. Wrong symbol: ' + letter
    );
}
