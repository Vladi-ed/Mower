/*eslint quotes: ["error", "single"]*/
/*eslint-env es6*/
const DIRECTIONS = ['N', 'E', 'S', 'W'];

module.exports = class Mower {

    constructor(coordinates, area) {
        this.x = parseInt(coordinates[0], 10);
        this.y = parseInt(coordinates[1], 10);
        this.orientation = coordinates[2];
        this.width = area[0];
        this.height = area[1];
    }

    get position() {
        return `${this.x} ${this.y} ${this.orientation}`;
    }

    turn(where) {
        // console.log('- turn', where);
        const index = DIRECTIONS.indexOf(this.orientation);
        if (where === 'left')  this.orientation = (index > 0 ? DIRECTIONS[index - 1] : DIRECTIONS[DIRECTIONS.length - 1]);
        if (where === 'right') this.orientation = (index === DIRECTIONS.length - 1 ? DIRECTIONS[0] : DIRECTIONS[index + 1]);
    }



    moveForward() {
        switch (this.orientation) {
            case 'N':
                if (this._check(this.x, this.y + 1)) {
                    this.y++;
                    // console.log('go up');
                }
                break;
            case 'E':
                if (this._check(this.x + 1, this.y)) {
                    this.x++;
                    // console.log('go =>');
                }

                break;
            case 'S':
                if (this._check(this.x, this.y - 1)) {
                    this.y--;
                    // console.log('go down');
                }
                break;
            case 'W':
                if (this._check(this.x - 1, this.y)) {
                    this.x--;
                    // console.log('go <=');
                }
                break;
        }
    }


    _check(x, y) {
        // console.log(x, y)
        return x >= 0 && x <= this.width && y >= 0 && y <= this.height;
    }

    go(commands) {
        for (const c of commands.toUpperCase()) {
            switch(c) {
                case 'L':
                    this.turn('left');
                    break;
                case 'R':
                    this.turn('right');
                    break;
                case 'F':
                    this.moveForward();
                    break;
                default:
                    throw new Error('Wrong symbol: ' + c);
            }
        }
    }
};
