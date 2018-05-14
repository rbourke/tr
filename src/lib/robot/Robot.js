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

Robot.prototype.isPositionValid = function(xOrdinate, yOrdinate) {

    return !isNaN(xOrdinate) &&
            !isNaN(yOrdinate) &&
            xOrdinate >= 0 &&
            yOrdinate >= 0 &&
            xOrdinate < this.table.getWidth() &&
            yOrdinate < this.table.getLength();
};

Robot.prototype.placeRobotAtPosition = function(xOrdinate, yOrdinate, directionFacing) {

    if (this.isPositionValid(xOrdinate, yOrdinate) &&
            [this.facing.NORTH, this.facing.EAST, this.facing.SOUTH, this.facing.WEST].indexOf(directionFacing) > -1) {
        this.xOrdinate = xOrdinate;
        this.yOrdinate = yOrdinate;
        this.directionFacing = directionFacing;
        return true;
    } else {
        return false;
    }
};

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

Robot.prototype.getDirectionFacing = function() {

    return this.directionFacing;
};

Robot.prototype.getXordinate = function() {

    return this.xOrdinate;
};

Robot.prototype.getYordinate = function() {

    return this.yOrdinate;
};

Robot.prototype.report = function() {

    return "Output: " + this.xOrdinate + "," + this.yOrdinate + "," + this.directionFacing;
}

Robot.prototype.processInput = function(input) {

    let args = input.split(/[\s,]+/); // split at commas & spaces

    switch (args[0].toUpperCase()) {
        case this.command.PLACE:
            if (args.length === 4) {
                this.placed = this.placeRobotAtPosition(
                        Number(args[1]), Number(args[2]), args[3].toUpperCase());
            }
            return this.placed;
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