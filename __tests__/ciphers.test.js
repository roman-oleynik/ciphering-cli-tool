const { commands, config } = require("../parsing-and-validation");
const CaesarCipher = require('../caesar-cipher');
const ROT8Cipher = require('../rot-8-cipher');
const AtbashCipher = require('../atbash-cipher');
const fs = require('fs');



describe('Ciphers functionality', () => {
    it('should return a correct result in combination (config: C1-C1-R0-A)', async () => {
        const mockCreateReadStream = jest.spyOn(fs, 'createReadStream').mockImplementation(() => "This is secret. Message about '_' symbol!");
        const mockCreateWriteStream = jest.spyOn(fs, 'createWriteStream').mockImplementation((message) => message);

        const list = commands.list("node app -c C1-C1-R0-A -i input.txt -o output.txt".split(" "));

        const config = list.find(el => el && (el.command === "-c" || el.command === "--config"));
        const { value } = config;
        
        let inputString = "This is secret. Message about '_' symbol!";
        const ciphers = value.split("-").map(el => {
            if (el === "C0" || el === "C1") {
                return new CaesarCipher(el);
            } else if (el === "R0" || el === "R1") {
                return new ROT8Cipher(el);
            } else if (el === "A") {
                return new AtbashCipher(el);
            }
        });
        
        const result = ciphers.reduce((acc, curVal) => {
            let result;
            if (curVal instanceof ROT8Cipher) {
                result = curVal.make(acc.toString('utf8'), 8);
            } else if (curVal instanceof CaesarCipher) {
                result = curVal.make(acc.toString('utf8'), 1);
            } else if (curVal instanceof AtbashCipher) {
                result = curVal.make(acc.toString('utf8'));
            }

            return result;
        }, inputString);
        
        expect(result).toBe("Myxn xn nbdobm. Tbnnfzb ferlm '_' nhteru!");

    });
    it('should return a correct result in combination (config: C1-C0-A-R1-R0-A-R0-R0-C1-A)', async () => {
        const mockCreateReadStream = jest.spyOn(fs, 'createReadStream').mockImplementation(() => "This is secret. Message about '_' symbol!");
        const mockCreateWriteStream = jest.spyOn(fs, 'createWriteStream').mockImplementation((message) => message);

        const list = commands.list("node app -c C1-C0-A-R1-R0-A-R0-R0-C1-A -i input.txt -o output.txt".split(" "));

        const config = list.find(el => el && (el.command === "-c" || el.command === "--config"));
        const { value } = config;
        
        let inputString = "This is secret. Message about '_' symbol!";
        const ciphers = value.split("-").map(el => {
            if (el === "C0" || el === "C1") {
                return new CaesarCipher(el);
            } else if (el === "R0" || el === "R1") {
                return new ROT8Cipher(el);
            } else if (el === "A") {
                return new AtbashCipher(el);
            }
        });
        
        const result = ciphers.reduce((acc, curVal) => {
            let result;
            if (curVal instanceof ROT8Cipher) {
                result = curVal.make(acc.toString('utf8'), 8);
            } else if (curVal instanceof CaesarCipher) {
                result = curVal.make(acc.toString('utf8'), 1);
            } else if (curVal instanceof AtbashCipher) {
                result = curVal.make(acc.toString('utf8'));
            }

            return result;
        }, inputString);
        
        expect(result).toBe("Vhgw gw wkmxkv. Ckwwoik onauv '_' wqcnad!");
    });
    it('should return a correct result in combination (config: A-A-A-R1-R0-R0-R0-C1-C1-A)', async () => {
        const mockCreateReadStream = jest.spyOn(fs, 'createReadStream').mockImplementation(() => "This is secret. Message about '_' symbol!");
        const mockCreateWriteStream = jest.spyOn(fs, 'createWriteStream').mockImplementation((message) => message);

        const list = commands.list("node app -c A-A-A-R1-R0-R0-R0-C1-C1-A -i input.txt -o output.txt".split(" "));

        const config = list.find(el => el && (el.command === "-c" || el.command === "--config"));
        const { value } = config;
        
        let inputString = "This is secret. Message about '_' symbol!";
        const ciphers = value.split("-").map(el => {
            if (el === "C0" || el === "C1") {
                return new CaesarCipher(el);
            } else if (el === "R0" || el === "R1") {
                return new ROT8Cipher(el);
            } else if (el === "A") {
                return new AtbashCipher(el);
            }
        });
        
        const result = ciphers.reduce((acc, curVal) => {
            let result;
            if (curVal instanceof ROT8Cipher) {
                result = curVal.make(acc.toString('utf8'), 8);
            } else if (curVal instanceof CaesarCipher) {
                result = curVal.make(acc.toString('utf8'), 1);
            } else if (curVal instanceof AtbashCipher) {
                result = curVal.make(acc.toString('utf8'));
            }

            return result;
        }, inputString);
        
        expect(result).toBe("Hvwg wg gsqfsh. Asggous opcih '_' gmapcz!");
    });
    it('should return a correct result in combination (config: C1-R1-C0-C0-A-R0-R1-R1-A-C1)', async () => {
        const mockCreateReadStream = jest.spyOn(fs, 'createReadStream').mockImplementation(() => "This is secret. Message about '_' symbol!");
        const mockCreateWriteStream = jest.spyOn(fs, 'createWriteStream').mockImplementation((message) => message);

        const list = commands.list("node app -c C1-R1-C0-C0-A-R0-R1-R1-A-C1 -i input.txt -o output.txt".split(" "));

        const config = list.find(el => el && (el.command === "-c" || el.command === "--config"));
        const { value } = config;
        
        let inputString = "This is secret. Message about '_' symbol!";
        const ciphers = value.split("-").map(el => {
            if (el === "C0" || el === "C1") {
                return new CaesarCipher(el);
            } else if (el === "R0" || el === "R1") {
                return new ROT8Cipher(el);
            } else if (el === "A") {
                return new AtbashCipher(el);
            }
        });
        
        const result = ciphers.reduce((acc, curVal) => {
            let result;
            if (curVal instanceof ROT8Cipher) {
                result = curVal.make(acc.toString('utf8'), 8);
            } else if (curVal instanceof CaesarCipher) {
                result = curVal.make(acc.toString('utf8'), 1);
            } else if (curVal instanceof AtbashCipher) {
                result = curVal.make(acc.toString('utf8'));
            }

            return result;
        }, inputString);
        
        expect(result).toBe("This is secret. Message about '_' symbol!");
    });
    it('should run a callback in _transform() in ROT8 cipher)', async () => {
        const cipher = new ROT8Cipher("R0");
        const callbackMock = jest.fn().mockImplementation(() => {});
        cipher._transform("aaa", "utf8", callbackMock);
        expect(callbackMock).toHaveBeenCalled();
    });
    it('should run a callback in _transform() in Caesar cipher)', async () => {
        const cipher = new CaesarCipher("C0");
        const callbackMock = jest.fn().mockImplementation(() => {});
        cipher._transform("aaa", "utf8", callbackMock);
        expect(callbackMock).toHaveBeenCalled();
    });
    it('should run a callback in _transform() in Atbash cipher)', async () => {
        const cipher = new AtbashCipher("A");
        const callbackMock = jest.fn().mockImplementation(() => {});
        cipher._transform("aaa", "utf8", callbackMock);
        expect(callbackMock).toHaveBeenCalled();
    });
    it('should run a emit an error in Atbash cipher)', async () => {
        const cipher = new AtbashCipher("A");
        const callbackMock = jest.fn().mockImplementation(() => {});
        const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
        const mockStderr = jest.spyOn(process.stderr, 'write').mockImplementation(message => message);
        
        cipher._transform();
        expect(mockExit).toHaveBeenCalled();
        expect(mockStderr).toHaveBeenCalled();
        expect(callbackMock).not.toHaveBeenCalled();
    });
})