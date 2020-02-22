let inputFilePath = './input.txt';
if (process.argv[2]) {
    // inputFilePath = './' + process.argv[2];
    inputFilePath = process.argv[2];
    console.log('Used filename provided as argument:', inputFilePath)
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

// -------------------

// const readline = require('readline');
// const fs = require('fs');
// const readInterface = readline.createInterface({
//     input: fs.createReadStream(inputFilePath),
//     output: process.stdout,
//     console: false
// });
//
// readInterface.on('line', function(line) {
//     console.log(line);
// });
//
// readInterface.on('close', function() {
//     console.log(' - Reader was closed');
// });

// ---------------

const { once } = require('events');
const { createReadStream, open } = require('fs');
const { createInterface } = require('readline');
const Mower = require('./Mower.js');

open(inputFilePath, (err) => {
    if (err) {
        if (err.code === 'ENOENT') {
            console.error(inputFilePath, 'does not exist!');
            console.error('Create "input.txt" file at local directory or provide different file name as run argument');
            // return;
        }
        throw err;
    }


});

(async function processLineByLine() {
    try {
        const lineReader = createInterface({ input: createReadStream(inputFilePath), crlfDelay: Infinity });

        let lineCounter = 0
        let area;
        let currentMower = null;
        // let mowerPath = null;

        lineReader.on('line', (line) => {
            // get Area size
            if (lineCounter === 0)
            {
                area = line.trim().split(' ').map(c => parseInt(c));
                if (area.length !== 2) throw 'Wrong area dimension: ' + area.toString();
                if (area[0] < 1 || area[1] < 1) throw new Error('Wrong area size: sides cannot be < 1');
            }
            else if (lineCounter % 2)
            { // get current Mower
                currentMower = line.trim().split(' ');
                if (currentMower.length !== 3) throw new Error('Wrong mower config on line ' + lineCounter);
                // mowerPath = null;
            }
            else
            { // get current Mower path
                // mowerPath = line;
                // console.log('Current mower', currentMower, 'path:', line);

                const autoMower = new Mower(currentMower, area);
                autoMower.go(line);
                console.log(autoMower.position);
            }

            // console.log(lineCounter + ')', line);
            lineCounter++;
        });

        // await once(lineReader, 'close');
        // console.log('File processed:', lineCounter, 'lines');

        // if (lineCounter % 2 === 0 || lineCounter < 3) throw new Error('Input has wrong format');


    }
    catch (err) {
        console.error('!!ERROR!!')
        console.error(err);
    }
})();




