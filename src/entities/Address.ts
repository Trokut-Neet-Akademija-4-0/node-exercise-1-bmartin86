import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import City from './City'
import Customer from './Customer'

@Index('address_pkey', ['addressId'], { unique: true })
@Entity('address', { schema: 'public' })
export default class Address extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'address_id' })
  addressId!: number

  @Column('character varying', { name: 'street_name', length: 128 })
  streetName!: string

  @Column('character varying', { name: 'house_number', length: 32 })
  houseNumber!: string

  @Column('character varying', {
    name: 'delivery_remark',
    nullable: true,
    length: 1024,
  })
  deliveryRemark!: string | null

  @ManyToOne(() => City, (city) => city.addresses)
  @JoinColumn([{ name: 'city_id', referencedColumnName: 'cityId' }])
  city!: City

  @OneToMany(() => Customer, (customer) => customer.address)
  customers!: Customer[]
}
