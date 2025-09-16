import type { Product } from "../../entities/product.js";
import { fa, faker } from "@faker-js/faker";

export function productMock(): Product{
    return{
        id: faker.string.uuid(),
        name: faker.commerce.product(),
        price: faker.number.int({max: 100000, min: 5000})
    }
}