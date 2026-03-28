import { Part } from "@/src/domain/parts/entities/part";
import { PartEntity } from "@/src/domain/parts/entities/typeorm/part.entity";

export class PartTypeOrmMapper {
  static toDomain(entity: PartEntity): Part {
    return new Part({
      id: entity.id,
      name: entity.name,
      category: entity.category,
      currentStock: entity.currentStock,
      minimumStock: entity.minimumStock,
      averageDailySales: entity.averageDailySales,
      leadTimeDays: entity.leadTimeDays,
      unitCost: Number(entity.unitCost),
      criticalityLevel: entity.criticalityLevel,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  static toOrm(part: Part): PartEntity {
    const props = part.toPrimitives();
    const entity = new PartEntity();

    if (props.id) {
      entity.id = props.id;
    }

    entity.name = props.name;
    entity.category = props.category;
    entity.currentStock = props.currentStock;
    entity.minimumStock = props.minimumStock;
    entity.averageDailySales = props.averageDailySales;
    entity.leadTimeDays = props.leadTimeDays;
    entity.unitCost = props.unitCost;
    entity.criticalityLevel = props.criticalityLevel;

    if (props.createdAt) {
      entity.createdAt = props.createdAt;
    }

    if (props.updatedAt) {
      entity.updatedAt = props.updatedAt;
    }

    return entity;
  }
}
