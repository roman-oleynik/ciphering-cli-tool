const { pipeline } = require('stream');
const fs = require('fs');

const { input, output, action } = require("./options");
const TextShifter = require('./streams');

console.log(input);
console.log(output);
console.log(action);
pipeline(
    input ? fs.createReadStream(input) : process.stdin,
    new TextShifter(),
    output ? fs.createWriteStream(output) : process.stdout,
    (err) => {
        if (err) {
            console.log(err.message);
        }
        console.log("pipeline succeed")
    }
);


