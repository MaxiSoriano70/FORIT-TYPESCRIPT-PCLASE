import { UserStatus, type User } from "../../entities/user.js";
import type { UserService } from "../user-service.js";

export class MockedUserService implements UserService {
    users: User[] = [];

    constructor(users: User[] = []) {
        this.users = users;
    }

    findAll = async () => this.users;

    findById = async (id: string) => {
        const user = this.users.find(u => u.id === id);
        if (!user) throw new Error("User not found");
        return user;
    }

    editOne = async (user: User) => {
        const index = this.users.findIndex(u => u.id === user.id);
        if (index === -1) throw new Error("User not found");
        this.users[index] = user;
        return user;
    }

    save = async (user: User): Promise<void> => {
        this.users.push(user);
    };

    deleteById = async (id: string) => {
        const user = this.users.find(u => u.id === id);
        if (!user) throw new Error("User not found");
        this.users = this.users.filter(u => u.id !== id);
    }

    findByEmail = async (email: string) => this.users.find(u => u.email === email);

    findByName = async (name: string) => this.users.find(u => u.name === name);
}
