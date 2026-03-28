import { CreatePartDto } from '@/src/app/parts/controllers/dto/create-part.dto';
import { UpdatePartDto } from '@/src/app/parts/controllers/dto/update-part.dto';
import { CreatePartUseCase } from '@/src/app/parts/use-cases/create-part.use-case';
import { DeletePartUseCase } from '@/src/app/parts/use-cases/delete-part.use-case';
import { GetPartByIdUseCase } from '@/src/app/parts/use-cases/get-part-by-id.use-case';
import { ListPartsUseCase } from '@/src/app/parts/use-cases/list-parts.use-case';
import { UpdatePartUseCase } from '@/src/app/parts/use-cases/update-part.use-case';
import { PartCategory } from '@/src/domain/entities/part';
import { PaginationQueryDto } from '@/src/shared/pagination/pagination-query.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('parts')
export class PartsController {
  constructor(
    private readonly createPartUseCase: CreatePartUseCase,
    private readonly listPartsUseCase: ListPartsUseCase,
    private readonly getPartByIdUseCase: GetPartByIdUseCase,
    private readonly updatePartUseCase: UpdatePartUseCase,
    private readonly deletePartUseCase: DeletePartUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreatePartDto) {
    return this.createPartUseCase.execute(body);
  }

  @Get()
  async findAll(
    @Query() pagination: PaginationQueryDto,
    @Query('category', new ParseEnumPipe(PartCategory, { optional: true }))
    category?: PartCategory,
  ) {
    return this.listPartsUseCase.execute({
      ...pagination,
      category,
    });
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.getPartByIdUseCase.execute({ id });
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdatePartDto,
  ) {
    return this.updatePartUseCase.execute({ id, ...body });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.deletePartUseCase.execute({ id });
  }
}
