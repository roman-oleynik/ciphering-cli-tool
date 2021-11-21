const { commands, config } = require("../parsing-and-validation");


describe('Validator functionality', () => {
    it('should notify a customer about duplicate parameters in the app and abrupt the app', async () => {
        const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
        const mockStderr = jest.spyOn(process.stderr, 'write').mockImplementation(message => message);

        const list = commands.list("node app -c C1-C1-A-R0 -c C0".split(" "));

        commands.validate(config, list);

        expect(mockStderr).toHaveBeenCalledWith("Error: You provided --config argument more than once");
        expect(mockExit).toHaveBeenCalled();
    });
    it('should notify a customer about the missing -c or --config argument and abrupt the app', async () => {
        const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
        const mockStderr = jest.spyOn(process.stderr, 'write').mockImplementation(message => message);

        const list = commands.list("node app -i input.txt -o output.txt".split(" "));

        commands.validate(config, list);

        expect(mockStderr).toHaveBeenCalledWith("Error: Option '--config' or '-c' is required");
        expect(mockExit).toHaveBeenCalled();
    });
    it('should notify a customer about an error of access to input file through -i flag on and abrupt the app', async () => {
        const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
        const mockStderr = jest.spyOn(process.stderr, 'write').mockImplementation(message => message);

        const list = commands.list("node app -c C1-C1-A-R0 -i inut.txt".split(" "));

        commands.validate(config, list);

        expect(mockStderr).toHaveBeenCalledWith("Error: Input file isn't found in your directory!");
        expect(mockExit).toHaveBeenCalled();
    });
    it('should notify a customer about an error of access to output file through -o flag on and abrupt the app', async () => {
        const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
        const mockStderr = jest.spyOn(process.stderr, 'write').mockImplementation(message => message);

        const list = commands.list("node app -c C1-C1-A-R0 -o some-file.txt".split(" "));

        commands.validate(config, list);

        expect(mockStderr).toHaveBeenCalledWith("Error: Output file isn't found in your directory!");
        expect(mockExit).toHaveBeenCalled();
    });
    it('should notify a customer about an error in the config syntax and abrupt the app', async () => {
        const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
        const mockStderr = jest.spyOn(process.stderr, 'write').mockImplementation(message => message);

        const list = commands.list("node app -c C1-C1-A-R5 -o output.txt".split(" "));

        commands.validate(config, list);

        expect(mockStderr).toHaveBeenCalledWith("Error: Config is invalid. Please, check R5 for correctness");
        expect(mockExit).toHaveBeenCalled();
    });
    it('should work correctly', async () => {
        const list = commands.list("node app -c C0-C1-A-R1 -i input.txt -o output.txt".split(" "));

        const config = list.find(el => el && (el.command === "-c" || el.command === "--config"));

        expect(/^[(R(1|0)|C(1|0)|A)-]+(R(1|0)|C(1|0)|A)$/.test(config.value)).toBeTruthy();
    });
    
});
