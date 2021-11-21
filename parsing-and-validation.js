const abort = require('./utils');
const fs = require('fs');

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
    list: query => {
        return query.slice(2).map((el, i) => {
            const commandObj = {
                command: "",
                value: ""
            }
            if (el.match(/^(-|--)[a-zA-Z]+/)) {
                commandObj.command = el;
                if (query.slice(2)[i+1] && query.slice(2)[i+1].match(/^(?!(-|--))\S+/)) {
                    commandObj.value = query.slice(2)[i+1]
                }
                return commandObj;
            } else {
                return null;
            }
        })
    },
    validate: (config, list) => {
        config.requiredOptions.forEach(option => {
            const indexOfRequiredOption = list.findIndex(command => command && (command.command === option.short || command.command === option.long));
            const valueOfRequiredOption = list.find(command => command && (command.command === option.short || command.command === option.long));

            if (indexOfRequiredOption === -1 || !valueOfRequiredOption.value) {
                abort(`Option '${option.long}' or '${option.short}' is required`);
            }
        });
        list.forEach(el => {
            if (el) {
                const commandKeys = list.filter(el => el !== null).map(el => el.command);

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
                        abort(`You provided ${keyOf(key)} argument more than once`);
                    }
                })
            }
        })
        list.forEach(command => {
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
        });
        let input = list.find(el => el && (el.command === "-i" || el.command === "--input"));
        if (input) {
            input = input.value;
        }
        let output = list.find(el => el && (el.command === "-o" || el.command === "--output"));
        if (output) {
            output = output.value;
        }
        let action = list.find(el => el && (el.command === config.requiredOptions[0].short || el.command === config.requiredOptions[0].long));
        if (action) {
            action = action.value;
            action.split("-").forEach(el => {
                if (el !== "C0" && el !== "C1" && el !== "R0" && el !== "R1" && el !== "A") {
                    abort(`Config is invalid. Please, check ${el} for correctness`)
                }
            })
        }
        if (output && !fs.existsSync(output)) {
            abort("Output file isn't found in your directory!");
        }
        if (input && !fs.existsSync(input)) {
            abort("Input file isn't found in your directory!");
        }
        
        return list;
    }
}


module.exports = {
    config,
    commands
};