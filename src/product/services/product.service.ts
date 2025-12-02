import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { AppDataSource } from '../../config/data-source';

@Injectable()
export class ProductService {
  private repo: Repository<Product>;

  constructor() {
    this.repo = AppDataSource.getRepository(Product);
  }

  async create(payload: Partial<Product>) {
    const entity = this.repo.create(payload);
    return this.repo.save(entity);
  }

  async findOne(id: number) {
    const p = await this.repo.findOneBy({ id });
    if (!p) throw new NotFoundException('Product not found');
    return p;
  }

  async list(limit = 20, offset = 0) {
    const [items, total] = await this.repo.findAndCount({
      take: limit,
      skip: offset,
      order: { createdAt: 'DESC' },
    });
    return { items, total };
  }

  async update(id: number, payload: Partial<Product>) {
    await this.repo.update(id, payload);
    return this.findOne(id);
  }

  async delete(id: number) {
    const res = await this.repo.delete(id);
    return res.affected > 0;
  }
}
