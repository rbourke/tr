const config = require('./config/properties.json');
let table = new (require('./lib/table/Table.js')).Table(config.table.dimensions);
let robot = new (require('./lib/robot/Robot.js')).Robot(table, config.robot);

let stdin = process.stdin.setEncoding('utf8');

stdin.on('data', function(data) {
    robot.processInput(data);
});