import winston from 'winston';
const env = process.env.NODE_ENV || 'dev';

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const level = () => {
    const isDevelopment = env === 'dev';
    return isDevelopment ? 'http' : 'warn';
};

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'blue',
    http: 'magenta',
    debug: 'white',
};

winston.addColors(colors);

const format = winston.format.combine(
    winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    winston.format.printf((info) => `${info.level}: ${info.message} -- ${info.timestamp}`),
);

const transports = [
    new winston.transports.Console({ format: winston.format.colorize({ all: true }) }),
];

const Logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
});

export default Logger;
