import { Part } from "@/src/domain/parts/entities/part";
import { PartEntity } from "@/src/domain/parts/entities/typeorm/part.entity";
import {
  PartRepository,
  FindAllPartsQuery,
  FindAllPartsResult,
} from "@/src/domain/parts/repositories/part.repository";
import { PartTypeOrmMapper } from "@/src/infra/persistence/typeorm/mappers/part-typeorm.mapper";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TypeOrmPartRepository implements PartRepository {
  constructor(
    @InjectRepository(PartEntity)
    private readonly repository: Repository<PartEntity>,
  ) {}

  async create(part: Part): Promise<Part> {
    const entity = this.repository.create(PartTypeOrmMapper.toOrm(part));
    const persisted = await this.repository.save(entity);

    return PartTypeOrmMapper.toDomain(persisted);
  }

  async findById(id: string): Promise<Part | null> {
    const entity = await this.repository.findOne({
      where: { id },
    });

    if (!entity) {
      return null;
    }

    return PartTypeOrmMapper.toDomain(entity);
  }

  async findAll(query: FindAllPartsQuery): Promise<FindAllPartsResult> {
    const { category, page, limit } = query;
    const [entities, total] = await this.repository.findAndCount({
      where: category ? { category } : undefined,
      order: { name: "ASC" },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: entities.map((entity) => PartTypeOrmMapper.toDomain(entity)),
      total,
    };
  }

  async save(part: Part): Promise<Part> {
    const entity = PartTypeOrmMapper.toOrm(part);
    const persisted = await this.repository.save(entity);

    return PartTypeOrmMapper.toDomain(persisted);
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete({ id });
  }
}
