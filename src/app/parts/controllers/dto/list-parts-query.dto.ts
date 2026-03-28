import { PartCategory } from "@/src/domain/parts/entities/part";
import { PaginationQueryDto } from "@/src/shared/pagination/pagination-query.dto";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsEnum } from "class-validator";

export class ListPartsQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    enum: PartCategory,
    example: PartCategory.ENGINE,
  })
  @IsOptional()
  @IsEnum(PartCategory)
  category?: PartCategory;
}
