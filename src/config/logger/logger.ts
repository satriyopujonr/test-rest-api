import { Logger } from '@nestjs/common';

export const envLogger = {
  development: {
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'yyyy-m-d HH:mm:ss',
      },
    },
  },
  production: true,
  test: false,
};

export const logger = new Logger();
