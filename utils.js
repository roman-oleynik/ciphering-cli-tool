const abort = message => {
    process.stderr.write(`Error: ${message}`);
    process.exit(1);
};

module.exports = abort;