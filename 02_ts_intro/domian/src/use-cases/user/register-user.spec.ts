import { describe, expect, test } from "vitest";
import { register } from "./register-user.js";
import type { UserService } from "../../service/user-service.js";
import { UserStatus, type User } from "../../entities/user.js";

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

    test("When receiving information from a user you must register", async () => {
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

    test("If the email is already registered, it should return an error.", async () => {
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
