import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Region } from '../region/region.entity';

@Entity({
  name: 'countries',
})
export class Country {
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
    nullable: false,
  })
  createdBy: number;

  @Column({
    nullable: false,
  })
  updatedBy: number;

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

  @OneToMany(() => Region, (region) => region.countryId)
  regions: Region[];

  @BeforeInsert()
  public beforeInsert() {
    this.createdBy = 1;
    this.updatedBy = 1;
  }

  @BeforeUpdate()
  public beforeUpdate() {
    this.updatedBy = 2;
  }
}
