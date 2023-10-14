import { EnvType, load } from 'ts-dotenv';

export const schema = {
    API_PORT: String,
    JWT_SECRET: String,
    JWT_EXPIRE: String,
    MONGO_URI: String,
    NODE_ENV: String,
};

export type Env = EnvType<typeof schema>;

export let env: Env;

export function loadEnv(): void {
    env = load(schema);
}
