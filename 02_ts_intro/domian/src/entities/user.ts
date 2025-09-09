import type { Entity } from "../utils/types/entity.js";

export interface User extends Entity{
    name: string;
    surname: string;
    email: string;
    password: string;
}