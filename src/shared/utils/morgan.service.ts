import 'dotenv/config';
const { ENVIRONMENT } = process.env;

import morgan, { StreamOptions } from 'morgan';
import Logger from './logger.service';

const stream: StreamOptions = {
    write: (message) => Logger.http(message.trim()),
};

const skip = () => ENVIRONMENT !== 'development';

export default morgan(':method :url :status - :response-time ms', {
    stream,
    skip,
});
