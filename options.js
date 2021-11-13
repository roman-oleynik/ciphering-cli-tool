const { Command } = require('commander');
const program = new Command();
const {
    validateAction,
    validateInputPath,
    validateOutputPath,
    validateShiftNum
} = require('./validators');

program
    .requiredOption('-a --action <string>', 'encode/decode action', validateAction)
    .requiredOption('-s --shift <number>', "caesar cipher shifted symbols' amount", validateShiftNum)
    .option('-i --input <path>', "input file path", validateInputPath)
    .option('-o --output <path>', "output file path", validateOutputPath);

try {
    program.parse(process.argv);
}
catch (err) {
    console.log(err.status, err.message);
}



module.exports = program.opts();