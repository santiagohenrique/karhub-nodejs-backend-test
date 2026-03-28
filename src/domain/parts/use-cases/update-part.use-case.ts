import { PartUpdateProps, PartProps } from "@/src/domain/parts/entities/part";
import type { PartRepository } from "@/src/domain/parts/repositories/part.repository";
import { PART_REPOSITORY } from "@/src/domain/parts/repositories/part.repository.token";
import { Injectable, Inject, NotFoundException } from "@nestjs/common";

export type UpdatePartUseCaseChanges = PartUpdateProps;

export interface UpdatePartUseCaseInput extends UpdatePartUseCaseChanges {
  id: string;
}

export interface UpdatePartUseCaseOutput {
  part: PartProps;
}

@Injectable()
export class UpdatePartUseCase {
  constructor(
    @Inject(PART_REPOSITORY)
    private readonly partRepository: PartRepository,
  ) {}

  async execute(
    input: UpdatePartUseCaseInput,
  ): Promise<UpdatePartUseCaseOutput> {
    const { id, ...changes } = input;
    const currentPart = await this.partRepository.findById(id);

    if (!currentPart) {
      throw new NotFoundException(`Part "${id}" was not found`);
    }

    const nextPart = currentPart.update(changes);

    const updatedPart = await this.partRepository.save(nextPart);
    return {
      part: updatedPart.toPrimitives(),
    };
  }
}
