import { GetRestockPrioritiesUseCase } from "@/src/domain/parts/use-cases/get-restock-priorities.use-case";
import {
  Part,
  PartProps,
  PartCategory,
  CriticalityLevel,
} from "@/src/domain/parts/entities/part";
import {
  PartRepository,
  FindAllPartsQuery,
  FindAllPartsResult,
} from "@/src/domain/parts/repositories/part.repository";

class InMemoryPartRepository implements PartRepository {
  constructor(private readonly parts: Part[]) {}

  create(part: Part): Promise<Part> {
    this.parts.push(part);
    return Promise.resolve(part);
  }

  findById(id: string): Promise<Part | null> {
    return Promise.resolve(this.parts.find((part) => part.id === id) ?? null);
  }

  findAll(query: FindAllPartsQuery): Promise<FindAllPartsResult> {
    const start = (query.page - 1) * query.limit;
    const end = start + query.limit;

    return Promise.resolve({
      data: this.parts.slice(start, end),
      total: this.parts.length,
    });
  }

  save(part: Part): Promise<Part> {
    const index = this.parts.findIndex(
      (currentPart) => currentPart.id === part.id,
    );
    if (index >= 0) {
      this.parts[index] = part;
      return Promise.resolve(part);
    }

    this.parts.push(part);
    return Promise.resolve(part);
  }

  deleteById(id: string): Promise<void> {
    const index = this.parts.findIndex((part) => part.id === id);
    if (index >= 0) {
      this.parts.splice(index, 1);
    }

    return Promise.resolve();
  }
}

function makePart(overrides: Partial<PartProps> = {}): Part {
  return new Part({
    id: overrides.id ?? crypto.randomUUID(),
    name: overrides.name ?? "Part",
    category: overrides.category ?? PartCategory.ENGINE,
    currentStock: overrides.currentStock ?? 10,
    minimumStock: overrides.minimumStock ?? 20,
    averageDailySales: overrides.averageDailySales ?? 2,
    leadTimeDays: overrides.leadTimeDays ?? 5,
    unitCost: overrides.unitCost ?? 10,
    criticalityLevel: overrides.criticalityLevel ?? CriticalityLevel.MEDIUM,
    createdAt: overrides.createdAt,
    updatedAt: overrides.updatedAt,
  });
}

