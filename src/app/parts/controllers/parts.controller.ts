import { CreatePartDto } from "@/src/app/parts/controllers/dto/create-part.dto";
import { ListPartsQueryDto } from "@/src/app/parts/controllers/dto/list-parts-query.dto";
import {
  PartListResponseDto,
  PartSingleResponseDto,
} from "@/src/app/parts/controllers/dto/part-response.dto";
import { UpdatePartDto } from "@/src/app/parts/controllers/dto/update-part.dto";
import { CreatePartUseCase } from "@/src/domain/parts/use-cases/create-part.use-case";
import { DeletePartUseCase } from "@/src/domain/parts/use-cases/delete-part.use-case";
import { GetPartByIdUseCase } from "@/src/domain/parts/use-cases/get-part-by-id.use-case";
import { ListPartsUseCase } from "@/src/domain/parts/use-cases/list-parts.use-case";
import { UpdatePartUseCase } from "@/src/domain/parts/use-cases/update-part.use-case";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  ParseUUIDPipe,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";

@ApiTags("Peças")
@Controller("parts")
export class PartsController {
  constructor(
    private readonly createPartUseCase: CreatePartUseCase,
    private readonly listPartsUseCase: ListPartsUseCase,
    private readonly getPartByIdUseCase: GetPartByIdUseCase,
    private readonly updatePartUseCase: UpdatePartUseCase,
    private readonly deletePartUseCase: DeletePartUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: "Criar uma nova peça" })
  @ApiCreatedResponse({
    description: "Peça criada com sucesso",
    type: PartSingleResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Payload inválido",
  })
  async create(@Body() body: CreatePartDto) {
    return this.createPartUseCase.execute(body);
  }

  @Get()
  @ApiOperation({ summary: "Listar peças com paginação e categoria opcional" })
  @ApiOkResponse({
    description: "Peças listadas com sucesso",
    type: PartListResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Parâmetros de consulta inválidos",
  })
  async findAll(@Query() query: ListPartsQueryDto) {
    return this.listPartsUseCase.execute(query);
  }

  @Get(":id")
  @ApiOperation({ summary: "Buscar peça por id" })
  @ApiParam({
    name: "id",
    format: "uuid",
    example: "8f6d252f-6e6f-470a-bf4d-26a1456fd5cb",
  })
  @ApiOkResponse({
    description: "Peça encontrada",
    type: PartSingleResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Formato de id inválido",
  })
  @ApiNotFoundResponse({
    description: "Peça não encontrada",
  })
  async findById(@Param("id", ParseUUIDPipe) id: string) {
    return this.getPartByIdUseCase.execute({ id });
  }

  @Patch(":id")
  @ApiOperation({ summary: "Atualizar peça por id" })
  @ApiParam({
    name: "id",
    format: "uuid",
    example: "8f6d252f-6e6f-470a-bf4d-26a1456fd5cb",
  })
  @ApiOkResponse({
    description: "Peça atualizada com sucesso",
    type: PartSingleResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Id ou payload inválido",
  })
  @ApiNotFoundResponse({
    description: "Peça não encontrada",
  })
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() body: UpdatePartDto,
  ) {
    return this.updatePartUseCase.execute({ id, ...body });
  }

  @Delete(":id")
  @ApiOperation({ summary: "Remover peça por id" })
  @ApiParam({
    name: "id",
    format: "uuid",
    example: "8f6d252f-6e6f-470a-bf4d-26a1456fd5cb",
  })
  @ApiNoContentResponse({
    description: "Peça removida com sucesso",
  })
  @ApiBadRequestResponse({
    description: "Formato de id inválido",
  })
  @ApiNotFoundResponse({
    description: "Peça não encontrada",
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    await this.deletePartUseCase.execute({ id });
  }
}
