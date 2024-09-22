import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './config/db/database.service';
import { ProductsModule } from './module/products/products.module';
import { OrdersModule } from './module/orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Agar bisa diakses di seluruh aplikasi
    }),
    ProductsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
  exports: [DatabaseService],
})
export class AppModule {}
