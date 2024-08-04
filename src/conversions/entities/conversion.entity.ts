import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Conversion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 255 })
  from: string;

  @Column('varchar', { length: 255 })
  to: string;

  @Column('decimal', { precision: 10, scale: 2 })
  value: number;

  @Column('timestamp')
  timestamp: Date;
}
