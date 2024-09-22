import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.services';
import { DatabaseModule } from 'src/config/db/database.module';
@Module({
  imports: [DatabaseModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [],
})
export class ProductsModule {}
