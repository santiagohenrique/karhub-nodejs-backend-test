import { PartsController } from "@/src/app/parts/controllers/parts.controller";
import { RestockController } from "@/src/app/parts/controllers/restock.controller";
import { CreatePartUseCase } from "@/src/app/parts/use-cases/create-part.use-case";
import { DeletePartUseCase } from "@/src/app/parts/use-cases/delete-part.use-case";
import { GetPartByIdUseCase } from "@/src/app/parts/use-cases/get-part-by-id.use-case";
import { GetRestockPrioritiesUseCase } from "@/src/app/parts/use-cases/get-restock-priorities.use-case";
import { ListPartsUseCase } from "@/src/app/parts/use-cases/list-parts.use-case";
import { UpdatePartUseCase } from "@/src/app/parts/use-cases/update-part.use-case";
import { PersistenceModule } from "@/src/infra/persistence/typeorm/persistence.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [PersistenceModule],
  controllers: [PartsController, RestockController],
  providers: [
    CreatePartUseCase,
    UpdatePartUseCase,
    ListPartsUseCase,
    DeletePartUseCase,
    GetPartByIdUseCase,
    GetRestockPrioritiesUseCase,
  ],
  exports: [
    CreatePartUseCase,
    UpdatePartUseCase,
    ListPartsUseCase,
    DeletePartUseCase,
    GetPartByIdUseCase,
    GetRestockPrioritiesUseCase,
  ],
})
export class PartsModule {}
