import { describe, expect, test } from "vitest";
import { register } from "./register-user.js";
import type { UserService } from "../../service/user-service.js";
import { UserStatus, type User } from "../../entities/user.js";
import { th } from "@faker-js/faker";

describe("register", () => {
    const userList: User[] = [
        {
            id: crypto.randomUUID(),
            name: "User",
            surname: "Test",
            email: "user@email.com",
            password: "user1234",
            status: UserStatus.ACTIVE,
        },
    ];

    const userService: UserService = {
        editOne: async () => {
            throw "Error";
        },
        findAll: async () => {
            throw "Error";
        },
        findById: async () => {
            throw "Error";
        },
        save: async (data : User) => {
            userList.push(data);
        },
        deleteById: async () => {
            throw "Error";
        },
        findByEmail: async(email) => {
            throw "Error";
        },
        findByName: async ( name ) => {
            return userList.find((user) => user.name === name);
        },
    };

    test("Al recibir la información de un usuario deberia registrarse", async () => {
        const result = await register(
            { userService },
            {
                name: "Angel",
                surname: "Lopez",
                email: "angel@gamil.com",
                password: "angel1234",
            }
        );

        expect(result).toStrictEqual({
            id: expect.any(String),
            name: "Angel",
            surname: "Lopez",
            email: "angel@gamil.com",
            password: "angel1234",
            status: UserStatus.ACTIVE,
        });

        expect(userList).toHaveLength(2);
    });

    test("Si el email ya esta registrado deberia devolver un error", async () => {
        const result = await register(
            { userService },
            {
                name: "Angel",
                surname: "Lopez",
                email: "angel@gamil.com",
                password: "angel1234",
            }
        );

        expect(result).toBeInstanceOf(Error);
    });
});
