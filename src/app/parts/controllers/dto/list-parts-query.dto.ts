import { PartCategory } from "@/src/domain/entities/part";
import { PaginationQueryDto } from "@/src/shared/pagination/pagination-query.dto";
import { IsOptional, IsEnum } from "class-validator";

export class ListPartsQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsEnum(PartCategory)
  category?: PartCategory;
}
