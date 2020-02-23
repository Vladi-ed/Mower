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

//  require('fs').open(inputFilePath, (err) => {
//     if (err) {
//         if (err.code === 'ENOENT') {
//             console.error(inputFilePath, 'does not exist!');
//             console.error('Create "input.txt" file at local directory or provide different file name as run argument');
//             // return;
//         }
//         throw err;
//     }
// });

const lineReader = createInterface({ input: createReadStream(inputFilePath), crlfDelay: Infinity });

let lineCounter = 1;
let area;
let mowerConfig = null;

lineReader.on('line', (line) => {

    // console.log(lineCounter + ')', line);
    if (lineCounter === 1)
    {
        // get Area size
        area = line.trim().split(' ').map((c) => parseInt(c, 10));

        // error check
        if (area.length !== 2) throw new Error('Wrong area dimension: ' + area.toString());
        if (area[0] < 1 || area[1] < 1) throw new Error('Wrong area size: sides cannot be < 1');
    }
    else if (lineCounter % 2 === 0)
    {
        // get current Mower
        mowerConfig = line.trim().split(' ');

        // error check
        if (!line) console.error('Line', lineCounter, 'is empty! No initial position and orientation of the mower.');
        if (mowerConfig.length !== 3)
            throw new Error('Wrong mower config on line ' + lineCounter + ' of ' + inputFilePath);
    }
    else
    {
        // get current Mower path
        const autoMower = new Mower(mowerConfig, area);
        autoMower.go(line);
        // console.log(autoMower.position);
        console.log(autoMower.getState());
        // console.log('Current mower', mowerConfig, 'path:', line);
    }
    lineCounter++;
});
