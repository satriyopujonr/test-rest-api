import { Injectable } from '@nestjs/common';
import { Knex, knex } from 'knex';
import { ConfigService } from '@nestjs/config';
import { AppEnv } from 'src/config';

@Injectable()
export class DatabaseService {
  private knexInstance: Knex;

  constructor(private readonly configService: ConfigService<AppEnv>) {
    this.knexInstance = knex({
      client: 'mysql2',
      connection: {
        host: this.configService.get('DB_HOST'),
        port: Number(this.configService.get('DB_PORT')),
        user: this.configService.get('DB_USERNAME'),
        password: this.configService.get('DB_PASSWORD'),
        database: this.configService.get('DB_NAME'),
      },
    });
  }

  getKnex(): Knex {
    return this.knexInstance;
  }
}
