export enum ENVIRONMENTS {
  LOCAL = 'local',
  DEV = 'development',
  PROD = 'production',
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
  app_backoffice_host: string;
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
