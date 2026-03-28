export enum PartCategory {
  ENGINE = "engine",
  TRANSMISSION = "transmission",
  SUSPENSION = "suspension",
}

export enum CriticalityLevel {
  VERY_LOW = 1,
  LOW = 2,
  MEDIUM = 3,
  HIGH = 4,
  VERY_HIGH = 5,
}

export interface PartProps {
  id?: string;
  name: string;
  category: PartCategory;
  currentStock: number;
  minimumStock: number;
  averageDailySales: number;
  leadTimeDays: number;
  unitCost: number;
  criticalityLevel: CriticalityLevel;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PartUpdateProps = Partial<
  Omit<PartProps, "id" | "createdAt" | "updatedAt">
>;

export class Part {
  constructor(private readonly props: PartProps) {}

  get id(): string | undefined {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get category(): PartCategory {
    return this.props.category;
  }

  get currentStock(): number {
    return this.props.currentStock;
  }

  get minimumStock(): number {
    return this.props.minimumStock;
  }

  get averageDailySales(): number {
    return this.props.averageDailySales;
  }

  get leadTimeDays(): number {
    return this.props.leadTimeDays;
  }

  get unitCost(): number {
    return this.props.unitCost;
  }

  get criticalityLevel(): CriticalityLevel {
    return this.props.criticalityLevel;
  }

  expectedConsumption(): number {
    return this.averageDailySales * this.leadTimeDays;
  }

  projectedStock(): number {
    return this.currentStock - this.expectedConsumption();
  }

  needsRestock(): boolean {
    return this.projectedStock() < this.minimumStock;
  }

  urgencyScore(): number {
    return (this.minimumStock - this.projectedStock()) * this.criticalityLevel;
  }

  update(changes: PartUpdateProps): Part {
    return new Part({
      ...this.props,
      name: changes.name ?? this.props.name,
      category: changes.category ?? this.props.category,
      currentStock: changes.currentStock ?? this.props.currentStock,
      minimumStock: changes.minimumStock ?? this.props.minimumStock,
      averageDailySales:
        changes.averageDailySales ?? this.props.averageDailySales,
      leadTimeDays: changes.leadTimeDays ?? this.props.leadTimeDays,
      unitCost: changes.unitCost ?? this.props.unitCost,
      criticalityLevel: changes.criticalityLevel ?? this.props.criticalityLevel,
    });
  }

  toPrimitives(): PartProps {
    return { ...this.props };
  }
}
