import { describe, test, expect } from "vitest";
import { fizzBuzz } from "./fizz-buzz.js";

describe("FizzBuzz", () => {
    test("Al darle un numero divisible por 3, debe devolver Fizz", () => {
        expect(fizzBuzz(3)).toBe("Fizz");
    });

    test("Al darle un numero divisible por 5, debe devolver Buzz", () => {
        expect(fizzBuzz(5)).toBe("Buzz");
    });

    test("Al darle un numero divisible por 3 y 5, debe devolver FizzBuzz", () => {
        expect(fizzBuzz(15)).toBe("FizzBuzz");
    });

    test("Al darle un numero que no divisible por 3 y 5, debe devolver el mismo numero", () => {
        expect(fizzBuzz(7)).toBe(7);
    });
});
