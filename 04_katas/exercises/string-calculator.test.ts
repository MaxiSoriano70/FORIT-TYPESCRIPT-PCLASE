import { describe, test, expect } from "vitest";
import { isEven } from "./string-calculator.js";



describe("isEven", () => {
    test("Debe devolver true para un número par", () => {
        expect(isEven(4)).toBe(true);
        expect(isEven(0)).toBe(true);
        expect(isEven(-2)).toBe(true);
    });

    test("Debe devolver false para un número impar", () => {
        expect(isEven(3)).toBe(false);
        expect(isEven(7)).toBe(false);
        expect(isEven(-1)).toBe(false);
    });
});
