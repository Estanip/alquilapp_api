import express from 'express';
import cors from 'cors';
import { Routes } from './routes/index';
import { validateToken } from './middlewares/validateToken';
import { connection } from './db/connection';
import { setSwaggerResponse, setSwaggerRequest } from './utils/swagger';
import { returnErroResponse } from './middlewares/ErrorResponse';
import morganMiddleware from './middlewares/morgan';

import { env, loadEnv } from '../env';
import 'dotenv/config';

const app = express();
const routes: Routes = new Routes();

// *SET ENV
loadEnv();

// *SET SWAGGER RESPONSE
if (env.NODE_ENV === 'dev') setSwaggerResponse(app);

// *SETTINGS
app.use(express.json());
app.use(cors<Request>());
app.use(morganMiddleware);

// *SET ROUTES WITHOUT TOKEN
app.use('/health', routes.healthRoutes.router);
app.use('/auth', routes.authRoutes.router);

// *SET ROUTES WITH TOKEN
app.use(validateToken);
app.use('/user-type', routes.userTypeRoutes.router);
app.use('/member', routes.memberRoutes.router);
app.use('/reservation', routes.reservationRoutes.router);
app.use('/court', routes.courtRoutes.router);

// *SET ERROR RESPONSE
app.use(returnErroResponse);

// *DB CONNECTION
connection();

// *SET SWAGGER REQUESTS
if (env.NODE_ENV === 'dev') setSwaggerRequest();

export default app;
