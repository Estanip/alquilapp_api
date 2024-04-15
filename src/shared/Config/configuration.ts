import dotenv from 'dotenv';
import path from 'path';
import { ENVIRONMENTS, IConfig } from './config.interfaces';
import { _validateConfigValues } from './config.validation';
dotenv.config({ path: path.resolve('.env'), encoding: 'utf-8' });

const {
  ENVIRONMENT,
  PORT,
  JWT_EXPIRE,
  JWT_SECRET,
  IS_PUBLIC_KEY,
  MONGO_DB_NAME_PROD,
  MONGO_HOST_PROD,
  MONGO_HOST_DEV,
  MONGO_DB_NAME_DEV,
  USERS,
  MEMBERS,
  COURTS,
  MEMBERSHIP_TYPES,
  PRICING,
  RESERVATIONS,
  USER_VERIFICATION_CODE,
  USER_EXPO_PUSH_TOKEN,
  SOCIO_DATA,
  NO_SOCIO_DATA,
  ABONADO_DATA,
  COURT_1,
  COURT_2,
  COURT_3,
  COURT_4,
  COURT_5,
  NODEMAILER_FROM_EMAIL,
  SMPT_TRANSPORT_SERIVCE,
  SMPT_TRANSPORT_HOST,
  SMPT_TRANSPORT_PORT,
  SMPT_TRANSPORT_USER,
  SMPT_TRANSPORT_PASSWORD,
} = process.env;

const values: IConfig = {
  db: {
    host: ENVIRONMENT === ENVIRONMENTS.DEV ? MONGO_HOST_DEV : MONGO_HOST_PROD,
    name: ENVIRONMENT === ENVIRONMENTS.DEV ? MONGO_DB_NAME_DEV : MONGO_DB_NAME_PROD,
    uri:
      ENVIRONMENT === ENVIRONMENTS.DEV
        ? `${MONGO_HOST_DEV}/${MONGO_DB_NAME_DEV}`
        : `${MONGO_HOST_PROD}/${MONGO_DB_NAME_PROD}`,
    initial_data: {
      membership: [JSON.parse(ABONADO_DATA), JSON.parse(SOCIO_DATA), JSON.parse(NO_SOCIO_DATA)],
      courts: [
        JSON.parse(COURT_1),
        JSON.parse(COURT_2),
        JSON.parse(COURT_3),
        JSON.parse(COURT_4),
        JSON.parse(COURT_5),
      ],
    },
  },
  env: ENVIRONMENT,
  is_public: IS_PUBLIC_KEY === 'true' ? true : false,
  jwt: {
    expires: JWT_EXPIRE,
    secret: JWT_SECRET,
  },
  models: {
    USERS,
    MEMBERS,
    COURTS,
    MEMBERSHIP_TYPES,
    PRICING,
    RESERVATIONS,
    USER_VERIFICATION_CODE,
    USER_EXPO_PUSH_TOKEN,
  },
  nodemailer: {
    FROM: NODEMAILER_FROM_EMAIL,
    SERVICE: SMPT_TRANSPORT_SERIVCE,
    HOST: SMPT_TRANSPORT_HOST,
    PORT: Number(SMPT_TRANSPORT_PORT),
    USER: SMPT_TRANSPORT_USER,
    PASS: SMPT_TRANSPORT_PASSWORD,
  },
  port: parseInt(PORT, 10) || 3012,
};

export const CONFIG = _validateConfigValues(values);