describe("GetRestockPrioritiesUseCase", () => {
  it("returns only parts that need restock with correct projectedStock and urgencyScore", async () => {
    const restockPart = makePart({
      id: "part-1",
      name: "Filtro de Oleo X",
      currentStock: 15,
      minimumStock: 20,
      averageDailySales: 4,
      leadTimeDays: 5,
      criticalityLevel: CriticalityLevel.MEDIUM,
    });
    const healthyPart = makePart({
      id: "part-2",
      name: "Peca Saudavel",
      currentStock: 40,
      minimumStock: 10,
      averageDailySales: 1,
      leadTimeDays: 5,
      criticalityLevel: CriticalityLevel.HIGH,
    });

    const repository = new InMemoryPartRepository([restockPart, healthyPart]);
    const useCase = new GetRestockPrioritiesUseCase(repository);

    const result = await useCase.execute();

    expect(result.priorities).toEqual([
      {
        partId: "part-1",
        name: "Filtro de Oleo X",
        currentStock: 15,
        projectedStock: -5,
        minimumStock: 20,
        urgencyScore: 75,
      },
    ]);
  });

  it("applies tie-break by criticalityLevel and averageDailySales", async () => {
    const highCriticality = makePart({
      id: "uuid-c",
      name: "part-c",
      minimumStock: 10,
      currentStock: 10,
      averageDailySales: 1,
      leadTimeDays: 4,
      criticalityLevel: CriticalityLevel.VERY_HIGH,
    });
    const highSales = makePart({
      id: "uuid-b",
      name: "part-b",
      minimumStock: 10,
      currentStock: 20,
      averageDailySales: 3,
      leadTimeDays: 5,
      criticalityLevel: CriticalityLevel.HIGH,
    });
    const lowSales = makePart({
      id: "uuid-a",
      name: "part-a",
      minimumStock: 10,
      currentStock: 15,
      averageDailySales: 2,
      leadTimeDays: 5,
      criticalityLevel: CriticalityLevel.HIGH,
    });

    const repository = new InMemoryPartRepository([
      lowSales,
      highCriticality,
      highSales,
    ]);
    const useCase = new GetRestockPrioritiesUseCase(repository);

    const result = await useCase.execute();

    expect(result.priorities.map((item) => item.partId)).toEqual([
      "uuid-c",
      "uuid-b",
      "uuid-a",
    ]);
  });

  it("applies alphabetical order when all other tie-break criteria are equal", async () => {
    const alpha = makePart({
      id: "uuid-alpha",
      name: "Alpha",
      minimumStock: 10,
      currentStock: 16,
      averageDailySales: 2,
      leadTimeDays: 5,
      criticalityLevel: CriticalityLevel.MEDIUM,
    });

    const zebra = makePart({
      id: "uuid-zebra",
      name: "Zebra",
      minimumStock: 10,
      currentStock: 16,
      averageDailySales: 2,
      leadTimeDays: 5,
      criticalityLevel: CriticalityLevel.MEDIUM,
    });

    const repository = new InMemoryPartRepository([zebra, alpha]);
    const useCase = new GetRestockPrioritiesUseCase(repository);

    const result = await useCase.execute();

    expect(result.priorities.map((item) => item.partId)).toEqual([
      "uuid-alpha",
      "uuid-zebra",
    ]);
  });

  it("handles negative stock by keeping projectedStock negative and urgency high", async () => {
    const negativeStockPart = makePart({
      id: "uuid-negative",
      name: "Peca Estoque Negativo",
      currentStock: -5,
      minimumStock: 10,
      averageDailySales: 2,
      leadTimeDays: 3,
      criticalityLevel: CriticalityLevel.HIGH,
    });

    const repository = new InMemoryPartRepository([negativeStockPart]);
    const useCase = new GetRestockPrioritiesUseCase(repository);

    const result = await useCase.execute();

    expect(result.priorities).toEqual([
      {
        partId: "uuid-negative",
        name: "Peca Estoque Negativo",
        currentStock: -5,
        projectedStock: -11,
        minimumStock: 10,
        urgencyScore: 84,
      },
    ]);
  });

  it("handles zero sales with expectedConsumption equal to zero", async () => {
    const zeroSalesNeedsRestock = makePart({
      id: "uuid-zero-sales-1",
      name: "Peca Venda Zero Repor",
      currentStock: 8,
      minimumStock: 10,
      averageDailySales: 0,
      leadTimeDays: 30,
      criticalityLevel: CriticalityLevel.MEDIUM,
    });
    const zeroSalesNoRestock = makePart({
      id: "uuid-zero-sales-2",
      name: "Peca Venda Zero Saudavel",
      currentStock: 10,
      minimumStock: 10,
      averageDailySales: 0,
      leadTimeDays: 30,
      criticalityLevel: CriticalityLevel.HIGH,
    });

    const repository = new InMemoryPartRepository([
      zeroSalesNeedsRestock,
      zeroSalesNoRestock,
    ]);
    const useCase = new GetRestockPrioritiesUseCase(repository);

    const result = await useCase.execute();

    expect(result.priorities).toEqual([
      {
        partId: "uuid-zero-sales-1",
        name: "Peca Venda Zero Repor",
        currentStock: 8,
        projectedStock: 8,
        minimumStock: 10,
        urgencyScore: 6,
      },
    ]);
  });

  it("handles high lead time with proportionally higher urgency score", async () => {
    const highLeadTimePart = makePart({
      id: "uuid-high-lead",
      name: "Peca Lead Time Alto",
      currentStock: 500,
      minimumStock: 100,
      averageDailySales: 7,
      leadTimeDays: 365,
      criticalityLevel: CriticalityLevel.VERY_HIGH,
    });

    const repository = new InMemoryPartRepository([highLeadTimePart]);
    const useCase = new GetRestockPrioritiesUseCase(repository);

    const result = await useCase.execute();

    expect(result.priorities).toEqual([
      {
        partId: "uuid-high-lead",
        name: "Peca Lead Time Alto",
        currentStock: 500,
        projectedStock: -2055,
        minimumStock: 100,
        urgencyScore: 10775,
      },
    ]);
  });
});
