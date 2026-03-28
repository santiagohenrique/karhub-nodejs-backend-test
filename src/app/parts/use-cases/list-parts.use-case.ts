import { PartProps } from '@/src/domain/entities/part';
import type {
  PartFilters,
  PartRepository,
} from '@/src/domain/repositories/part.repository';
import { PART_REPOSITORY } from '@/src/domain/repositories/part.repository.token';
import { Injectable, Inject } from '@nestjs/common';

export type ListPartsUseCaseInput = PartFilters;

export interface ListPartsUseCaseOutput {
  parts: PartProps[];
}

@Injectable()
export class ListPartsUseCase {
  constructor(
    @Inject(PART_REPOSITORY)
    private readonly partRepository: PartRepository,
  ) {}

  async execute(
    input: ListPartsUseCaseInput = {},
  ): Promise<ListPartsUseCaseOutput> {
    const parts = await this.partRepository.findAll(input);
    return {
      parts: parts.map((part) => part.toPrimitives()),
    };
  }
}
