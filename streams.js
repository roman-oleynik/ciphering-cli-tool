const { Transform } = require('stream');
const { shift, action } = require("./options");
const abort = require('./utils');

class TextShifter extends Transform {
    _transform(chunk, encoding, callback) {
        try {
            const resultString = this.make(chunk.toString('utf8'), Number(shift), action);
            callback(null, resultString);
        }
        catch (err) {
            abort(err.message);
        }
    }
    make(text, charsAmount, type) {
        const multiplier = type === "encode" ? 1 : type === "decode" ? -1 : 1;

        const aCharCode = "a".charCodeAt();
        const zCharCode =  "z".charCodeAt();

        return text.split("").map(char => {
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

module.exports = TextShifter;