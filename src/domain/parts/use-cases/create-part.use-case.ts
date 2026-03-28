import {
  PartCategory,
  CriticalityLevel,
  PartProps,
  Part,
} from "@/src/domain/parts/entities/part";
import type { PartRepository } from "@/src/domain/parts/repositories/part.repository";
import { PART_REPOSITORY } from "@/src/domain/parts/repositories/part.repository.token";
import { Injectable, Inject } from "@nestjs/common";

export interface CreatePartUseCaseInput {
  name: string;
  category: PartCategory;
  currentStock: number;
  minimumStock: number;
  averageDailySales: number;
  leadTimeDays: number;
  unitCost: number;
  criticalityLevel: CriticalityLevel;
}

export interface CreatePartUseCaseOutput {
  part: PartProps;
}

@Injectable()
export class CreatePartUseCase {
  constructor(
    @Inject(PART_REPOSITORY)
    private readonly partRepository: PartRepository,
  ) {}

  async execute(
    input: CreatePartUseCaseInput,
  ): Promise<CreatePartUseCaseOutput> {
    const part = new Part(input);
    const createdPart = await this.partRepository.create(part);

    return {
      part: createdPart.toPrimitives(),
    };
  }
}
