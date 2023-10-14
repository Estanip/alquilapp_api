import morgan, { StreamOptions } from 'morgan';
import Logger from '../utils/logger';
const env = process.env.NODE_ENV || 'dev';

const stream: StreamOptions = {
    write: (message) => Logger.http(message.trim()),
};

const skip = () => env !== 'dev';

const morganMiddleware = morgan(':method :url :status - :response-time ms', {
    stream,
    skip,
});

export default morganMiddleware;
