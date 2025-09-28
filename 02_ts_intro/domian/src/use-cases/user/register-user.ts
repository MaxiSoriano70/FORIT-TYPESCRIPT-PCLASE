import { UserStatus } from "../../entities/user.js";
import type { UserService } from "../../service/user-service.js";

interface RegisterDeps {
    userService: UserService;
}

interface RegisterPayload {
    name: string;
    surname: string;
    email: string;
    password: string;
}

export async function register(
    { userService }: RegisterDeps,
    { email, name, surname, password }: RegisterPayload
) {
    const foundUser = await userService.findByEmail(email);
    if (foundUser) {
        throw new Error("User already exists");
    }

    await userService.save({
        id: crypto.randomUUID(),
        name,
        surname,
        email,
        password,
        status: UserStatus.ACTIVE,
    });
}
