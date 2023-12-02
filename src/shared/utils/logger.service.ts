import 'dotenv/config';
const { ENVIRONMENT } = process.env;

import winston from 'winston';

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const level = () => {
    const isDevelopment = ENVIRONMENT === 'development';
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

export default winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
});
