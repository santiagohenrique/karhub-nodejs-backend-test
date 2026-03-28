import { Part } from "@/src/domain/entities/part";
import type { PartRepository } from "@/src/domain/repositories/part.repository";
import { PART_REPOSITORY } from "@/src/domain/repositories/part.repository.token";
import { MAX_PAGE_LIMIT } from "@/src/shared/pagination/pagination.constants";
import { Injectable, Inject } from "@nestjs/common";

export interface RestockPriorityItem {
  partId: string;
  name: string;
  currentStock: number;
  projectedStock: number;
  minimumStock: number;
  urgencyScore: number;
}

export interface GetRestockPrioritiesUseCaseOutput {
  priorities: RestockPriorityItem[];
}

@Injectable()
export class GetRestockPrioritiesUseCase {
  constructor(
    @Inject(PART_REPOSITORY)
    private readonly partRepository: PartRepository,
  ) {}

  async execute(): Promise<GetRestockPrioritiesUseCaseOutput> {
    const allParts = await this.fetchAllParts();

    const prioritizedParts = allParts
      .filter((part) => part.needsRestock())
      .sort((a, b) => {
        const urgencyDifference = b.urgencyScore() - a.urgencyScore();
        if (urgencyDifference !== 0) {
          return urgencyDifference;
        }

        const criticalityDifference = b.criticalityLevel - a.criticalityLevel;
        if (criticalityDifference !== 0) {
          return criticalityDifference;
        }

        const salesDifference = b.averageDailySales - a.averageDailySales;
        if (salesDifference !== 0) {
          return salesDifference;
        }

        return a.name.localeCompare(b.name);
      });

    const priorities = prioritizedParts.map((part) => ({
      partId: part.id ?? "",
      name: part.name,
      currentStock: part.currentStock,
      projectedStock: part.projectedStock(),
      minimumStock: part.minimumStock,
      urgencyScore: part.urgencyScore(),
    }));

    return { priorities };
  }

  private async fetchAllParts(): Promise<Part[]> {
    const limit = MAX_PAGE_LIMIT;
    let page = 1;
    const parts: Part[] = [];

    while (true) {
      const result = await this.partRepository.findAll({ page, limit });
      parts.push(...result.data);

      if (page * limit >= result.total) {
        break;
      }

      page += 1;
    }

    return parts;
  }
}
