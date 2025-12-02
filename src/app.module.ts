import { Module } from '@nestjs/common';
import { ProductService } from './product/services/product.service';
import { ProductGrpcController } from './product/controllers/product.grpc.controller';
import { AppDataSource } from './config/data-source';

@Module({
  imports: [],
  controllers: [ProductGrpcController],
  providers: [ProductService],
})
export class AppModule {
  constructor() {
    if (!AppDataSource.isInitialized) {
      AppDataSource.initialize().catch(err => {
        console.error('DataSource initialization error', err);
        process.exit(1);
      });
    }
  }
}
