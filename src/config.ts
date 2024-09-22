import { z } from 'zod';

const appVariables = {
  APP_STAGE: z.string(),
  APP_HOST: z.string(),
  APP_PORT: z.string(),
};

const databaseVariables = {
  DB_HOST: z.string(),
  DB_PORT: z.string().default('3306'),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
};

const envVariables = z.object({
  ...appVariables,
  ...databaseVariables,
});

export const appEnv = envVariables.parse(process.env);

export type AppEnv = typeof appEnv;
