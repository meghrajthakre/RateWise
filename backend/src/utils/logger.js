function write(level, message) {
    console[level](`[${new Date().toISOString()}] ${message}`);
}

module.exports = {
    info: (message) => write('log', message),
    warn: (message) => write('warn', message),
    error: (message) => write('error', message)
};
