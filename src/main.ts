import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'product',
      protoPath: join(__dirname, 'proto', 'product.proto'),
      url: process.env.GRPC_BIND ?? '0.0.0.0:50051',
    },
  });

  await app.startAllMicroservices();
  await app.listen(Number(process.env.PORT ?? 3000));
  console.log('Product API running (gRPC) at', process.env.GRPC_BIND ?? '0.0.0.0:50051');
}

bootstrap();
