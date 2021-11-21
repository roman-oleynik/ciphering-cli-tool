const { pipeline } = require('stream');
const fs = require('fs');
const abort = require('./utils');

const { config, commands } = require("./parsing-and-validation");
const CaesarCipher = require('./caesar-cipher');
const ROT8Cipher = require('./rot-8-cipher');
const AtbashCipher = require('./atbash-cipher');

const validatedCommands = commands.validate(config, commands.list(process.argv));
let action = validatedCommands.find(el => el && (el.command === config.requiredOptions[0].short || el.command === config.requiredOptions[0].long));
if (action) {
    action = action.value;
}
let input = validatedCommands.find(el => el && (el.command === "-i" || el.command === "--input"));
if (input) {
    input = input.value;
}
let output = validatedCommands.find(el => el && (el.command === "-o" || el.command === "--output"));
if (output) {
    output = output.value;
}

const actions = action.split("-").map(el => {
    if (el === "C0" || el === "C1") {
        return new CaesarCipher(el);
    } else if (el === "R0" || el === "R1") {
        return new ROT8Cipher(el);
    } else if (el === "A") {
        return new AtbashCipher(el);
    }
})


pipeline(
    input ? fs.createReadStream(input) : process.stdin,
    ...actions,
    output ? fs.createWriteStream(output) : process.stdout,
    (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("pipeline succeed")
    }
);

module.exports = {
    actions
}
