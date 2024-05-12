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
import Customer from './Customer'
import Transaction from './Transaction'
import ProductCustomer from './ProductCustomer'

@Index('cart_id', ['cartId'], { unique: true })
@Entity('cart', { schema: 'public' })
export default class Cart extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'cart_id' })
  cartId!: number

  @Column('boolean', { name: 'is_processed', default: () => 'false' })
  isProcessed!: boolean

  @Column('numeric', { name: 'total', precision: 10, scale: 2 })
  total!: number

  @ManyToOne(() => Customer, (customer) => customer.carts)
  @JoinColumn([{ name: 'customer_id', referencedColumnName: 'customerId' }])
  customer!: Customer

  @ManyToOne(() => Transaction, (transaction) => transaction.carts)
  @JoinColumn([
    { name: 'transaction_id', referencedColumnName: 'transactionId' },
  ])
  transaction!: Transaction

  @OneToMany(() => ProductCustomer, (productCustomer) => productCustomer.cart)
  productCustomers!: ProductCustomer[]
}
