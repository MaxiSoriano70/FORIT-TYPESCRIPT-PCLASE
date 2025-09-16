import type { Entity } from "../utils/types/entity.js";

export const UserStatus = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
} as const;

export type UserStatus = (typeof UserStatus) [keyof typeof UserStatus];

export interface User extends Entity{
    name: string;
    surname: string;
    email: string;
    password: string;
    status: UserStatus;
}

// OMITIMOS LA PASSWORD
export type SecureUser = Omit<User, "password">

// INCLUIMOS LOS CAMPOS QUE QUEREMOS
// type SecureUser = Pick<User, "name" | "surname" | "email" | "status">

// Exclude funciona e intersecciones
// type UserFields = "id" | "name" | "surname" | "email" | "password" | "status";

// export type SecureUserExclude = Exclude<UserFields, "password">;

// INTERSECCION
/*interface Person{
    name: string,
    surname: string
}

interface LoginFields {
    email: string,
    password: string
}

type UserLogin = Person & LoginFields
const userTest: UserLogin = {
    
}*/

// Estructura de datos recursiva genérica
/*interface Category<T>{
    name: string;
    question?: string;
    value?: T;
    subCategories?: Category<T>[];
}

const examenMatematicas : Category<number> = {
    name: "Examen de matematicas",
    subCategories: [
        {
            name: "suma",
            question: "Cuanto es 2 + 2?",
            value: 4
        },
        {
            name: "resta",
            question: "cuanto es 2 -2?",
            value: 0
        }
    ]
}*/

//INFER

type MyCorrectResponse<T> = T extends () => infer A ? A : never;

type MyFunction = () => string | Error;

const correctResult: MyCorrectResponse<MyFunction> = "hola"; // ✅ string
const anotherResult: MyCorrectResponse<MyFunction> = new Error("ups"); // ✅ Error
//const correctResultError: MyCorrectResponse<MyFunction> = 45;
