import { Controller, Logger } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class ProductGrpcController {
  private readonly logger = new Logger('ProductGrpcController');

  constructor(private readonly service: ProductService) {}

  // ---------------------------
  // CREATE
  // ---------------------------
  @GrpcMethod('ProductService', 'CreateProduct')
  async create(data: any) {
    this.logger.log(`📥 [CreateProduct] Request: ${JSON.stringify(data)}`);

    const product = await this.service.create(data);

    const response = { product };
    this.logger.log(`📤 [CreateProduct] Response: ${JSON.stringify(response, null, 2)}`);

    return response;
  }

  // ---------------------------
  // GET BY ID
  // ---------------------------
  @GrpcMethod('ProductService', 'GetProduct')
  async get({ id }: { id: number }) {
    this.logger.log(`📥 [GetProduct] Request: id=${id}`);

    const product = await this.service.findOne(Number(id));

    const response = { product };
    this.logger.log(`📤 [GetProduct] Response: ${JSON.stringify(response, null, 2)}`);

    return response;
  }

  // ---------------------------
  // LIST
  // ---------------------------
  @GrpcMethod('ProductService', 'ListProducts')
  async list({ limit, offset }: { limit?: number; offset?: number }) {
    this.logger.log(`📥 [ListProducts] Request: limit=${limit}, offset=${offset}`);

    const { items, total } = await this.service.list(limit ?? 20, offset ?? 0);

    const products = items.map(p => ({
      ...p,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }));

    const response = { products, total };

    this.logger.log(`📤 [ListProducts] Response: ${JSON.stringify(response, null, 2)}`);

    return response;
  }

  // ---------------------------
  // UPDATE
  // ---------------------------
  @GrpcMethod('ProductService', 'UpdateProduct')
  async update({ id, ...rest }: any) {
    this.logger.log(`📥 [UpdateProduct] Request: id=${id}, body=${JSON.stringify(rest)}`);

    const product = await this.service.update(Number(id), rest);

    const response = { product };
    this.logger.log(`📤 [UpdateProduct] Response: ${JSON.stringify(response, null, 2)}`);

    return response;
  }

  // ---------------------------
  // DELETE
  // ---------------------------
  @GrpcMethod('ProductService', 'DeleteProduct')
  async delete({ id }: { id: number }) {
    this.logger.log(`📥 [DeleteProduct] Request: id=${id}`);

    const success = await this.service.delete(Number(id));

    const response = { success };
    this.logger.log(`📤 [DeleteProduct] Response: ${JSON.stringify(response, null, 2)}`);

    return response;
  }
}
