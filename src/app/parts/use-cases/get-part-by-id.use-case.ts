import { PartProps } from '@/src/domain/entities/part';
import type { PartRepository } from '@/src/domain/repositories/part.repository';
import { PART_REPOSITORY } from '@/src/domain/repositories/part.repository.token';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';

export interface GetPartByIdUseCaseInput {
  id: string;
}

export interface GetPartByIdUseCaseOutput {
  part: PartProps;
}

@Injectable()
export class GetPartByIdUseCase {
  constructor(
    @Inject(PART_REPOSITORY)
    private readonly partRepository: PartRepository,
  ) {}

  async execute(
    input: GetPartByIdUseCaseInput,
  ): Promise<GetPartByIdUseCaseOutput> {
    const { id } = input;
    const part = await this.partRepository.findById(id);

    if (!part) {
      throw new NotFoundException(`Part "${id}" was not found`);
    }

    return {
      part: part.toPrimitives(),
    };
  }
}
