const config = require('../../config/properties.json');
let table = new (require('../../lib/table/Table.js')).Table(config.table.dimensions);
let robot = new (require('../../lib/robot/Robot.js')).Robot(table, config.robot);

it('ignores PLACE commands with too few arguments', () => {
    let result = robot.processInput("PLACE 0,1");
    expect(result).toBeFalsy();
});

it('ignores PLACE commands with too many arguments', () => {
    let result = robot.processInput("PLACE 0,1,2,EAST");
    expect(result).toBeFalsy();
});

it('ignores LEFT commands before the robot has been placed', () => {
    expect(robot.processInput("LEFT")).toBe(false);
});

it('ignores RIGHT commands before the robot has been placed', () => {
    expect(robot.processInput("RIGHT")).toBe(false);
});

it('ignores MOVE commands before the robot has been placed', () => {
    expect(robot.processInput("MOVE")).toBe(false);
});

it('ignores REPORT commands before the robot has been placed', () => {
    expect(robot.processInput("REPORT")).toBe(false);
});

it('can be placed at a valid position', () => {
    let result = robot.placeRobotAtPosition(0, 0, "NORTH");
    expect(result).toBeTruthy();
});

it('cannot be placed at an invalid position', () => {
    let result = robot.placeRobotAtPosition(-1, -1, "NORTH");
    expect(result).toBeFalsy();
});

it('can turn left when facing NORTH', () => {
    robot.placeRobotAtPosition(0, 0, "NORTH");
    robot.turnLeft();
    expect(robot.getDirectionFacing()).toBe("WEST");
});

it('can turn left when facing EAST', () => {
    robot.placeRobotAtPosition(0, 0, "EAST");
    robot.turnLeft();
    expect(robot.getDirectionFacing()).toBe("NORTH");
});

it('can turn left when facing SOUTH', () => {
    robot.placeRobotAtPosition(0, 0, "SOUTH");
    robot.turnLeft();
    expect(robot.getDirectionFacing()).toBe("EAST");
});

it('can turn left when facing WEST', () => {
    robot.placeRobotAtPosition(0, 0, "WEST");
    robot.turnLeft();
    expect(robot.getDirectionFacing()).toBe("SOUTH");
});

it('can turn right when facing NORTH', () => {
    robot.placeRobotAtPosition(0, 0, "NORTH");
    robot.turnRight();
    expect(robot.getDirectionFacing()).toBe("EAST");
});

it('can turn right when facing EAST', () => {
    robot.placeRobotAtPosition(0, 0, "EAST");
    robot.turnRight();
    expect(robot.getDirectionFacing()).toBe("SOUTH");
});

it('can turn right when facing SOUTH', () => {
    robot.placeRobotAtPosition(0, 0, "SOUTH");
    robot.turnRight();
    expect(robot.getDirectionFacing()).toBe("WEST");
});

it('can turn right when facing WEST', () => {
    robot.placeRobotAtPosition(0, 0, "WEST");
    robot.turnRight();
    expect(robot.getDirectionFacing()).toBe("NORTH");
});

it('can move EAST from position: 0,0', () => {
    robot.placeRobotAtPosition(0, 0, "EAST");
    robot.moveForward();
    expect(robot.getXordinate()).toBe(1);
});

it('can move NORTH from position: 0,0', () => {
    robot.placeRobotAtPosition(0, 0, "NORTH");
    robot.moveForward();
    expect(robot.getYordinate()).toBe(1);
});

it('cannot move WEST from position: 0,0', () => {
    robot.placeRobotAtPosition(0, 0, "WEST");
    let result = robot.moveForward();
    expect(result).toBeFalsy();
});

it('cannot move SOUTH from position: 0,0', () => {
    robot.placeRobotAtPosition(0, 0, "SOUTH");
    let result = robot.moveForward();
    expect(result).toBeFalsy();
});

it('cannot move EAST from position: max,max', () => {
    robot.placeRobotAtPosition(table.getWidth() - 1, table.getLength() - 1, "EAST");
    let result = robot.moveForward();
    expect(result).toBeFalsy();
});

it('cannot move NORTH from position: max,max', () => {
    robot.placeRobotAtPosition(table.getWidth() - 1, table.getLength() - 1, "NORTH");
    let result = robot.moveForward();
    expect(result).toBeFalsy();
});

it('can move WEST from position: max,max', () => {
    robot.placeRobotAtPosition(table.getWidth() - 1, table.getLength() - 1, "WEST");
    robot.moveForward();
    expect(robot.getXordinate()).toBe(table.getWidth() - 2);
});

it('cannot move SOUTH from position: max,max', () => {
    robot.placeRobotAtPosition(table.getWidth() - 1, table.getLength() - 1, "SOUTH");
    robot.moveForward();
    expect(robot.getYordinate()).toBe(table.getLength() - 2);
});

it('detects an invalid direction', () => {
    let result = robot.isDirectionFacingValid("SOUTH WEST");
    expect(result).toBeFalsy();
});

it('detects that NORTH is a valid direction', () => {
    let result = robot.isDirectionFacingValid("NORTH");
    expect(result).toBeTruthy();
});

it('detects that EAST is a valid direction', () => {
    let result = robot.isDirectionFacingValid("EAST");
    expect(result).toBeTruthy();
});

it('detects that SOUTH is a valid direction', () => {
    let result = robot.isDirectionFacingValid("SOUTH");
    expect(result).toBeTruthy();
});

it('detects that WEST is a valid direction', () => {
    let result = robot.isDirectionFacingValid("WEST");
    expect(result).toBeTruthy();
});

it('ignores invalid commands', () => {
    let result = robot.processInput("FLY");
    expect(result).toBeFalsy();
});

it('can parse & execute a valid PLACE command', () => {
    robot.processInput("PLACE 1,2,EAST");
    expect(robot.getXordinate()).toBe(1);
    expect(robot.getYordinate()).toBe(2);
    expect(robot.getDirectionFacing()).toBe("EAST");
});

it('ignores PLACE commands with an invalid xOrdinate', () => {
    let result = robot.processInput("PLACE X,2,EAST");
    expect(result).toBeFalsy();
});

it('ignores PLACE commands with an invalid yOrdinate', () => {
    let result = robot.processInput("PLACE 1,Y,EAST");
    expect(result).toBeFalsy();
});

it('ignores PLACE commands with an invalid direction', () => {
    let result = robot.processInput("PLACE 1,2,YEAST");
    expect(result).toBeFalsy();
});

it('can parse & execute a MOVE command', () => {
    robot.processInput("PLACE 1,2,EAST");
    robot.processInput("MOVE");
    expect(robot.getXordinate()).toBe(2);
});

it('can parse & execute a LEFT command', () => {
    robot.processInput("PLACE 1,2,EAST");
    robot.processInput("LEFT");
    expect(robot.getDirectionFacing()).toBe("NORTH");
});

it('can parse & execute a RIGHT command', () => {
    robot.processInput("PLACE 1,2,EAST");
    robot.processInput("RIGHT");
    expect(robot.getDirectionFacing()).toBe("SOUTH");
});

it('can parse & execute a REPORT command', () => {
    robot.processInput("PLACE 1,2,EAST");
    expect(robot.processInput("REPORT")).toBe(true);
});

it('always creates a new robot', () => {
    let robot = (require('../../lib/robot/Robot.js')).Robot(table, config.robot);
    expect(robot).toBeInstanceOf((require('../../lib/robot/Robot.js')).Robot);
});