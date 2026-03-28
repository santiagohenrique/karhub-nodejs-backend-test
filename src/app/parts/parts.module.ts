import { Module } from '@nestjs/common';
import { PersistenceModule } from '../../infra/persistence/typeorm/persistence.module';
import { PartsController } from './controllers/parts.controller';
import { CreatePartUseCase } from './use-cases/create-part.use-case';
import { DeletePartUseCase } from './use-cases/delete-part.use-case';
import { GetPartByIdUseCase } from './use-cases/get-part-by-id.use-case';
import { ListPartsUseCase } from './use-cases/list-parts.use-case';
import { UpdatePartUseCase } from './use-cases/update-part.use-case';

@Module({
  imports: [PersistenceModule],
  controllers: [PartsController],
  providers: [
    CreatePartUseCase,
    UpdatePartUseCase,
    ListPartsUseCase,
    DeletePartUseCase,
    GetPartByIdUseCase,
  ],
  exports: [
    CreatePartUseCase,
    UpdatePartUseCase,
    ListPartsUseCase,
    DeletePartUseCase,
    GetPartByIdUseCase,
  ],
})
export class PartsModule {}
