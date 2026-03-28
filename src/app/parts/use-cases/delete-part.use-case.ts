import type { PartRepository } from '@/src/domain/repositories/part.repository';
import { PART_REPOSITORY } from '@/src/domain/repositories/part.repository.token';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';

export interface DeletePartUseCaseInput {
  id: string;
}

@Injectable()
export class DeletePartUseCase {
  constructor(
    @Inject(PART_REPOSITORY)
    private readonly partRepository: PartRepository,
  ) {}

  async execute(input: DeletePartUseCaseInput): Promise<void> {
    const { id } = input;
    const part = await this.partRepository.findById(id);

    if (!part) {
      throw new NotFoundException(`Part "${id}" was not found`);
    }

    await this.partRepository.deleteById(id);
  }
}
