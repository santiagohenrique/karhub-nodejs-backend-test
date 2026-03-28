import {
  PartCategory,
  CriticalityLevel,
} from "@/src/domain/parts/entities/part";
import { PartEntity } from "@/src/domain/parts/entities/typeorm/part.entity";
import { DataSource } from "typeorm";

type SeedPart = Omit<PartEntity, "id" | "createdAt" | "updatedAt">;

const PARTS_SEED: SeedPart[] = [
  {
    name: "Filtro de Oleo Premium",
    category: PartCategory.ENGINE,
    currentStock: 15,
    minimumStock: 20,
    averageDailySales: 4,
    leadTimeDays: 5,
    unitCost: 18.5,
    criticalityLevel: CriticalityLevel.MEDIUM,
  },
  {
    name: "Velas de Ignicao Iridium",
    category: PartCategory.ENGINE,
    currentStock: 22,
    minimumStock: 18,
    averageDailySales: 3,
    leadTimeDays: 7,
    unitCost: 35.9,
    criticalityLevel: CriticalityLevel.HIGH,
  },
  {
    name: "Bomba de Oleo",
    category: PartCategory.ENGINE,
    currentStock: 6,
    minimumStock: 12,
    averageDailySales: 2,
    leadTimeDays: 10,
    unitCost: 210,
    criticalityLevel: CriticalityLevel.VERY_HIGH,
  },
  {
    name: "Correia Dentada",
    category: PartCategory.ENGINE,
    currentStock: 18,
    minimumStock: 25,
    averageDailySales: 5,
    leadTimeDays: 8,
    unitCost: 69.9,
    criticalityLevel: CriticalityLevel.HIGH,
  },
  {
    name: "Junta do Cabecote",
    category: PartCategory.ENGINE,
    currentStock: 9,
    minimumStock: 10,
    averageDailySales: 1,
    leadTimeDays: 14,
    unitCost: 120,
    criticalityLevel: CriticalityLevel.VERY_HIGH,
  },
  {
    name: "Sensor de Rotacao",
    category: PartCategory.ENGINE,
    currentStock: 12,
    minimumStock: 15,
    averageDailySales: 2,
    leadTimeDays: 6,
    unitCost: 85,
    criticalityLevel: CriticalityLevel.MEDIUM,
  },
  {
    name: "Bomba de Agua",
    category: PartCategory.ENGINE,
    currentStock: 11,
    minimumStock: 16,
    averageDailySales: 2,
    leadTimeDays: 9,
    unitCost: 145,
    criticalityLevel: CriticalityLevel.HIGH,
  },
  {
    name: "Valvula Termostatica",
    category: PartCategory.ENGINE,
    currentStock: 20,
    minimumStock: 15,
    averageDailySales: 2,
    leadTimeDays: 4,
    unitCost: 42.7,
    criticalityLevel: CriticalityLevel.LOW,
  },
  {
    name: "Retentor do Virabrequim",
    category: PartCategory.ENGINE,
    currentStock: 14,
    minimumStock: 12,
    averageDailySales: 1,
    leadTimeDays: 11,
    unitCost: 28.4,
    criticalityLevel: CriticalityLevel.LOW,
  },
  {
    name: "Coxim do Motor",
    category: PartCategory.ENGINE,
    currentStock: 7,
    minimumStock: 10,
    averageDailySales: 1,
    leadTimeDays: 12,
    unitCost: 95.5,
    criticalityLevel: CriticalityLevel.MEDIUM,
  },
];

export interface SeedPartsResult {
  inserted: number;
  skipped: boolean;
}

export async function seedPartsOnce(
  dataSource: DataSource,
): Promise<SeedPartsResult> {
  const partRepository = dataSource.getRepository(PartEntity);
  const currentCount = await partRepository.count();

  if (currentCount > 0) {
    return {
      inserted: 0,
      skipped: true,
    };
  }

  const entities = partRepository.create(PARTS_SEED);
  await partRepository.save(entities);

  return {
    inserted: entities.length,
    skipped: false,
  };
}
