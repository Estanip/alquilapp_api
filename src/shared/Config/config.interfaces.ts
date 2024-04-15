export enum ENVIRONMENTS {
  LOCAL = 'local',
  DEV = 'development',
  PROD = 'production',
}

export interface ENV {
  ENVIRONMENT: string;
  PORT: string;
  JWT_EXPIRE: string;
  JWT_SECRET: string;
  IS_PUBLIC_KEY: string;
  MONGO_DB_NAME_PROD: string;
  MONGO_DB_NAME_DEV: string;
  MONGO_DB_NAME_LOCAL: string;
  MONGO_HOST_PROD: string;
  MONGO_HOST_DEV: string;
  MONGO_HOST_LOCAL: string;
  USERS: string;
  MEMBERS: string;
  COURTS: string;
  MEMBERSHIP_TYPES: string;
  PRICING: string;
  RESERVATIONS: string;
  USER_VERIFICATION_CODE: string;
  USER_EXPO_PUSH_TOKEN: string;
  SOCIO_DATA: string;
  NO_SOCIO_DATA: string;
  ABONADO_DATA: string;
  COURT_1: string;
  COURT_2: string;
  COURT_3: string;
  COURT_4: string;
  COURT_5: string;
  NODEMAILER_FROM_EMAIL: string;
  SMPT_TRANSPORT_SERIVCE: string;
  SMPT_TRANSPORT_HOST: string;
  SMPT_TRANSPORT_PORT: string;
  SMPT_TRANSPORT_USER: string;
  SMPT_TRANSPORT_PASSWORD: string;
}

type TInitialData = {
  updateOne: {
    filter: { type: 'ABONADO' };
    update: {
      $set: {
        type: 'ABONADO';
        description: 'Paga mensualmente por el uso de las canchas, no debe pagar el turno';
        is_enabled: true;
      };
    };
    upsert: true;
  };
};

type TDatabase = {
  host: string;
  name: string;
  uri: string;
  initial_data: {
    membership: TInitialData[];
    courts: TInitialData[];
  };
};

type TNodemailer = {
  FROM: string;
  SERVICE: string;
  HOST: string;
  PORT: number;
  USER: string;
  PASS: string;
};

type TModels = {
  USERS: string;
  MEMBERS: string;
  COURTS: string;
  MEMBERSHIP_TYPES: string;
  PRICING: string;
  RESERVATIONS: string;
  USER_VERIFICATION_CODE: string;
  USER_EXPO_PUSH_TOKEN: string;
};

export interface IConfig {
  db: TDatabase;
  env: string;
  is_public: boolean;
  jwt: {
    expires: string;
    secret: string;
  };
  models: TModels;
  nodemailer: TNodemailer;
  port: number;
}
