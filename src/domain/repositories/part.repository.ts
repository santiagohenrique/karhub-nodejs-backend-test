import { PartCategory, Part } from "@/src/domain/entities/part";
import {
  PaginationParams,
  PaginatedData,
} from "@/src/shared/pagination/pagination.types";

export interface PartFilters {
  category?: PartCategory;
}

export interface FindAllPartsQuery extends PartFilters, PaginationParams {}

export type FindAllPartsResult = PaginatedData<Part>;

export interface PartRepository {
  create(part: Part): Promise<Part>;
  findById(id: string): Promise<Part | null>;
  findAll(query: FindAllPartsQuery): Promise<FindAllPartsResult>;
  save(part: Part): Promise<Part>;
  deleteById(id: string): Promise<void>;
}
