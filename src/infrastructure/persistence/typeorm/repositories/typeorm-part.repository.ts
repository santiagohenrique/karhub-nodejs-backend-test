import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  PartFilters,
  PartRepository,
} from '../../../../domain/repositories/part.repository';
import { Part } from '../../../../domain/entities/part';
import { PartEntity } from '../../../../domain/entities/typeorm/part.entity';
import { PartTypeOrmMapper } from '../mappers/part-typeorm.mapper';

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

  async findAll(filters?: PartFilters): Promise<Part[]> {
    const entities = await this.repository.find(
      filters?.category
        ? {
            where: { category: filters.category },
            order: { name: 'ASC' },
          }
        : {
            order: { name: 'ASC' },
          },
    );

    return entities.map((entity) => PartTypeOrmMapper.toDomain(entity));
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
