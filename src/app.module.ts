import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Agar bisa diakses di seluruh aplikasi
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
