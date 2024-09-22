import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppEnv } from './config';
import { logger } from './config/logger/logger';

async function main() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService<AppEnv>>(ConfigService);
  const host = configService.get<string>('APP_HOST', '127.0.0.1');
  const port = configService.get<number>('APP_PORT', 9000);

  await app.listen(port, host);
  logger.log(`Running on ${host}:${port}`);
}
main();
