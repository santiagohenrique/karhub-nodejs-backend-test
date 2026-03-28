import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CriticalityLevel, PartCategory } from '../part';

@Entity('parts')
export class PartEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'category', type: 'enum', enum: PartCategory })
  category: PartCategory;

  @Column({ name: 'current_stock', type: 'int' })
  currentStock: number;

  @Column({ name: 'minimum_stock', type: 'int' })
  minimumStock: number;

  @Column({ name: 'average_daily_sales', type: 'float' })
  averageDailySales: number;

  @Column({ name: 'lead_time_days', type: 'int' })
  leadTimeDays: number;

  @Column({ name: 'unit_cost', type: 'decimal', precision: 10, scale: 2 })
  unitCost: number;

  @Column({ name: 'criticality_level', type: 'enum', enum: CriticalityLevel })
  criticalityLevel: CriticalityLevel;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
