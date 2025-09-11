/* TIPO DE DATOS */

let nombre: string;
let edad: number;
let esEstudiante: boolean;
/* undefined, null, void, bigint */

let fechaNacimiento: Date;
let url: URL
let file: File;

/* ARRAYS */
let numeros: number[] = [];
let nombres: string[] = [];
let booleanos: boolean[] = []; ;

/* GENERICOS */
Array<number>;
Array<string>;
Array<boolean>;

/* DECLARAMOS VALOR */
numeros = [1, 2, 3, 4, 5];
nombres = ['Juan', 'María', 'Pedro'];
booleanos = [true, false, true];

numeros.push(6);
nombres.push('Ana');
booleanos.push(false);

/* TUPLAS */
let persona: [string, number, boolean];
persona = ['Juan', 30, true];

/* INTERFACES */
interface IPersona {
    nombre: string;
    edad: number;
    esEstudiante: boolean;
}

const juan: IPersona = {
    nombre: 'Juan',
    edad: 30,
    esEstudiante: true
};

interface IPersonaIncompleta {
    nombre: string;
    edad?: number;
    esEstudiante?: boolean;
}

const maria: IPersonaIncompleta = {
    nombre: 'María'
};

/* FUNCIONES */
function sumar(a: number, b: number): number {
    return a + b;
}

/* MAS TIPOS */
/* No recomendable */
let myAny: any;
myAny = 5;
myAny = 'Hola';
myAny = true;

/* Mas recomendable */
let myUnknown: unknown;
myUnknown = 5;
myUnknown = 'Hola';
myUnknown = true;

if (typeof myUnknown === 'string') {
    console.log(myUnknown.toUpperCase());
}
if (typeof myUnknown === 'number') {
    console.log(myUnknown.toFixed(2));
}
if (typeof myUnknown === 'boolean') {
    console.log(myUnknown.valueOf());
}

if (Array.isArray(myUnknown) && myUnknown.every(item => typeof item === 'number')) {
    myUnknown.push(5);
}

/* CON USO DE APIS */
interface User {
    id: number;
    nombre: string;
    // otros campos que necesites
}

interface ApiResponse {
    users: User[],
    total: number,
}

function fakeFetchUsers(): ApiResponse {
    return { users: [{ id: 1, nombre: 'Juan' }], total: 1 };
}

const response = fakeFetchUsers();

if (response && Array.isArray(response.users) && typeof response.total === 'number') {
    response.users.forEach(user => {
        console.log(user.nombre);
    });
} else {
    console.error('La respuesta no es del tipo esperado');
}

/* VOID */
function logMessage(message: string): void {
    console.log(message);
}

/* NEVER */
function throwError(message: string): never {
    throw new Error(message);
}

function neverNarrowing(value: string | number | boolean) {
    if (typeof value === 'string') {
        return value.toUpperCase();
    } else if (typeof value === 'number') {
        return value.toFixed(2);
    } else if (typeof value === 'boolean') {
        return value.valueOf();
    } else {
        // Aquí value es de tipo 'never'
        throwError('Tipo no soportado');
    }
}

/* UNION TYPES */
let union: string | number;
union = 'Hola';
union = 5;
// union = true; // Error

interface unionInterface {
    id: number | string;
    nombre: string;
}

/* LITERAL TYPES */
let literal: 'hola' | 'adios';
literal = 'hola';
literal = 'adios';
// literal = 'otro'; // Error

/* TYPE ALIAS */
type ROLEUSER = 'admin' | 'user' | 'guest';
let role: ROLEUSER;
role = 'admin';
role = 'user';
role = 'guest';
// role = 'other'; // Error

/* EMUNS */
enum Color {
    Rojo = 'ROJO',
    Verde = 'VERDE',
    Azul = 'AZUL'
}

const UserStatus = {
    Active: 'ACTIVE',
    Inactive: 'INACTIVE',
    Pending: 'PENDING'
} as const;

type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

UserStatus.Active;

/* GENERICS */
function identity<T>(arg: T): T {
    return arg;
}

function getArrayLength<T>(arg: T[]): number {
    return arg.length;
}

getArrayLength(numeros);

function getArrayItem<T>(arg: T[], index: number): T {
    return arg[index];
}

getArrayItem(nombres, 0);

/* IDENTITY */
const result = identity<string>('Hola');
const result2 = identity<number>(5);

function loggingIdentity<T extends {length : number}>(arg: T): T {
    console.log(arg.length);
    return arg;
}

/* RECORD similar a los objetos clave => valor*/
type Flags = "DarkMode" | "CalendarNewVersion";
type FeatureFlags = Record<Flags, boolean>;

const config: FeatureFlags = {
    DarkMode: true,
    CalendarNewVersion: false
};

/* READONLY solo se puede consultar no va a cambiar*/
type UserReadonly = {
    id: string,
    name: string,
    email: string,
    age: number
};

type UserProfileReadOnly = Readonly<UserReadonly>;

const userReadOnly: UserProfileReadOnly = {
    id: '1',
    name: 'John Doe',
    email: 'example@gmaill.com',
    age: 30
}

/* PROMESAS */
type PromiseType = Promise<string>;

type ResultType = Awaited<PromiseType>;

/* PARTIAL va completando las tareas vamos cambiando el valor */
type Tasks = {
    cook: boolean,
    clean: boolean,
    shop: boolean
}

type PartialTasks = Partial<Tasks>;

const taskToDo: PartialTasks = {
    cook: true
}

/* OMIT & PICK */

interface AdminUser {
    name: string;
    email: string;
    password: string;
    adress: string;
    phone: string;
}

/* Sirve para DTOS omitimos datos sensibles */
type SafeUser = Omit<AdminUser, 'password' | 'adress' | 'phone'>;

/* Sirve para DTOS seleccionamos solo los datos que queremos */
type ContactInfo = Pick<AdminUser, 'email' | 'phone'>;

/* EXCLUDE */
type T0 = Exclude<"a" | "b" | "c", "a">;
// Quita "a" → queda "b" | "c"

type T1 = Exclude<"a" | "b" | "c", "a" | "b">;
// Quita "a" y "b" → queda "c"