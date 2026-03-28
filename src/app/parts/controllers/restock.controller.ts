import { GetRestockPrioritiesUseCase } from "@/src/app/parts/use-cases/get-restock-priorities.use-case";
import { Controller, Get } from "@nestjs/common";

@Controller("restock")
export class RestockController {
  constructor(
    private readonly getRestockPrioritiesUseCase: GetRestockPrioritiesUseCase,
  ) {}

  @Get("priorities")
  async getPriorities() {
    return this.getRestockPrioritiesUseCase.execute();
  }
}
