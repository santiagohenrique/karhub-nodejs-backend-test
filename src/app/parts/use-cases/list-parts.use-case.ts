import { PartProps } from "@/src/domain/entities/part";
import type {
  PartFilters,
  PartRepository,
} from "@/src/domain/repositories/part.repository";
import { PART_REPOSITORY } from "@/src/domain/repositories/part.repository.token";
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
} from "@/src/shared/pagination/pagination.constants";
import type {
  PaginatedResponse,
  PaginationInput,
} from "@/src/shared/pagination/pagination.types";
import { Injectable, Inject } from "@nestjs/common";

export interface ListPartsUseCaseInput extends PartFilters, PaginationInput {}

export type ListPartsUseCaseOutput = PaginatedResponse<PartProps>;

@Injectable()
export class ListPartsUseCase {
  constructor(
    @Inject(PART_REPOSITORY)
    private readonly partRepository: PartRepository,
  ) {}

  async execute(
    input: ListPartsUseCaseInput = {},
  ): Promise<ListPartsUseCaseOutput> {
    const page = input.page ?? DEFAULT_PAGE;
    const limit = input.limit ?? DEFAULT_LIMIT;
    const result = await this.partRepository.findAll({
      category: input.category,
      page,
      limit,
    });

    return {
      data: result.data.map((part) => part.toPrimitives()),
      page,
      limit,
      total: result.total,
    };
  }
}
