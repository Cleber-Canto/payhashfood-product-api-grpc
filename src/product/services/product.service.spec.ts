import { ProductService } from './product.service';

describe('ProductService (unit)', () => {
  let service: ProductService;

  beforeAll(async () => {
    service = new ProductService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
