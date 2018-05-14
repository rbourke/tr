To run the Toy Robot application, execute the command:

$ node src/App.js

(see below for example input and output)

To install the Jest test runner, execute the command:

$ npm i

To run the tests and print a coverage report, execute the command:

$ npm run test -- --coverage


Example Input and Output:
a)----------------
PLACE 0,0,NORTH
MOVE
REPORT 
Output: 0,1,NORTH

b)----------------
PLACE 0,0,NORTH
LEFT
REPORT
Output: 0,0,WEST

c)----------------
PLACE 1,2,EAST
MOVE
MOVE
LEFT
MOVE
REPORT
Output: 3,3,NORTH