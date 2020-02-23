module.exports = function Mower(initArr, rangeArr) {

    const directions = "NESW";

    let x = +initArr[0];
    let y = +initArr[1];
    let direction = directions.indexOf(initArr[2]);

    function turnRight() { direction = (direction === 3 ? 0 : direction + 1); }
    function turnLeft()  { direction = (direction === 0 ? 3 : direction - 1); }

    function step() {
        let x1, y1;
        switch(direction){
            case 0: {x1 = x; 	  y1 = y + 1; 	break;}
            case 1: {x1 = x + 1;  y1 = y; 		break;}
            case 2: {x1 = x; 	  y1 = y - 1; 	break;}
            case 3: {x1 = x - 1;  y1 = y; 		break;}
        }
        if (x1 >= 0 && x1 <= +rangeArr[0] && y1 >= 0 && y1 <= +rangeArr[1]) {
            x = x1;
            y = y1;
        }
    }

    function move(command) {
        switch(command) {
            case "R": { turnRight(); break; }
            case "L": { turnLeft();  break; }
            case "F": { step(); 	 break; }
        }
    }

    this.runForestRun = function (batch) {
        if (!batch) return;
        [...batch].forEach((item) => move(item));
    };

    this.getState = function() {
        return x + " " + y + " " + directions.charAt(direction);
    };
};
