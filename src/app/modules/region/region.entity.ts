import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Country } from '../country/country.entity';
import { Location } from '../location/location.entity';

@Entity({
  name: 'regions',
})
export class Region {
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
  countryId: number;

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

  @ManyToOne(() => Country, (country) => country.regions)
  country: Country;

  @OneToMany(() => Location, (location) => location.regionId)
  locations: Location[];
}
