import app from './app';
import { env } from '../env';
import Logger from './utils/logger';

app.listen(env.API_PORT, () => Logger.info(`Server running on port ${env.API_PORT}`));
