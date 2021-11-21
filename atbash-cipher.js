const { Transform } = require('stream');
// const { shift, action } = require("./options");
const abort = require('./utils');

class AtbashCipher extends Transform {
    constructor(config) {
        super();
        this.config = config;
    }
    _transform(chunk, encoding, callback) {
        try {
            let resultString = chunk;
            const actions = this.config.split("-");
            if (actions.length % 2) {
                resultString = this.make(chunk.toString('utf8'));
            }
            callback(null, resultString);
        }
        catch (err) {
            abort(err.message);
        }
    }
    make(text) {
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

            const shiftedCharCode = zCharCode - (lowerChar.charCodeAt() - aCharCode);

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

module.exports = AtbashCipher;