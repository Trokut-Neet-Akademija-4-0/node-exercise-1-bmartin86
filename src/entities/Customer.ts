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
import Cart from './Cart'
import Address from './Address'
import ProductCustomer from './ProductCustomer'

@Index('customer_pkey', ['customerId'], { unique: true })
@Entity('customer', { schema: 'public' })
export default class Customer extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'customer_id' })
  customerId!: number

  @Column('character varying', { name: 'email', length: 256 })
  email!: string

  @Column('character varying', { name: 'name', nullable: true, length: 128 })
  name!: string | null

  @Column('character varying', { name: 'phone', nullable: true, length: 64 })
  phone!: string | null

  @OneToMany(() => Cart, (cart) => cart.customer)
  carts!: Cart[]

  @ManyToOne(() => Address, (address) => address.customers)
  @JoinColumn([{ name: 'address_id', referencedColumnName: 'addressId' }])
  address!: Address

  @OneToMany(
    () => ProductCustomer,
    (productCustomer) => productCustomer.customer,
  )
  productCustomers!: ProductCustomer[]
}
