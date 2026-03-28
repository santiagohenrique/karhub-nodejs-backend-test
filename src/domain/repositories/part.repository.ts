import { PartCategory, Part } from "@/src/domain/entities/part";

export interface PartFilters {
  category?: PartCategory;
}

export interface PartRepository {
  create(part: Part): Promise<Part>;
  findById(id: string): Promise<Part | null>;
  findAll(filters?: PartFilters): Promise<Part[]>;
  save(part: Part): Promise<Part>;
  deleteById(id: string): Promise<void>;
}
