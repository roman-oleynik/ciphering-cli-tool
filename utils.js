const abort = message => {
    console.error(`Error: ${message}`);
    process.exit(1);
};

module.exports = abort;