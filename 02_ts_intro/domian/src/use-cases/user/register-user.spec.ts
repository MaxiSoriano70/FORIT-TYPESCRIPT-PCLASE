import { describe, expect, test } from "vitest";
import { register } from "./register-user.js";
import { UserStatus } from "../../entities/user.js";
import { MockedUserService } from "../../service/mocks/mock-user-service.js";
import { userMock } from "../../entities/mock/user-mock.js";

describe("register", () => {
    test("When receiving information from a user you must register", async () => {
        const userService = new MockedUserService([
            userMock({
                name: "Angel",
                surname: "Lopez",
                email: "angel@gmail.com",
                password: "angel1234",
            }),
        ]);

        await register(
            { userService },
            {
                name: "Carlos",
                surname: "Gomez",
                email: "carlos@gmail.com",
                password: "carlos1234",
            }
        );

        expect(userService.users).toHaveLength(2);
        expect(userService.users[1]).toStrictEqual({
            id: expect.any(String),
            name: "Carlos",
            surname: "Gomez",
            email: "carlos@gmail.com",
            password: "carlos1234",
            status: UserStatus.ACTIVE,
        });
    });

    test("If the email is already registered, it should throw an error", async () => {
        const userService = new MockedUserService([
            userMock({
                name: "Angel",
                surname: "Lopez",
                email: "angel@gmail.com",
                password: "angel1234",
            }),
        ]);

        await expect(
            register(
                { userService },
                {
                    name: "Angel",
                    surname: "Lopez",
                    email: "angel@gmail.com",
                    password: "angel1234",
                }
            )
        ).rejects.toThrow("User already exists");
    });
});
