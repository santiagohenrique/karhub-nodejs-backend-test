import { ApiProperty } from "@nestjs/swagger";

export class RestockPriorityItemDto {
  @ApiProperty({
    example: "8f6d252f-6e6f-470a-bf4d-26a1456fd5cb",
  })
  partId: string;

  @ApiProperty({
    example: "Filtro de Óleo X",
  })
  name: string;

  @ApiProperty({
    example: 15,
  })
  currentStock: number;

  @ApiProperty({
    example: 5,
  })
  projectedStock: number;

  @ApiProperty({
    example: 20,
  })
  minimumStock: number;

  @ApiProperty({
    example: 45,
  })
  urgencyScore: number;
}

export class RestockPrioritiesResponseDto {
  @ApiProperty({
    type: [RestockPriorityItemDto],
  })
  priorities: RestockPriorityItemDto[];
}
