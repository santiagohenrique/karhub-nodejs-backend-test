import {
  CriticalityLevel,
  PartCategory,
} from "@/src/domain/parts/entities/part";
import { Type } from "class-transformer";
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from "class-validator";

export class CreatePartDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsEnum(PartCategory)
  category: PartCategory;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  currentStock: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  minimumStock: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  averageDailySales: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  leadTimeDays: number;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  unitCost: number;

  @Type(() => Number)
  @IsEnum(CriticalityLevel)
  criticalityLevel: CriticalityLevel;
}
