import { describe, expect, test, vi } from "vitest";
import { MockedProductService } from "../service/mocks/mock-product-service.js";
import { addProductAndNotify } from "./add-product-and-notify.js";
import { MockedUserService } from "../service/mocks/mock-user-service.js";
import { MockedCategoryService } from "../service/mocks/mock-category-service.js";
import { userMock } from "../entities/mock/user-mock.js";

describe("Create Product", () => {
    const productService = new MockedProductService([]);

    const userService = new MockedUserService([
        userMock({ name: "Juan" }),
        userMock(),
        userMock()
    ]);

    let emailsNotified: string[] = [];

    const emailService = {
        notifyNewProduct: async (name: string, emails: string[]) => {
            emailsNotified = emails;
        }
    };

    const categoryService = new MockedCategoryService([
        { id: "categoria1", name: "Categoria Test", description: "desc" }
    ]);

    const spyOnNotifyNewProduct = vi.spyOn(emailService, "notifyNewProduct");

    test("When receiving information about a product, it should be saved and once saved, users should be notified.", async () => {
        await addProductAndNotify(
            { productService, emailService, userService, categoryService },
            {
                name: "test",
                price: 100,
                categoryId: "categoria1"
            }
        );

        const allProducts = await productService.findAll();
        expect(allProducts).toHaveLength(1);
        expect(emailsNotified).toHaveLength(3);
        expect(spyOnNotifyNewProduct).toHaveBeenCalledTimes(1);
    });

    test("Si le pasamos un id de una categoria que no existe deberia devolver un error", async () => {
        const emptyCategoryService = new MockedCategoryService([]); // 👈 sin categorías

        await expect(
            addProductAndNotify(
                { productService, emailService, userService, categoryService: emptyCategoryService },
                {
                    name: "test",
                    price: 100,
                    categoryId: "inexistente"
                }
            )
        ).rejects.toThrow("Categoria no encontrada");
    });
});
