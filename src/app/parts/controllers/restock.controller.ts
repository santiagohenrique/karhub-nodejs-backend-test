import { RestockPrioritiesResponseDto } from "@/src/app/parts/controllers/dto/restock-priority-response.dto";
import { GetRestockPrioritiesUseCase } from "@/src/domain/parts/use-cases/get-restock-priorities.use-case";
import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("restock")
@Controller("restock")
export class RestockController {
  constructor(
    private readonly getRestockPrioritiesUseCase: GetRestockPrioritiesUseCase,
  ) {}

  @Get("priorities")
  @ApiOperation({
    summary: "Listar prioridades de reposição de estoque",
  })
  @ApiOkResponse({
    description: "Prioridades de reposição ordenadas por urgência",
    type: RestockPrioritiesResponseDto,
  })
  async getPriorities() {
    return this.getRestockPrioritiesUseCase.execute();
  }
}
