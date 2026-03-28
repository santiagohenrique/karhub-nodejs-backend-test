import {
  CriticalityLevel,
  PartCategory,
} from "@/src/domain/parts/entities/part";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from "class-validator";

export class UpdatePartDto {
  @ApiPropertyOptional({
    example: "Filtro de Oleo Premium",
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({
    enum: PartCategory,
    example: PartCategory.ENGINE,
  })
  @IsOptional()
  @IsEnum(PartCategory)
  category?: PartCategory;

  @ApiPropertyOptional({
    example: 12,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  currentStock?: number;

  @ApiPropertyOptional({
    example: 18,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  minimumStock?: number;

  @ApiPropertyOptional({
    example: 3.5,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  averageDailySales?: number;

  @ApiPropertyOptional({
    example: 7,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  leadTimeDays?: number;

  @ApiPropertyOptional({
    example: 20.9,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  unitCost?: number;

  @ApiPropertyOptional({
    enum: CriticalityLevel,
    example: CriticalityLevel.HIGH,
  })
  @IsOptional()
  @Type(() => Number)
  @IsEnum(CriticalityLevel)
  criticalityLevel?: CriticalityLevel;
}
