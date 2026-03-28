import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PartEntity } from "@/src/domain/parts/entities/typeorm/part.entity";
import { PART_REPOSITORY } from "@/src/domain/parts/repositories/part.repository.token";
import { TypeOrmPartRepository } from "@/src/infra/persistence/typeorm/repositories/typeorm-part.repository";

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
