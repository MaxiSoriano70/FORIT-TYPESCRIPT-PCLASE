import type { Entity } from "../types/entity.js";

export interface Service<T extends Entity>{
    findById(id: string): Promise<T | undefined>;
    findAll(): Promise<T[]>;
    editOne(data: T): Promise<T>;
    save(data: T): Promise<void>;
    deleteById(id: string): Promise<void>;
}