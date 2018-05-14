# Toy Robot

## Usage

1. Install Node.js (https://nodejs.org/en/) - tested on v8.11.1
2. Open a command prompt and navigate to where you checked out out this Git repository.
3. Execute this command:

```sh
$ node src/App.js
```

(see below for example input and output)

## Test Coverage

To install the Jest test runner, execute the command:

```sh
$ npm i
```

To run the tests and print a coverage report, execute the command:

```sh
$ npm run test -- --coverage
```

(no need to set up and configure Istanbul for coverage or Jasmine/Mocha for a runner - Jest can test Node apps too!)

## Application Example

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