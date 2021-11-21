const { Transform } = require('stream');
// const { shift, action } = require("./options");
const abort = require('./utils');

class CaesarCipher extends Transform {
    constructor(config) {
        super();
        this.config = config;
    }
    _transform(chunk, encoding, callback) {
        try {
            let resultString = chunk;

            resultString = this.make(chunk.toString('utf8'), 1);

            callback(null, resultString);
        }
        catch (err) {
            abort(err.message);
        }
    }
    make(text, charsAmount, type) {
        let multiplier = 1;

        if (this.config[1] === "1") {
            multiplier = 1
        } else if (this.config[1] === "0") {
            multiplier = -1
        } else {
            abort(`Caesar cipher config is invalid!`);
        }
        

        const aCharCode = "a".charCodeAt();
        const zCharCode =  "z".charCodeAt();

        return text.split("").map(char => {
            if (char.match(/[А-Яа-я]/)) {
                abort("Text should contain only latin symbols")
            }
            if (!char.match(/[A-Za-z]/)) {
                return char;
            }

            const lowerChar = char.toLowerCase();
            const isNeededToUpper = lowerChar !== char;

            const upperIfNecessary = (character) => {
                if (isNeededToUpper) {
                    return character.toUpperCase();
                }
                return character.toLowerCase();
            }

            const shiftedCharCode = lowerChar.charCodeAt() + multiplier*charsAmount;

            if (shiftedCharCode > zCharCode) {
                return upperIfNecessary(String.fromCharCode(aCharCode + (shiftedCharCode - zCharCode - 1) % 26));
            }
            else if (shiftedCharCode < aCharCode) {
                return upperIfNecessary(String.fromCharCode(zCharCode - (aCharCode - shiftedCharCode - 1) % 26));
            }
            return upperIfNecessary(String.fromCharCode(shiftedCharCode));
        }).join("");
    }
};

module.exports = CaesarCipher;