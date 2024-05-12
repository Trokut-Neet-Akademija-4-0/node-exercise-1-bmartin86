import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import Address from './Address'

@Index('city_pkey', ['cityId'], { unique: true })
@Entity('city', { schema: 'public' })
export default class City extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'city_id' })
  cityId!: number

  @Column('smallint', { name: 'zip_code' })
  zipCode!: number

  @Column('character varying', { name: 'city_name', length: 128 })
  cityName!: string

  @OneToMany(() => Address, (address) => address.city)
  addresses!: Address[]
}
