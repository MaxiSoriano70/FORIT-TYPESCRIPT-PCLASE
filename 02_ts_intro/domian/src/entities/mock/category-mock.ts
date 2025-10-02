import type { Category } from "../category.js";
import { fa, faker } from "@faker-js/faker";

export function categoryMock(opts?: Partial<Category>): Category{
    return{
        id: faker.string.uuid(),
        name: faker.commerce.product(),
        description: faker.lorem.paragraph(),
        ...opts
    }
}
