/*eslint quotes: ["error", "single"]*/
/*eslint-env es6*/
/*eslint no-console: ["error", { allow: ["log","info", "error"] }] */

let inputFilePath = 'input.txt';
if (process.argv[2]) {
    inputFilePath = process.argv[2];
    console.info('Used filename provided as argument:', inputFilePath);
}

// const inputData = require('fs').readFileSync(inputFilePath, 'utf-8').split(/\r?\n/);
//
// let  fieldWidth;
// let  fieldHeight;
//
// inputData.forEach(function(line, index) {
//     // if (index == 0)
//
//         console.log(line.split(' '));
// });


// const { once } = require('events');
const { createReadStream } = require('fs');
const { createInterface } = require('readline');
const Mower = require('./Mower2.js');

const lineReader = createInterface({ input: createReadStream(inputFilePath), crlfDelay: Infinity });

let lineCounter = 1;
let area;
let mowerConfig = null;

lineReader.on('line', (line) => {

    // console.log(lineCounter + ')', line);
    if (lineCounter === 1)
    {
        // get Area size
        // area = line.trim().split(' ').map((c) => parseInt(c, 10));
        area = line.trim().split(' ');

        // error check
        // if (area.length !== 2) throw new Error('Wrong area dimension: ' + area.toString());
        checkFormat(lineCounter, area.length, 2);
        checkNumber(lineCounter, area[0], area[1]);
        // if (area[0] < 0 || area[1] < 0) throw new Error('Wrong area coordinates, cannot be < 0');
    }
    else if (lineCounter % 2 === 0)
    {
        // get current Mower
        mowerConfig = line.trim().split(' ');

        // error check
        // if (!line) console.error('Line', lineCounter, 'is empty! No initial position and orientation of the mower.');
        // if (mowerConfig.length !== 3)
        //     throw new Error('Wrong mower config on line ' + lineCounter + ' of ' + inputFilePath);
        checkFormat(lineCounter, mowerConfig.length, 3);
        checkNumber(lineCounter, mowerConfig[0], mowerConfig[1]);
        // if (parseInt(mowerConfig[0]) < 0 || parseInt(mowerConfig[1]) < 0)
        //     throw new Error('Mover coordinated can not be < 0 on line ' + lineCounter + ' of ' + inputFilePath);
    }
    else
    {
        // get current Mower path
        const autoMower = new Mower(mowerConfig, area);
        autoMower.runForestRun(line);
        // console.log(autoMower.position);
        console.log(autoMower.getState());
        // console.log('Current mower', mowerConfig, 'path:', line);
    }
    lineCounter++;
});


function checkFormat(lineN, arrLength, lengthReq) {
    if (!arrLength) throw new Error('Error in the input file, line ' + lineN + 'cannot be empty');
    if (arrLength !== lengthReq) throw new Error('Error in the input file, line ' + lineN +
        '. Must be ' + lengthReq + ' parameters');
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
