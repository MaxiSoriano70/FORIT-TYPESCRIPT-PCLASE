import type { Product } from "../../entities/product.js";
import type { ProductService } from "../product-service.js";

export class MockedProductService implements ProductService {
    products: Product[] = [];

    constructor(products: Product[]) {
        this.products = products;
    }

    async findById(id: string): Promise<Product | undefined> {
        return this.products.find(product => product.id === id);
    }

    async findAll(): Promise<Product[]> {
        return this.products;
    }

    async editOne(data: Product): Promise<Product> {
        const index = this.products.findIndex(p => p.id === data.id);
        if (index !== -1) {
            this.products[index] = data;
            return data;
        }
        throw new Error("Product not found");
    }

    async save(data: Product): Promise<void> {
        this.products.push(data);
    }

    async deleteById(id: string): Promise<void> {
        this.products = this.products.filter(p => p.id !== id);
    }

    async getProductsWhithDescount(): Promise<Product[]> {
        return this.products.map(product => ({
            ...product,
            price: product.price * 0.9
        }));
    }

    async findByName(name: string): Promise<Product | undefined> {
        return this.products.find(product => product.name === name);
    }

    async applyDiscount(id: number, discount: number): Promise<Product | undefined> {
        const product = this.products.find(p => Number(p.id) === id);
        if (product) {
            product.price = product.price * (1 - discount);
            return product;
        }
        return undefined;
    }
}