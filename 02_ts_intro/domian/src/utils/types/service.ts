import type { Entity } from "../types/entity.js";

export interface Service<T extends Entity>{
    findById(id: string): Promise<T | undefined>;
    findAll(): Promise<T[]>;
    editOne(data: T): Promise<T>;
    deleteById(id: string): Promise<void>;
    create(data: T): Promise<T>;
}