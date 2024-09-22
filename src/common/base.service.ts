import { Injectable, Inject, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';
import { AppEnv } from 'src/config';
import { logger } from 'src/config/logger/logger';
import { Knex } from 'knex';
import { DatabaseService } from 'src/config/db/database.service';

@Injectable()
export class BaseService {
  @Inject(REQUEST) readonly request: Request;
  @Inject(ConfigService) readonly config: ConfigService<AppEnv>;
  @Inject(DatabaseService) protected readonly databaseService: DatabaseService; // Koneksi database
  readonly logger: Logger = logger;

  // Metode untuk mendapatkan koneksi Knex
  protected getKnex(): Knex {
    return this.databaseService.getKnex();
  }
}
