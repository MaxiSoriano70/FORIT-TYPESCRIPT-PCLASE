// src/service/mocks/mock-category-service.ts
import type { CategoryService } from "../category-service.js";
import type { Category } from "../../entities/category.js";

export class MockedCategoryService implements CategoryService {
    categories: Category[] = [];

    constructor(categories: Category[] = []) {
        this.categories = categories;
    }

    findAll = async () => this.categories;

    findById = async (id: string) => {
        const category = this.categories.find(c => c.id === id);
        if (!category) return undefined;
        return category;
    }

    editOne = async (category: Category) => {
        throw new Error("Not implemented");
    }

    save = async (category: Category) => {
        throw new Error("Not implemented");
    }

    deleteById = async (id: string) => {
        throw new Error("Not implemented");
    }
}
