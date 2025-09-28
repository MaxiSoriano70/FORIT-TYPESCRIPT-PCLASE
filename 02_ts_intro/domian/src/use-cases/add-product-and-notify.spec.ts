import { describe, expect, test } from "vitest";
import { MockedProductService } from "../service/mocks/mock-product-service.js";
import { addProductAndNotify } from "./add-product-and-notify.js";
import { MockedUserService } from "../service/mocks/mock-user-service.js";
import { userMock } from '../entities/mock/user-mock.js';

describe("Create Product", () => {
    const productService = new MockedProductService([]);

    const userService = new MockedUserService([
        userMock({ name: "Juan" }),
        userMock(),
        userMock()
    ]);

    const emailService = {
        notifyNewProduct: async (name: string, emails: string[]) => {
            console.log("Notifying:", name, emails);
        }
    };

    test("When receiving information about a product, it should be saved and once saved, users should be notified.", async () => {
        await addProductAndNotify(
            { productService, emailService, userService },
            {
                name: "test",
                price: 100
            }
        );

        const allProducts = await productService.findAll();
        expect(allProducts).toHaveLength(1);
    });
});
