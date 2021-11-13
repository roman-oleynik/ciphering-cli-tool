const { pipeline } = require('stream');
const fs = require('fs');

const { input, output } = require("./options");
const TextShifter = require('./streams');


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


