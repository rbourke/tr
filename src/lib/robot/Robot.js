/**
 * robot module.
 * @module lib/robot/Robot
 */

/**
 * robot object constructor.
 * @constructor
 * @param {Table} table - The table for the robot.
 * @param {string} config - The config for the robot.
 */
function Robot(table, config) {

    if (!(this instanceof Robot)) {
        return new Robot(table, config);
    }

    this.command = config.command;
    this.facing = config.facing;
    this.placed = false;
    this.xOrdinate;
    this.yOrdinate;
    this.directionFacing;
    this.table = table;
}

/**
 * verifies whether a position on the table can be occupied by the robot.
 * @param {number} xOrdinate - The X ordinate of the position being validated.
 * @param {number} yOrdinate - The Y ordinate of the position being validated.
 * @return {boolean} Whether the robot can occupy the position.
 */
Robot.prototype.isPositionValid = function(xOrdinate, yOrdinate) {

    return !isNaN(xOrdinate) &&
            !isNaN(yOrdinate) &&
            xOrdinate >= 0 &&
            yOrdinate >= 0 &&
            xOrdinate < this.table.getWidth() &&
            yOrdinate < this.table.getLength();
};

/**
 * verfies whether a direction is valid.
 * @param {string} directionFacing - The X ordinate of the position being validated.
 * @return {boolean} Whether the direction is a valid direction.
 */
Robot.prototype.isDirectionFacingValid = function(directionFacing) {

    return [this.facing.NORTH, this.facing.EAST, this.facing.SOUTH, this.facing.WEST].includes(directionFacing); 
};

/**
 * places the robot at a location and orientation.
 * @param {number} xOrdinate - The X ordinate for the position of the robot.
 * @param {number} yOrdinate - The Y ordinate for the position of the robot.
 * @param {string} directionFacing - The orientation of the robot.
 * @return {boolean} Whether the robot was placed successfully.
 */
Robot.prototype.placeRobotAtPosition = function(xOrdinate, yOrdinate, directionFacing) {

    if (this.isPositionValid(xOrdinate, yOrdinate) && this.isDirectionFacingValid(directionFacing)) {
        this.xOrdinate = xOrdinate;
        this.yOrdinate = yOrdinate;
        this.directionFacing = directionFacing;
        return true;
    } else {
        return false;
    }
};

/**
 * moves the robot forward in the direction it is facing.
 * @return {boolean} Whether the robot was able to move.
 */
Robot.prototype.moveForward = function() {

    switch(this.directionFacing) {

        case this.facing.NORTH:
            if (this.isPositionValid(this.xOrdinate, this.yOrdinate + 1)) {
                this.yOrdinate++;
                return true;
            } else {
                return false;
            }
        case this.facing.EAST:
            if (this.isPositionValid(this.xOrdinate + 1, this.yOrdinate)) {
                this.xOrdinate++;
                return true;
            } else {
                return false;
            }
        case this.facing.SOUTH:
            if (this.isPositionValid(this.xOrdinate, this.yOrdinate - 1)) {
                this.yOrdinate--;
                return true;
            } else {
                return false;
            }
        case this.facing.WEST:
            if (this.isPositionValid(this.xOrdinate - 1, this.yOrdinate)) {
                this.xOrdinate--;
                return true;
            } else {
                return false;
            }
        default:
    }

};

/**
 * rotates the robot 90 degrees to the left of its current orientation.
 * @return {boolean} Whether the robot was able to turn left.
 */
Robot.prototype.turnLeft = function() {

    switch(this.directionFacing) {
        case this.facing.NORTH:
            this.directionFacing = this.facing.WEST;
            break;
        case this.facing.EAST:
            this.directionFacing = this.facing.NORTH;
            break;
        case this.facing.SOUTH:
            this.directionFacing = this.facing.EAST;
            break;
        case this.facing.WEST:
            this.directionFacing = this.facing.SOUTH;    
            break;
        default:
            // ignore invalid directions
    }
};

/**
 * rotates the robot 90 degrees to the right of its current orientation.
 * @return {boolean} Whether the robot was able to turn right.
 */
Robot.prototype.turnRight = function() {

    switch(this.directionFacing) {
        case this.facing.NORTH:
            this.directionFacing = this.facing.EAST;
            break;
        case this.facing.EAST:
            this.directionFacing = this.facing.SOUTH;
            break;
        case this.facing.SOUTH:
            this.directionFacing = this.facing.WEST;
            break;
        case this.facing.WEST:
            this.directionFacing = this.facing.NORTH;    
            break;
        default:
            // ignore invalid directions
    }
};

/**
 * @return {string} The direction the robot is currently facing.
 */
Robot.prototype.getDirectionFacing = function() {

    return this.directionFacing;
};

/**
 * @return {number} The X ordinate of the robot's current position on the table.
 */
Robot.prototype.getXordinate = function() {

    return this.xOrdinate;
};

/**
 * @return {number} The Y ordinate of the robot's current position on the table.
 */
Robot.prototype.getYordinate = function() {

    return this.yOrdinate;
};

/**
 * @return {string} The robot's current position and orientation on the table.
 */
Robot.prototype.report = function() {

    return "Output: " + this.xOrdinate + "," + this.yOrdinate + "," + this.directionFacing;
}

/**
 * parses and executes a command string.
 * @param {string} input - The command line entered via stdin.
 * @return {boolean} Whether the command was parsed and executed successfully.
 */
Robot.prototype.processInput = function(input) {

    let args = input.split(/[\s,]+/); // split at commas & spaces

    switch (args[0].toUpperCase()) {
        case this.command.PLACE:
            if (args.length > 3) {
                if (this.placeRobotAtPosition(Number(args[1]), Number(args[2]), args[3].toUpperCase())) {
                    this.placed = true;
                    return true;
                }
            }
            return false;
        case this.command.LEFT:
            if (this.placed) {
                this.turnLeft();
            } else {
                return false;
            }
            break;
        case this.command.RIGHT:
            if (this.placed) {
                this.turnRight();
            } else {
                return false;
            }
            break;
        case this.command.MOVE:
            if (this.placed) {
                return this.moveForward();
            } else {
                return false;
            }
        case this.command.REPORT:
            if (this.placed) {
                /* eslint-disable no-console */
                console.log(this.report());
            } else {
                return false;
            }
            break;
        default:
            return false;
            // ignore invalid commands
    }
    return true;
}

module.exports = {
    Robot
};