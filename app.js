const { pipeline } = require('stream');
const fs = require('fs');
const abort = require('./utils');

const { input, output, action } = require("./parcing-and-validation");
const CaesarCipher = require('./caesar-cipher');
const ROT8Cipher = require('./rot-8-cipher');
const AtbashCipher = require('./atbash-cipher');

const actions = action.split("-").map(el => {
    if (el === "C0" || el === "C1") {
        return new CaesarCipher(el);
    } else if (el === "R0" || el === "R1") {
        return new ROT8Cipher(el);
    } else if (el === "A") {
        return new AtbashCipher(el);
    } else {
        abort(`Config is invalid. Please, check ${el} for correctness`)
    }
})

if (output && !fs.existsSync(output)) {
    abort("Output file isn't found in your directory!");
}
if (input && !fs.existsSync(input)) {
    abort("Input file isn't found in your directory!");
}

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


