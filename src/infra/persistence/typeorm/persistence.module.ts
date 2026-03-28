import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartEntity } from '../../../domain/entities/typeorm/part.entity';
import { PART_REPOSITORY } from '../../../domain/repositories/part.repository.token';
import { TypeOrmPartRepository } from './repositories/typeorm-part.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PartEntity])],
  providers: [
    {
      provide: PART_REPOSITORY,
      useClass: TypeOrmPartRepository,
    },
  ],
  exports: [PART_REPOSITORY],
})
export class PersistenceModule {}
