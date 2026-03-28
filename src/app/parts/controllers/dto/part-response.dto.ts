import {
  CriticalityLevel,
  PartCategory,
} from "@/src/domain/parts/entities/part";
import { ApiProperty } from "@nestjs/swagger";

export class PartDto {
  @ApiProperty({
    example: "8f6d252f-6e6f-470a-bf4d-26a1456fd5cb",
  })
  id: string;

  @ApiProperty({
    example: "Filtro de Oleo X",
  })
  name: string;

  @ApiProperty({
    enum: PartCategory,
    example: PartCategory.ENGINE,
  })
  category: PartCategory;

  @ApiProperty({
    example: 15,
  })
  currentStock: number;

  @ApiProperty({
    example: 20,
  })
  minimumStock: number;

  @ApiProperty({
    example: 4,
  })
  averageDailySales: number;

  @ApiProperty({
    example: 5,
  })
  leadTimeDays: number;

  @ApiProperty({
    example: 18.5,
  })
  unitCost: number;

  @ApiProperty({
    enum: CriticalityLevel,
    example: CriticalityLevel.MEDIUM,
  })
  criticalityLevel: CriticalityLevel;

  @ApiProperty({
    example: "2026-03-29T00:35:00.000Z",
  })
  createdAt: string;

  @ApiProperty({
    example: "2026-03-29T00:35:00.000Z",
  })
  updatedAt: string;
}

export class PartSingleResponseDto {
  @ApiProperty({
    type: PartDto,
  })
  part: PartDto;
}

export class PartListResponseDto {
  @ApiProperty({
    type: [PartDto],
  })
  data: PartDto[];

  @ApiProperty({
    example: 1,
  })
  page: number;

  @ApiProperty({
    example: 10,
  })
  limit: number;

  @ApiProperty({
    example: 37,
  })
  total: number;
}
