# product-api

NestJS gRPC Product API (minimal scaffold)

## Run locally

1. Start Postgres:
   ```bash
   docker compose up -d
   ```
2. Install deps and build:
   ```bash
   cd apps/product-api
   npm ci
   npm run build
   npm start
   ```
3. Use grpcurl to call CreateProduct:
   grpcurl -plaintext -d '{"name":"Item","description":"x","price":12.5,"quantity":10}' localhost:50051 product.ProductService/CreateProduct
