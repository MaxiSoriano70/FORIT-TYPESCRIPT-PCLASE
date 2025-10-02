import type { Product } from "../product.js";
import { fa, faker } from "@faker-js/faker";

export function productMock(opts?: Partial<Product>): Product{
    return{
        id: faker.string.uuid(),
        name: faker.commerce.product(),
        price: faker.number.int({max: 100000, min: 5000}),
        categoryId: faker.commerce.productDescription(),
        ...opts
    }
}

// GENERAMOS SOLO COMPUTADORAS
//productMock({ name: "Computer"})