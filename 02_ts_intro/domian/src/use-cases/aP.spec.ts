import { describe, expect, test } from "vitest";
import { MockProductService } from "../service/mocks/mock-product-service.js";
import { Product } from "./aP.js";
import { UserStatus, type User } from "../entities/user.js";
import type { UserService } from "../service/user-service.js";

describe("Create Product", async () => {
    const pService = new MockProductService([]);

    const userList: User[] =[{
        id: crypto.randomUUID(),
        name: "user",
        surname: "surname",
        email: "user@gmail.com",
        password: "user1234",
        status: UserStatus.ACTIVE
    }];

    const uS: UserService = {
        findById: async (id: string) => {
            throw "error";
        },
        findAll: async () => {
            throw "error";
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

    const eService = {
        senp: async (n: string, e: string[]) => {
            console.log(n);
            console.log(e);
        }
    };

    test("", async () => {
        const r = await Product(
            { pService, eService, uS},
            {
                n: "test",
                p: 100,
            }
        )
        expect(pService.findAll).toHaveLength(1);
    });
})