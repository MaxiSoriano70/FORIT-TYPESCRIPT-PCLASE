import type { Product } from "../entities/product.js";
import type { Service } from "../utils/types/service.js";

export interface ProductService extends Service<Product>{
    getProductsWhithDescount: () => Promise<Product[]>;
    findByName: ( name: string ) => Promise<Product | undefined>;
    applyDiscount: ( id: number, discount: number ) => Promise<Product | undefined>;
}