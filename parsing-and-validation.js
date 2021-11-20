const abort = require('./utils');

const config = {
    requiredOptions: [
        {
            short: "-c",
            long: "--config"
        }
    ],
    options: [
        {
            short: "-i",
            long: "--input"
        },
        {
            short: "-o",
            long: "--output"
        }
    ]
}


const commands = {
    list: process.argv.slice(2).map((el, i) => {
        const commandObj = {
            command: "",
            value: ""
        }
        if (el.match(/^(-|--)[a-zA-Z]+/)) {
            commandObj.command = el;
            if (process.argv.slice(2)[i+1] && process.argv.slice(2)[i+1].match(/^(?!(-|--))\S+/)) {
                commandObj.value = process.argv.slice(2)[i+1]
            }
            return commandObj;
        } else {
            return null;
        }
    }),
    validate: config => {

        config.requiredOptions.forEach(option => {
            const indexOfRequiredOption = commands.list.findIndex(command => command && (command.command === option.short || command.command === option.long));
            const valueOfRequiredOption = commands.list.find(command => command && (command.command === option.short || command.command === option.long)).value;

            if (indexOfRequiredOption === -1 || !valueOfRequiredOption) {
                abort(`Option '${option.long}' or '${option.short}' is required`);
            }
        });
        commands.list.forEach(el => {
            if (el) {
                const commandKeys = commands.list.filter(el => el !== null).map(el => el.command);

                function keyOf (key) {
                    let result = "";
                    config.options.forEach(el => {
                        if (el.long === key || el.short === key) {
                            result = el.long;
                        }
                    })
                    config.requiredOptions.forEach(el => {
                        if (el.long === key || el.short === key) {
                            result = el.long;
                        }
                    });
                    return result;
                }

                const uniqueKeys = [];

                commandKeys.forEach(key => {
                    if (!uniqueKeys.includes(keyOf(key))) {
                        uniqueKeys.push(keyOf(key));
                    } else {
                        abort(`The key ${keyOf(key)} is duplicated`);
                    }
                })
            }
        })
        commands.list.forEach(command => {
            if (command) {
                let indexOfOptionAmongRequired = -1;
                let indexOfOptionAmongNotRequired = -1;
                config.requiredOptions.forEach((option, i) => {
                    if (option.short === command.command || option.long === command.command) {
                        indexOfOptionAmongRequired = i;
                    }
                });
                config.options.forEach((option, i) => {
                    if (option.short === command.command || option.long === command.command) {
                        indexOfOptionAmongNotRequired = i;
                    }
                });
                if (indexOfOptionAmongRequired === -1 && indexOfOptionAmongNotRequired === -1) {
                    abort(`The key ${command.command} isn't supported`);
                }
            }
        })
        return commands.list;
    }
}

const validatedCommands = commands.validate(config);

const action = validatedCommands.find(el => el && (el.command === config.requiredOptions[0].short || el.command === config.requiredOptions[0].long));
const input = validatedCommands.find(el => el && (el.command === "-i" || el.command === "--input"));
const output = validatedCommands.find(el => el && (el.command === "-o" || el.command === "--output"));

module.exports = {
    action: action && action.value,
    input: input && input.value,
    output: output && output.value
};