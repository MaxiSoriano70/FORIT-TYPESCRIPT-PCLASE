import { describe, expect, test } from "vitest";
import { MockProductService } from "../service/mocks/mock-product-service.js";
import { addProductAndNotify } from "./add-product-and-notify.js";
import { UserStatus, type User } from "../entities/user.js";
import type { UserService } from "../service/user-service.js";

describe("Create Product", () => {
    const productService = new MockProductService([]);

    const userList: User[] = [{
        id: crypto.randomUUID(),
        name: "user",
        surname: "surname",
        email: "user@gmail.com",
        password: "user1234",
        status: UserStatus.ACTIVE
    }];

    const userService: UserService = {
        findById: async (id: string) => {
            throw "error";
        },
        findAll: async () => {
            return userList;
        },
        editOne: async (data: User) => {
            throw "error";
        },
        save: async (data: User) => {
            userList.push(data);
        },
        deleteById: async (id: string) => {
            throw "error";
        },
        findByName: (name: string) => {
            throw "error";
        },
        findByEmail: async (email: string): Promise<User | undefined> => {
            return userList.find((u) => u.email === email);
        },
    };

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