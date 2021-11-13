const abort = require('./utils');
const fs = require("fs");

const validateShiftNum = value => {
    if (isNaN(value)) {
        abort("You must enter a number to the 'shift' parameter");
        return;
    }
    return value;
};
const validateAction = value => {
    if (value !== "encode" && value !== "decode") {
        abort("There are only 2 types of the action: encode & decode");
        return;
    }
    return value;
};
const validateInputPath = value => {
    if (!fs.existsSync(value)) {
        abort("Input file doesn't exist");
        return;
    }
    if (!value.match(/[0-9a-zA-Z]+.txt$/)) {
        abort("Incorrect format of the input file");
        return;
    }
    return value;
};
const validateOutputPath = value => {
    if (!fs.existsSync(value)) {
        abort("Input file doesn't exist");
        return;
    }
    if (!value.match(/[0-9a-zA-Z]+.txt$/)) {
        abort("Incorrect format of the output file");
        return;
    }
    return value;
};

module.exports = {
    validateAction,
    validateInputPath,
    validateOutputPath,
    validateShiftNum
};