import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.services';
import { DatabaseModule } from 'src/config/db/database.module';
@Module({
  imports: [DatabaseModule],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [],
})
export class OrdersModule {}
