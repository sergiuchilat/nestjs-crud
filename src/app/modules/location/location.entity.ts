import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Region } from '../region/region.entity';

@Entity({
  name: 'locations',
})
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    unique: true,
    nullable: false,
  })
  name: string;

  @Column({
    length: 2,
    unique: true,
    nullable: false,
  })
  code: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  regionId: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;

  @ManyToOne(() => Region, (region) => region.locations)
  region: Region;
}
